"use strict";

var site = (function() {
    function Site() {
        this.links = [
            ['Game', 'index.html'],
            ['Story', 'story.html', [
                ['Human History', 'story.html#timeline'],
                ['Locations', 'story.html#locations'],
                ['Technology', 'story.html#technology'],
                ['Characters', 'story.html#characters'],
                ['Vehicles', 'story.html#vehicles'],
            ]],
            ['Contribute', 'contribute.html', [
                ['By Playing', 'contribute.html#play'],
                ['By Sponsoring', 'contribute.html#sponsor'],
                ['By Developing', 'contribute.html#develop'],
            ]],
            ['Media', 'media.html', [
                ['FF OST Sample', 'media.html#music'],
                ['FF Concept Art', 'media.html#art'],
            ]],
            ['FAQ', 'faq.html'],
            ['Demo', 'demo.html']
        ]
    }

    Site.prototype.getUrlParams = function() {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        var urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
        return urlParams;
    };

    Site.prototype.onEvent = function(className, eventName, callback, options) {
        var elements = document.getElementsByClassName(className);
        for(var i=0; i<elements.length; i++)
            elements[i].addEventListener(eventName, callback, options)
    };

    Site.prototype.includeScript = function(scriptPath, callback) {
        var scriptElm = document.createElement('script');
        scriptElm.src = scriptPath;
        scriptElm.onload = callback;
        document.head.appendChild(scriptElm);
    };

    Site.prototype.generateNavLinks = function(container) {
        var fileName = location.href.split("/").slice(-1)[0], hash=null;
        var hashSplit = fileName.split('#');
        if(hashSplit.length > 1) {
            fileName = hashSplit[0];
            hash = hashSplit[1];
        }
        console.log("generating nav links: ", fileName, hash);
        for (var i = 0; i < this.links.length; i++) {
            var liMenuContainer = document.createElement('li');
            liMenuContainer.classList.add('menu-link-container');
            var aMenuLink = document.createElement('a');
            aMenuLink.href = this.links[i][1];
            aMenuLink.classList.add('menu-link');
            aMenuLink.innerHTML = this.links[i][0];
            aMenuLink.addEventListener('click', onMenuClick);
            container.appendChild(liMenuContainer);
            liMenuContainer.appendChild(aMenuLink);

            if(this.links[i][1] === fileName)
                aMenuLink.classList.add('highlight');

            if(this.links[i][2]) {
                var ulSubMenu = document.createElement('ul');
                ulSubMenu.classList.add('menu-links', 'submenu-links');
                liMenuContainer.appendChild(ulSubMenu);
                for(var j=0; j<this.links[i][2].length; j++) {
                    var liSubMenuContainer = document.createElement('li');
                    liSubMenuContainer.classList.add('menu-link-container', 'submenu-link-container');
                    ulSubMenu.appendChild(liSubMenuContainer);

                    var sublink = this.links[i][2][j];
                    var aSubmenuLink = document.createElement('a');
                    aSubmenuLink.addEventListener('click', onSubMenuClick);
                    aSubmenuLink.href = sublink[1];
                    aSubmenuLink.classList.add('menu-link', 'submenu-link');
                    aSubmenuLink.innerHTML = sublink[0];
                    liSubMenuContainer.appendChild(aSubmenuLink);
                    // if(sublink[1] === fileName + '#' + hash)
                    //     aSubmenuLink.classList.add('highlight');

                }
            }
        }
    };

    function onMenuClick(e) {
        // if(this.classList.contains('highlight')) {
        var menu = this.parentNode;
        console.info("Toggle Menu", menu);
        if(!menu.classList.contains('open')) {
            e.preventDefault();
            menu.classList.add('open');
        }
        var menus = document.getElementsByClassName('menu-link-container');
        for(var i=0; i<menus.length; i++) {
            if(menus[i] === menu)
                continue;
            menus[i].classList.remove('open');
        }
        // } else {
        //     document.body.classList.remove('menu');
        // }
    }

    function onSubMenuClick(e) {
        // e.preventDefault();
        // this.parentNode.parentNode.parentNode.classList.remove('open');
        document.body.classList.remove('menu');
    }

    return new Site;
})();

document.addEventListener("DOMContentLoaded", function() {

    // Event Listeners
    site.onEvent('toggle-page-menu', 'click', togglePageMenu);

    // Functions
    function togglePageMenu(e) {
        document.body.classList.toggle('menu');
    }

    // Auto-generate nav bar
    (function() {
        var pageLinks = document.getElementsByClassName('menu-links');
        for(var i=0; i<pageLinks.length; i++)
            if(pageLinks[i].classList.contains('autogenerate'))
                site.generateNavLinks(pageLinks[i]);
    })();
});
