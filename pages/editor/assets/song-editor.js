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
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = `
<song-editor-menu>
</song-editor-menu>
<song-editor-grid>
</song-editor-grid>
`;
            // shadowRoot.appendChild(instance);
            this.gridElement = shadowRoot.querySelector('song-editor-grid');
        }

        connectedCallback() {
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

        updateEditor() {
            console.log('Updating Editor:', this.songLoader.noteGroups);

        }
    }

    class SongEditorMenuElement extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = `
<song-editor-menu-item>File</song-editor-menu-item>
<song-editor-menu-item>Edit</song-editor-menu-item>
`;
        }
    }

    class SongEditorGridCommandElement extends HTMLElement {
    }

    class SongEditorGridParameterElement extends HTMLElement {
    }



    customElements.define('song-editor', SongEditorElement);
    customElements.define('song-editor-menu', SongEditorMenuElement);
    // customElements.define('song-editor-grid', SongEditorGridElement);
    // customElements.define('song-editor-grid-row', SongEditorGridRowElement);
    // customElements.define('song-editor-grid-entry', SongEditorGridEntryElement);
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
            styleSheetElm.type = 'stylesheet';
            styleSheetElm.onload = onLoaded;
            document.head.appendChild(styleSheetElm);
        }
    }
})();
