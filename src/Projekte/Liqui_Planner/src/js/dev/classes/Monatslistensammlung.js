import { Monatsliste } from "../exports.js";

export class Monatslistensammlung {
    
    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();

    }

    _eintrag_hinzufuegen(eintrag) {
        let monat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let jahr = eintrag.datum().toLocaleString("de-DE", {year: "numeric"});
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(sammlung_eintrag => {
            if (monat === sammlung_eintrag.monat() && jahr === sammlung_eintrag.jahr()) {
                sammlung_eintrag.eintrag_hinzufuegen(eintrag)
                monatsliste_vorhanden = true;
            }
        });
        if (!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen(jahr, monat, eintrag);
        }
        
    }

    _html_generieren() {
        let section_listen = document.createElement("section");
        section_listen.setAttribute("id", "monatslisten");
        this._monatslisten.forEach( eintrag => {
            section_listen.insertAdjacentElement("beforeend", eintrag.html());
        });
        return section_listen;

    }

    _monatsliste_hinzufuegen(jahr, monat, eingabe) {
        let monatsliste = new Monatsliste(jahr, monat)
        monatsliste.eintrag_hinzufuegen(eingabe)
        this._monatslisten.push(monatsliste)
    }

    aktualisieren(eintraege) {
        this._monatslisten = [];
        eintraege.forEach(eintrag => this._eintrag_hinzufuegen(eintrag))
        this._monatslisten_sortieren();
        this._monatslisten.forEach(e => e.aktualisieren());
        this._html = this._html_generieren();
        this.anzeigen();
    }

    anzeigen() {
        let eingabeformular_container = document.querySelector("#eingabeformular-container")
        if (eingabeformular_container !== null) {
            this._entfernen();
            eingabeformular_container.insertAdjacentElement("afterend", this._html);
        }
    }

    _entfernen() {
        let monatslistensammlung = document.querySelector("#monatslisten");
        if (monatslistensammlung !== null) {
            monatslistensammlung.remove();
        }
    }

    _monatslisten_sortieren() {    
        this._monatslisten = this._monatslisten.sort(function (a, b) {  
            
            if (a.jahr() === b.jahr()) {
                return a.monat() > b.monat() ? -1 : a.monat() < b.monat() ?  1 : 0;
            } else {
                return a.jahr() > b.jahr() ? -1 : a.jahr() < b.jahr() ?  1 : 0;
            }
      
        });  
    }
}

