/**
 * Editor requires a modern browser
 * One groups displays at a time. Columns imply simultaneous notes. Pauses are implied by the scale
 */

(function() {
    // if (!window.SongEditor)
    //     window.SongEditor = SongEditor;

    class SongEditorElement extends HTMLElement {
        constructor() {
            super();
            this.songLoader = null;
        }

        connectedCallback() {
            this.gridElement = new SongEditorGridElement();

            this.appendChild(new SongEditorMenuElement())
            this.appendChild(this.gridElement)

            if(this.getSongURL())
                this.loadSong(this.getSongURL());

            if(!this.getAttribute('tabindex'))
                this.setAttribute('tabindex', 1);
            this.addEventListener('keydown', this.onKeyDown.bind(this));
        }

        getSongURL() { return this.getAttribute('src');}

        loadSong(songURL, onLoaded) {
            loadScript('game/audio/loader/song-loader.js', function() {
                this.songLoader = new SongLoader(songURL);
                this.songLoader.loadFile(function() {
                    this.setAttribute('src', songURL);
                    console.log('Song loaded:', this.songLoader);
                    this.updateEditor();
                }.bind(this));
                console.log('Song loading:', this.songLoader);
            }.bind(this));
        }

        updateEditor(options) {
            options = options || {};
            var noteGroupName = options.noteGroup || 'default';
            var commandGroup = this.songLoader.noteGroups[noteGroupName];
            if(!commandGroup)
                throw new Error("Note group not found: " + noteGroupName);
            console.log('Updating Editor:', commandGroup);

            this.gridElement.innerHTML = '';


            var rowCommands = [];
            for(var i=0; i<commandGroup.length; i++) {
                var command = commandGroup[i];
                if(command instanceof SongLoader.Pause) {
                    rowCommands.push(command);
                    var rowElm = new SongEditorGridRowElement(command.pauseLength);
                    rowElm.addCommands(rowCommands);
                    if(this.gridElement.children.length % 2 === 0)
                        rowElm.classList.add('odd');
                    rowCommands = [];
                    this.gridElement.appendChild(rowElm);
                } else {
                    rowCommands.push(command);
                }
            }
        }

        onKeyDown(e) {
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

        connectedCallback() {
            this.addEventListener('click', this.select.bind(this));
            this.refresh();
        }

        refresh() {
            this.innerHTML = '';
            var command = this.command;
            this.classList.add('command-' + command.constructor.name.toLowerCase());

            var commandElm = new SongEditorGridCommandElement(command.constructor.name);
            commandElm.innerHTML = command.constructor.name[0];
            this.appendChild(commandElm);

            if(command.args) {
                for (var i = 0; i < command.args.length; i++) {
                    var arg = command.args[i];
                    var argElm = new SongEditorGridParameterElement(arg); // Don't customize parameter styles here
                    this.appendChild(argElm);
                    argElm.innerHTML = arg;
                }
            }
        }

        select() {
            this.parentNode.select();
            clearElementClass('selected', 'song-editor-grid-cell.selected');
            this.classList.add('selected');
        }

        onKeyDown(e) {
            switch(this.command.constructor.name.toLowerCase()) {
                case 'note':
                    var keyboard = SongEditorGridCellElement.keyboardLayout;
                    if(keyboard[e.key]) {
                        var playNote = keyboard[e.key];
                        console.log("Play Note: ", playNote);
                        this.command.setNote(playNote);
                        this.refresh();
                        e.preventDefault();
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
    loadStylesheet('pages/editor/assets/song-editor.css');

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

    function clearElementClass(className, selector) {
        var clearElms = document.querySelectorAll(selector || '.' + className);
        for(var i=0; i<clearElms.length; i++)
            clearElms[i].classList.remove(className);
    }
})();
