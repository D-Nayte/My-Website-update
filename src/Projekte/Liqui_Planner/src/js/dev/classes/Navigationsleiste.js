"use strict";

export class Navigationsleiste {

    constructor() {
        this._html = this._html_generieren();
        
    }

    _html_generieren(){
        let nav = document.createElement("nav");
        nav.setAttribute("id", "navigationsleiste")
        nav.innerHTML = `<a href="#">
            <span id="markenname"></span-markenname></a>`;
        return nav;
    }
    
    anzeigen() {
        document.querySelector("body").insertAdjacentElement("afterbegin",this._html)
    }
}

