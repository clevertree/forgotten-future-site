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
        }

        getSong() {
            return this.song;
        }

        connectedCallback() {
            this.addEventListener('keydown', this.onKeyDown.bind(this));
            this.addEventListener('keyup', this.onKeyUp.bind(this));

            this.gridElement = new SongEditorGridElement();

            this.appendChild(new SongEditorMenuElement());
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
            songData.notes.default = songData.notes.default || {};
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

        updateEditor(options) {
            options = options || {};
            var noteGroupName = options.noteGroup || 'default';
            var commandGroup = this.song.notes[noteGroupName];
            if(!commandGroup)
                throw new Error("Note group not found: " + noteGroupName);
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

        playInstrument(instrumentName, noteFrequencyName, noteStartTime, noteLength, options) {
            var instrument = this.getInstrument(instrumentName);
            var noteFrequency = this.getNoteFrequency(noteFrequencyName || 'C4');
            noteStartTime = noteStartTime || this.audioContext.currentTime;
            // var noteLength = null; // args[3] * bpmRatio; // TODO keyup
            var noteEvent = instrument(this.audioContext, noteFrequency, noteStartTime, noteLength, options);
            // console.info("Playing Instrument: ", noteEvent);
            return noteEvent;
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
        }

        getEditor() {
            return this.parentNode.parentNode.parentNode;

        }

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

                        var editor = this.getEditor();
                        var noteEvent = editor.playInstrument(this.command[1], this.command[2]);
                        var noteUpCallback = function(e2) {
                            if(e.key === e2.key) {
                                editor.removeEventListener('keyup', noteUpCallback);
                                noteEvent.stop(0);
                                // console.info("Stopping Note: ", noteEvent);
                                e2.preventDefault();
                            }
                        };
                        editor.addEventListener('keyup', noteUpCallback);
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
        '2':'Cs5', '3':'Ds5', '5':'Fs5', '6':'Gs5', '7':'As6', '9':'Cs6', '0':'Ds6',
        'q':'C5', 'w':'D5', 'e':'E5', 'r':'F5', 't':'G5', 'y':'A6', 'u':'B6', 'i':'C6', 'o':'D6', 'p':'E6',
        's':'Cs4', 'd':'Ds4', 'g':'Fs4', 'h':'Gs4', 'j':'As5', 'l':'Cs5', ';':'Ds5',
        'z':'C4', 'x':'D4', 'c':'E4', 'v':'F4', 'b':'G4', 'n':'A5', 'm':'B5', ',':'C5', '.':'D5', '/':'E5',
    };

    class SongEditorGridCommandElement extends HTMLElement {
        constructor(commandName) {
            super();
            if(commandName)
                this.setAttribute('name', commandName)
        }

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

        connectedCallback() {
            // let shadowRoot = this.attachShadow({mode: 'open'});
            this.innerHTML = `
<song-editor-menu-item>File</song-editor-menu-item>
<song-editor-menu-item>Edit</song-editor-menu-item>
`;
        }

    }


    // Define custom elements
    customElements.define('song-editor', SongEditorElement);
    customElements.define('song-editor-menu', SongEditorMenuElement);
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

    function playNoteInstrument(args) {
        var instrumentName = args[0];
        console.log("TODO Play Note: ", args, instrumentName);
    }

    function getInstrumentCustomArguments(instrumentCallback) {
        var args = instrumentCallback.toString().replace (/[\r\n\s]+/g, ' ').
            match (/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/).
            slice (1,3).
            join ('').
            split (/\s*,\s*/);
        args.shift();
        args.shift();
        args.shift();
        args.shift();
        return args;
    }

    function clearElementClass(className, selector) {
        var clearElms = document.querySelectorAll(selector || '.' + className);
        for(var i=0; i<clearElms.length; i++)
            clearElms[i].classList.remove(className);
    }
})();
