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
            // let shadowRoot = this.attachShadow({mode: 'open'});
            this.innerHTML = `
<song-editor-menu>
</song-editor-menu>
<song-editor-grid>
</song-editor-grid>
`;
            // shadowRoot.appendChild(instance);
            this.gridElement = this.querySelector('song-editor-grid');
            if(this.getSongURL())
                this.loadSong(this.getSongURL());
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
    }


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

        addCommands(commandList) {
            for(var i=0; i<commandList.length; i++)
                this.addCommand(commandList[i]);
        }

        addCommand(command) {
            if(!command)
                throw new Error("Invalid command");
            var cellElm = new SongEditorGridCellElement();
            var commandElm = new SongEditorGridCommandElement(command.instrumentName);
            commandElm.innerHTML = command.constructor.name;
            cellElm.appendChild(commandElm);

            // TODO get command args and display them

            if(command.args) {
                for (var i = 0; i < command.args.length; i++) {
                    var arg = command.args[i];
                    var argElm = new SongEditorGridParameterElement(arg); // Don't customize parameter styles here
                    cellElm.appendChild(argElm);
                    argElm.innerHTML = arg;
                }
            }

            this.appendChild(cellElm);
        }
        connectedCallback() {
            console.log("Connected: ", this);
        }
    }

    class SongEditorGridCellElement extends HTMLElement {
    }

    class SongEditorGridCommandElement extends HTMLElement {
        constructor(commandName) {
            super();
            if(commandName)
                this.setAttribute('name', commandName)
        }
    }

    class SongEditorGridParameterElement extends HTMLElement {
        constructor(parameterValue) {
            super();
            if(parameterValue)
                this.setAttribute('value', parameterValue)
        }
    }

    // Menu

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
})();
