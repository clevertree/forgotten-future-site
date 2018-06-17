/**
 * Editor requires a modern browser
 * One groups displays at a time. Columns imply simultaneous notes. Pauses are implied by the scale
 */

(function() {
    // if (!window.SongEditor)
    //     window.SongEditor = SongEditor;

    class SongEditorElement extends HTMLElement {
        constructor(options) {
            options = options || {};
            super();
            this.loadSongData({});
            this.audioContext = options.context || new (window.AudioContext || window.webkitAudioContext)();
            this.depressedKeys = [];
            this.song = null;
            this.bpm = 160;
            this.seekLength = 240 / this.bpm;
            this.seekPosition = 0;
            this.playing = false;
        }

        getSong() { return this.song; }
        getCurrentBPM() { return this.bpm; }

        connectedCallback() {
            this.addEventListener('keydown', this.onKeyDown.bind(this));
            this.addEventListener('keyup', this.onKeyUp.bind(this));

            this.gridElement = new SongEditorGridElement();

            var menuElm = new SongEditorMenuElement();
            this.appendChild(menuElm);
            menuElm.innerHTML = renderEditorMenuContent();
            this.appendChild(this.gridElement);

            if(this.getSongURL())
                this.loadSong(this.getSongURL(), function() {
                    var firstCell = this.querySelector('song-editor-grid-cell');
                    firstCell.select();
                    this.focus();
                }.bind(this));

            if(!this.getAttribute('tabindex'))
                this.setAttribute('tabindex', '1');
        }

        getSongURL() { return this.getAttribute('src');}

        loadSongData(songData) {
            songData.notes = songData.notes || {};
            songData.noteGroups = songData.noteGroups || {};
            songData.aliases = songData.aliases || {};
            this.song = songData;
        }

        loadSong(songURL, onLoaded) {
            console.log('Song loading:', songURL);
            loadJSON(songURL, function(err, json) {
                if(err)
                    throw new Error("Could not load song: " + err);
                if(!json)
                    throw new Error("Invalid JSON File: " + songURL);
                this.loadSongData(json);
                this.setAttribute('src', songURL);
                console.log('Song loaded:', this.song);
                this.updateEditor();

                // Load Scripts
                var scriptsLoading = 0;
                if(this.song.load) {
                    for(var i=0; i<this.song.load.length; i++) {
                        var scriptPath = this.song.load[i];
                        scriptsLoading++;
                        loadScript.call(this, scriptPath, function() {
                            // console.log("Scripts loading: ", scriptsLoading);
                            scriptsLoading--;
                            if(scriptsLoading === 0)
                                onLoaded && onLoaded(); // initNotes.call(this);
                        }.bind(this));
                    }
                }
                if(scriptsLoading === 0)
                    onLoaded && onLoaded(); // initNotes.call(this);
            }.bind(this));
        }

        saveSongToMemory() {
            saveSongToMemory(this.song);
        }

        updateEditor(options) {
            options = options || {};
            var commandGroup = this.song.notes; // options.noteGroup || 'default';
            // var commandGroup = this.song.notes[noteGroupName];
            // if(!commandGroup)
            //     throw new Error("Note group not found: " + noteGroupName);
            console.log('Updating Editor:', commandGroup);

            this.gridElement.innerHTML = '';

            var rowCommands = [];
            for(var i=0; i<commandGroup.length; i++) {
                var args = commandGroup[i];
                var commandName = normalizeCommandName(args[0]);
                switch(commandName) {
                    default:
                        rowCommands.push(args);
                        break;

                    case 'Pause':
                        rowCommands.push(args);
                        var rowElm = new SongEditorGridRowElement(args);
                        rowElm.addCommands(rowCommands);
                        if(this.gridElement.children.length % 2 === 0)
                            rowElm.classList.add('odd');
                        rowCommands = [];
                        this.gridElement.appendChild(rowElm);
                        break;
                }

            }
        }

        playInstrument(instrumentName, noteFrequency, noteStartTime, noteLength, options) {
            var instrument = this.getInstrument(instrumentName);
            noteFrequency = this.getNoteFrequency(noteFrequency || 'C4');

            var noteEvent = instrument(this.audioContext, noteFrequency, noteStartTime, noteLength, options);
            if(options.associatedElement) {
                if(noteStartTime - .5 > this.audioContext.currentTime)
                    setTimeout(function() {
                        options.associatedElement.classList.add('playing');
                    }, (noteStartTime - this.audioContext.currentTime) * 1000);
                else
                    options.associatedElement.classList.add('playing');

                setTimeout(function() {
                    options.associatedElement.classList.remove('playing');
                }, (noteStartTime + noteLength - this.audioContext.currentTime) * 1000);
            }
            return noteEvent;
        }

        playNote(noteArgs, noteStartTime, bpm) {
            var instrumentName = noteArgs[1];
            var noteFrequency =  noteArgs[2];
            var noteLength = (noteArgs[3] || 1) * (240 / bpm);
            var options = noteArgs[4] || {};
            if(noteArgs.associatedElement)
                options.associatedElement = noteArgs.associatedElement;

            return this.playInstrument(instrumentName, noteFrequency, noteStartTime, noteLength, options);
        }

        playNotes(commandList, startPosition, seekLength, playbackOffset) {
            var currentPosition = 0;
            var currentBPM = this.getCurrentBPM();
            var noteEvents = [];
            for(var i=0; i<commandList.length; i++) {
                var command = commandList[i];
                var commandName = normalizeCommandName(command[0]);
                switch(commandName) {
                    case 'Note':
                        if(currentPosition < startPosition)
                            continue;   // Notes were already played
                        var noteEvent = this.playNote(command, currentPosition + playbackOffset, currentBPM);
                        noteEvents.push(noteEvent);
                        // noteBuffer.push([currentPosition, note]);
                        // notesPlayed += this.playInstrument(note) ? 0 : 1;
                        break;

                    case 'Pause':
                        currentPosition += command[1] * (240 / currentBPM);
                        break;

                    case 'GroupExecute':
                        // if(currentPosition < startPosition) // Execute all groups each time
                        //     continue;
                        var noteGroupList = this.song.noteGroups[command[1]];
                        if(!noteGroupList)
                            throw new Error("Note group not found: " + command[1]);
                        var groupNoteEvents = this.playNotes(noteGroupList, startPosition - currentPosition, seekLength, playbackOffset);
                        noteEvents = noteEvents.concat(groupNoteEvents);
                        break;
                }
                if(seekLength && currentPosition >= startPosition + seekLength)
                    break;
            }
            return noteEvents;
        }

        play (seekPosition) {
            if(seekPosition)
                this.seekPosition = seekPosition;

            // this.lastNotePosition = 0;
            this.startTime = this.audioContext.currentTime - this.seekPosition;
            // console.log("Start playback:", this.startTime);
            this.playing = true;
            this.processPlayback();

            document.dispatchEvent(new CustomEvent('song:started', {
                detail: this
            }));
        }

        pause() {
            this.playing = false;
        }

        processPlayback () {
            if(this.playing === false) {
                console.info("Playing paused");
                return;
            }
            var noteEvents = this.playNotes(
                this.song.notes,
                this.seekPosition,
                this.seekLength,
                this.audioContext.currentTime
                );

            // this.seekPosition += this.seekLength;
            this.seekPosition = this.audioContext.currentTime - this.startTime;

            if(noteEvents.length > 0) {
                // console.log("Notes playing:", noteEvents, this.seekPosition, this.currentPosition);
                setTimeout(this.processPlayback.bind(this), this.seekLength * 1000);

                this.dispatchEvent(new CustomEvent('song:playing', {
                    detail: this
                }));
            } else{
                console.log("Song finished");
                this.seekPosition = 0;
                this.playing = false;

                // Update UI
                this.dispatchEvent(new CustomEvent('song:finished', {
                    detail: this
                }));
            }
        }

        getInstrument(path) {
            if(!window.instruments)
                throw new Error("window.instruments is not loaded");

            var pathList = path.split('.');
            var pathTarget = window.instruments;

            if(this.song.aliases[pathList[0]])
                pathList[0] = this.song.aliases[pathList[0]];

            for (var i = 0; i < pathList.length; i++) {
                if (pathTarget[pathList[i]]) {
                    pathTarget = pathTarget[pathList[i]];
                } else {
                    pathTarget = null;
                    break;
                }
            }
            if (pathTarget && typeof pathTarget === 'object')
                pathTarget = pathTarget.default;
            if (!pathTarget)
                throw new Error("Instrument not found: " + pathList.join('.') + ' [alias:' + path + ']');
            return pathTarget;
        }

        getNoteFrequency (note) {
            if(Number(note) === note && note % 1 !== 0)
                return note;
            var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
                octave,
                keyNumber;

            if (note.length === 3) {
                octave = note.charAt(2);
            } else {
                octave = note.charAt(1);
            }

            keyNumber = notes.indexOf(note.slice(0, -1));

            if (keyNumber < 3) {
                keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
            } else {
                keyNumber = keyNumber + ((octave - 1) * 12) + 1;
            }

            // console.log("Note: ", note, octave, keyNumber);

            // Return frequency of note
            return 440 * Math.pow(2, (keyNumber- 49) / 12);
        }


        onKeyDown(e) {
            if(this.depressedKeys.indexOf(e.key) > -1) {
                // console.info("Ignoring repeat keydown: ", e);
                return;
            }
            this.depressedKeys.push(e.key);

            var selectedCell = this.querySelector('song-editor-grid-cell.selected')
                || this.querySelector('song-editor-grid-cell');
            var selectedRow = selectedCell.parentNode;
            switch(e.key) {
                case 'ArrowRight':
                    if(selectedCell.nextSibling) {
                        selectedCell.nextSibling.select();
                    } else if(selectedRow.nextSibling) {
                        selectedRow.nextSibling.firstChild.select();
                    }
                    break;
                case 'ArrowLeft':
                    if(selectedCell.previousSibling) {
                        selectedCell.previousSibling.select();
                    } else if(selectedRow.previousSibling) {
                        selectedRow.previousSibling.lastChild.select();
                    }
                    break;
                case 'ArrowDown':
                    if(selectedRow.nextSibling) {
                        selectedRow.nextSibling.firstChild.select();
                    }
                    break;
                case 'ArrowUp':
                    if(selectedRow.previousSibling) {
                        selectedRow.previousSibling.firstChild.select();
                    }
                    break;

                case ' ':
                    if(this.playing)    this.pause();
                    else                this.play();
                    break;

                default:
                    selectedCell.onKeyDown(e);
                    if(!e.defaultPrevented)
                        console.info('Unused keydown', e.key);
                    break;
            }
        }

        onKeyUp(e) {
            var i = this.depressedKeys.indexOf(e.key);
            if(i > -1) {
                this.depressedKeys.splice(i, 1);
            }
        }
    }

    // Grid elements

    class SongEditorGridElement extends HTMLElement {
        get editor() { return findEditorParentNode(this); }
    }

    class SongEditorGridRowElement extends HTMLElement {
        /**
         *
         * @param pauseCommand
         */
        constructor(pauseLength) {
            super();
            if(pauseLength)
               this.setAttribute('pause', pauseLength)
        }
        get editor() { return findEditorParentNode(this); }

        connectedCallback() {
            this.addEventListener('click', this.select.bind(this));
        }


        addCommands(commandList) {
            for(var i=0; i<commandList.length; i++)
                this.addCommand(commandList[i]);
        }

        addCommand(command) {
            if(!command)
                throw new Error("Invalid command");
            var cellElm = new SongEditorGridCellElement(command);
            this.appendChild(cellElm);
        }

        select() {
            clearElementClass('selected', 'song-editor-grid-row.selected');
            this.classList.add('selected');
        }
    }

    class SongEditorGridCellElement extends HTMLElement {

        constructor(command) {
            super();
            this.command = command;
            command.associatedElement = this;
        }

        get editor() { return findEditorParentNode(this); }

        connectedCallback() {
            this.addEventListener('click', this.select.bind(this));
            this.refresh();
        }

        refresh() {
            this.innerHTML = '';
            var commandName = normalizeCommandName(this.command[0]);
            this.classList.add('command-' + commandName.toLowerCase());

            var commandElm = new SongEditorGridCommandElement(commandName);
            commandElm.innerHTML = commandName[0];
            this.appendChild(commandElm);

            for (var i = 1; i < this.command.length; i++) {
                var arg = this.command[i];
                var argElm = new SongEditorGridParameterElement(arg); // Don't customize parameter styles here
                this.appendChild(argElm);
                argElm.innerHTML = arg;
            }
        }

        select() {
            this.parentNode.select();
            clearElementClass('selected', 'song-editor-grid-cell.selected');
            this.classList.add('selected');
        }

        onKeyDown(e) {
            var commandName = normalizeCommandName(this.command[0]);
            switch(commandName) {
                case 'Note':
                    var keyboard = SongEditorGridCellElement.keyboardLayout;
                    if(keyboard[e.key]) {
                        this.command[2] = keyboard[e.key];
                        this.refresh();
                        e.preventDefault();

                        var noteEvent = this.editor.playInstrument(this.command[1], this.command[2], this.editor.audioContext.currentTime, null, {
                            associatedElement: this
                        });
                        var noteUpCallback = function(e2) {
                            if(e.key === e2.key) {
                                this.editor.removeEventListener('keyup', noteUpCallback);
                                noteEvent.stop(0);
                                // console.info("Stopping Note: ", noteEvent);
                                e2.preventDefault();
                            }
                        }.bind(this);
                        this.editor.addEventListener('keyup', noteUpCallback);
                        return;
                    }
                    break;
                default:
                    console.log("Unused keydown: ", this, this.command, e);
                    e.preventDefault();
                    break;
            }
        }


    }

    SongEditorGridCellElement.keyboardLayout = {
        '2':'C#5', '3':'D#5', '5':'F#5', '6':'G#5', '7':'A#5', '9':'C#6', '0':'D#6',
        'q':'C5', 'w':'D5', 'e':'E5', 'r':'F5', 't':'G5', 'y':'A5', 'u':'B5', 'i':'C6', 'o':'D6', 'p':'E6',
        's':'C#4', 'd':'D#4', 'g':'F#4', 'h':'G#4', 'j':'A#4', 'l':'C#5', ';':'D#5',
        'z':'C4', 'x':'D4', 'c':'E4', 'v':'F4', 'b':'G4', 'n':'A4', 'm':'B4', ',':'C5', '.':'D5', '/':'E5',
    };

    class SongEditorGridCommandElement extends HTMLElement {
        constructor(commandName) {
            super();
            if(commandName)
                this.setAttribute('name', commandName)
        }

        get editor() { return findEditorParentNode(this); }

        connectedCallback() {
            this.addEventListener('click', this.select.bind(this));
        }

        select() {
            this.parentNode.select();
            clearElementClass('selected', 'song-editor-grid-command.selected');
            this.classList.add('selected');
        }
    }

    class SongEditorGridParameterElement extends HTMLElement {
        constructor(parameterValue) {
            super();
            if(parameterValue)
                this.setAttribute('value', parameterValue)
        }

        get editor() { return findEditorParentNode(this); }

        connectedCallback() {
            this.addEventListener('click', this.select.bind(this));
        }

        select() {
            this.parentNode.select();
            clearElementClass('selected', 'song-editor-grid-parameter.selected');
            this.classList.add('selected');
        }
    }

    // Menu elements

    class SongEditorMenuElement extends HTMLElement {
        constructor() {
            super();
        }

        get editor() { return findEditorParentNode(this); }

        connectedCallback() {
            this.addEventListener('keydown', this.onInput.bind(this));
            this.addEventListener('click', this.onInput.bind(this));
            // let shadowRoot = this.attachShadow({mode: 'open'});
        }


        onInput(e) {
            switch(e.type) {
                case 'click':
                    break;

                case 'keydown':
                    break;

            }
            // console.log("Menu", e);
            if(e.target instanceof SongEditorMenuItemElement) {
                // console.log("Executing menu item ", e.target);
                e.target.executeMenuCommand();
            }
        }

    }
    class SongEditorSubMenuElement extends SongEditorMenuElement {

    }

    class SongEditorMenuItemElement extends HTMLElement {
        constructor() {
            super();
        }

        get editor() { return findEditorParentNode(this); }
        get action() { return this.getAttribute('action'); }

        executeMenuCommand() {
            if(!this.action)
                return;
            var menuAction = menuActions[this.action];
            if(!menuAction)
                throw new Error("Unknown menu action: " + this.action);
            menuAction.call(this, this.editor);
        }
    }


    // Define custom elements
    customElements.define('song-editor', SongEditorElement);
    customElements.define('song-editor-menu', SongEditorMenuElement);
    customElements.define('song-editor-submenu', SongEditorSubMenuElement);
    customElements.define('song-editor-menu-item', SongEditorMenuItemElement);
    customElements.define('song-editor-grid', SongEditorGridElement);
    customElements.define('song-editor-grid-row', SongEditorGridRowElement);
    customElements.define('song-editor-grid-cell', SongEditorGridCellElement);
    customElements.define('song-editor-grid-command', SongEditorGridCommandElement);
    customElements.define('song-editor-grid-parameter', SongEditorGridParameterElement);


    // Load Javascript dependencies
    loadStylesheet('game/audio/editor/song-editor.css');

    function loadScript(scriptPath, onLoaded) {
        let scriptPathEsc = scriptPath.replace(/[/.]/g, '\\$&');
        let scriptElm = document.head.querySelector('script[src$=' + scriptPathEsc + ']');
        if (!scriptElm) {
            scriptElm = document.createElement('script');
            scriptElm.src = scriptPath;
            scriptElm.onload = function(e) {
                for(var i=0; i<scriptElm.onloads.length; i++)
                    scriptElm.onloads[i](e);
                scriptElm.onloads = null;
            };
            document.head.appendChild(scriptElm);
        }
        if(!scriptElm.onloads) scriptElm.onloads = [];
        scriptElm.onloads.push(onLoaded);
    }
    function loadStylesheet(styleSheetPath, onLoaded) {
        let styleSheetPathEsc = styleSheetPath.replace(/[/.]/g, '\\$&');
        let foundScript = document.head.querySelectorAll('link[href$=' + styleSheetPathEsc + ']');
        if (foundScript.length === 0) {
            let styleSheetElm = document.createElement('link');
            styleSheetElm.href = styleSheetPath;
            styleSheetElm.rel = 'stylesheet';
            styleSheetElm.onload = onLoaded;
            document.head.appendChild(styleSheetElm);
        }
    }
    function loadJSON(jsonPath, onLoaded) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', jsonPath, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status === 200) {
                onLoaded(null, xhr.response);
            } else {
                onLoaded(status, xhr.response);
            }
        };
        xhr.send();
    }

    function normalizeCommandName(commandString) {
        switch(commandString.toLowerCase()) {
            case 'n':   case 'note':            return 'Note';
            case 'ge':  case 'groupexecute':    return 'GroupExecute';
            case 'p':   case 'pause':           return 'Pause';
        }
        throw new Error("Unknown command: " + commandString);
    }

    function clearElementClass(className, selector) {
        var clearElms = document.querySelectorAll(selector || '.' + className);
        for(var i=0; i<clearElms.length; i++)
            clearElms[i].classList.remove(className);
    }

    // Element commands

    function findEditorParentNode(editorChildElement) {
        while(editorChildElement = editorChildElement.parentNode)
            if(editorChildElement instanceof SongEditorElement)
                break;
        return editorChildElement;
    }

    // File Commands

    function saveSongToMemory(song) {
        if(!song.guid)
            song.guid = generateGUID();
        var songList = JSON.parse(localStorage.getItem('song-editor-saved-list') || "[]");
        if(songList.indexOf(song.guid) === -1)
            songList.push(song.guid);
        console.log("Saving song: ", song, songList);
        localStorage.setItem('song:' + song.guid, JSON.stringify(song));
        localStorage.setItem('song-editor-saved-list', JSON.stringify(songList));
    }

    function generateGUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    // Menu commands

    function renderEditorMenuContent() {
        return `
            <song-editor-menu-item>
                <span>File</span>
                <song-editor-submenu>
                    <song-editor-menu-item>
                        <span>Load from memory ></span>
                        ${renderEditorMenuLoadFromMemory()}
                    </song-editor-menu-item>
                    <song-editor-menu-item action="load:file">Load from file</song-editor-menu-item>
                    <song-editor-menu-item action="load:url">Load from url</song-editor-menu-item>
                    
                    <hr/>
                    <song-editor-menu-item action="save:memory">Save to memory</song-editor-menu-item>
                    <song-editor-menu-item action="save:file">Save to file</song-editor-menu-item>
                    
                    <hr/>
                    <song-editor-menu-item action="export:file"><span>Export to audio file</span></song-editor-menu-item>
                </song-editor-submenu>
            </song-editor-menu-item>
            
            <song-editor-menu-item>Invite</song-editor-menu-item>
            <song-editor-menu-item>Notes</song-editor-menu-item>
            <song-editor-menu-item>Instruments</song-editor-menu-item>
        `;
    }

    function renderEditorMenuLoadFromMemory() {
        return `
            <song-editor-submenu>
                <song-editor-menu-item><span>No Recent Items</span></song-editor-menu-item>
                <song-editor-menu-item>No Recent Items</song-editor-menu-item>
                <song-editor-menu-item>No Recent Items</song-editor-menu-item>
                <song-editor-menu-item>No Recent Items</song-editor-menu-item>
                <song-editor-menu-item>No Recent Items</song-editor-menu-item>
                <song-editor-menu-item>No Recent Items</song-editor-menu-item>
                <song-editor-menu-item>No Recent Items</song-editor-menu-item>
                <song-editor-menu-item>No Recent Items</song-editor-menu-item>
                ${renderSubItems()}
            </song-editor-submenu>
        `;
        function renderSubItems() {
            var recentSongs = localStorage.getItem('song-editor-recent');
            console.log("Loading song list from memory: ", recentSongs);
            return ``;
        }
    }

    function menuCommandFileLoadFromMemory() {
        var subMenu = this.nextSibling;
        console.log('Submenu', subMenu);

        this.classList.add('open');
    }

    const menuActions = {
        'save:memory': function(editor) { editor.saveSongToMemory(); }
    };
})();
