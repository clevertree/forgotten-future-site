"use strict";

document.addEventListener("DOMContentLoaded", function() {
    /** Site Links **/
    site.links = [
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
            ['Check Status', 'contribute.html#status'],
        ]],
        ['Media', 'media.html', [
            ['FF OST Sample', 'media.html?autoplay=true'],
            ['FF Concept Art', 'media.html#art'],
        ]],
        ['FAQ', 'faq.html'],
        ['WebGL Demo', 'demo.html']
    ];

    // Event Listeners
    site.onEvent('toggle-page-menu', 'click', togglePageMenu);
    window.addEventListener('resize', onResize);
    onResize();

    // Functions
    function togglePageMenu(e) {
        document.body.classList.toggle('menu');
    }

    function onResize() {
        var isMobile = (window.innerWidth <= 800); // && window.innerHeight <= 600);
        document.body.classList.toggle('mobile', isMobile);
        // console.log("Resize. isMobile = ", isMobile);
    }

    // Auto-generate nav bar
    (function() {
        var pageLinks = document.getElementsByClassName('menu-links');
        for(var i=0; i<pageLinks.length; i++)
            if(pageLinks[i].classList.contains('autogenerate'))
                site.generateNavLinks(pageLinks[i]);
    })();
});

var site = (function() {
    function Site() {
        this.links = [];
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
            hash = hashSplit[1];
        }
        fileName = hashSplit[0].split('?')[0];
        // console.log("generating nav links: ", fileName, hash);
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

            if(this.links[i][1] === fileName) {
                aMenuLink.classList.add('highlight');
                if(document.body.classList.contains('mobile'))
                    liMenuContainer.classList.add('open');
            }
            if(this.links[i][2]) {
                var ulSubMenu = document.createElement('ul');
                ulSubMenu.classList.add('submenu-links'); // 'menu-links',
                liMenuContainer.appendChild(ulSubMenu);
                for(var j=0; j<this.links[i][2].length; j++) {
                    var liSubMenuContainer = document.createElement('li');
                    liSubMenuContainer.classList.add('menu-link-container', 'submenu-link-container');
                    ulSubMenu.appendChild(liSubMenuContainer);

                    var sublink = this.links[i][2][j];
                    var aSubmenuLink = document.createElement('a');
                    aSubmenuLink.addEventListener('click', onSubMenuClick);
                    aSubmenuLink.href = sublink[1];
                    aSubmenuLink.classList.add('submenu-link'); // 'menu-link',
                    aSubmenuLink.innerHTML = sublink[0];
                    liSubMenuContainer.appendChild(aSubmenuLink);
                    // if(sublink[1] === fileName + '#' + hash)
                    //     aSubmenuLink.classList.add('highlight');

                }
            }
        }
    };

    Site.prototype.isMobile = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

        check = (window.innerWidth <= 800 && window.innerHeight <= 600);
        return check;
    };

    function onMenuClick(e) {
        // if(this.classList.contains('highlight')) {
        var menu = this.parentNode;
        var submenu = this.nextSibling;
        // console.info("Toggle Menu", menu, submenu);
        if(document.body.classList.contains('mobile')) {
            if (!menu.classList.contains('open') && submenu) {
                e.preventDefault();
                menu.classList.add('open');
            }
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