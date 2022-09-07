"use strict";

export class Monatsliste {
    
    constructor(jahr, monat) {
        this._jahr = jahr;
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    monat() {
        return this._monat;
    }

    jahr() {
        return this._jahr;
    }

    html() {
        return this._html;
    }

    _html_generieren() {
        let monat_name = `${new Date(this._jahr, this._monat-1).toLocaleString("de-DE", {month:"long"})}`;
        let article = document.createElement("article");
        article.setAttribute(`class`, `monatsliste ${monat_name}`)
        let h2 = document.createElement("h2");
        article.insertAdjacentElement("afterbegin", h2)

        let span_monat_jahr = document.createElement("span");
        span_monat_jahr.setAttribute("class", "monat-jahr");
        span_monat_jahr.textContent = `${new Date(this._jahr, this._monat-1).toLocaleString("de-DE", {
            month: "long",
            year: "numeric"
        })}`;
        h2.insertAdjacentElement("afterbegin", span_monat_jahr);

        let span_bilanz = document.createElement("span");
        h2.insertAdjacentElement("beforeend", span_bilanz);
        this._bilanz >= 0 ? span_bilanz.setAttribute("class", "monatsbilanz positiv") : span_bilanz.setAttribute("class", "monatsbilanz negativ");
        span_bilanz.textContent = `${(this._bilanz /100).toFixed(2).replace(/\./, ",")} €`;

        let ul = document.createElement("ul");
        h2.insertAdjacentElement("afterend", ul);

        document.querySelectorAll(`.${monat_name}  ul`).forEach(ul => ul.remove());
            this._eintraege.forEach(eintrag => {
                ul.insertAdjacentElement("beforeend", eintrag.html());
            });
        article.insertAdjacentElement("beforeend",ul);

        return article;
    }   

    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag);
        this.aktualisieren()
    }

    _eintraege_sortieren () {                                                                           
        this._eintraege = this._eintraege.sort(function (a, b) {                                          
           return a.datum() > b.datum() ? -1 : a.datum() < b.datum() ?  1 : 0;      
        });                                                                                             
    }       
    
    aktualisieren() {
        this._eintraege_sortieren();
        this.bilanzieren();
        this._html = this._html_generieren();
    }

    bilanzieren() {
        this._bilanz = 0;
        this._eintraege.forEach(eintrag => {
            if (eintrag.typ() === "einnahme") {
                this._bilanz += eintrag.betrag();
            } else {
                this._bilanz -= eintrag.betrag();
            }
        });
    }
}

