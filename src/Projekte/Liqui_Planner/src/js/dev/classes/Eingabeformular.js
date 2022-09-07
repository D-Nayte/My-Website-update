/**
 * Das Modul "Eingabeformular" ist für das Eingabeformular der Anwendung zuständig.
 * @module classes/Eingabeformular
 */
import {Fehler_box} from "../exports.js";
import {liqui_planner as haushaltsbuch}  from "../liqui-planner.js";


/**
 * Die Klasse Eingabeformular stellt alle Eigenschaften und Methoden des Eingabeformulars (inkl.HTML und Evetns) zur verfügung.
 */
export class Eingabeformular {
    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Eingabeformular" das HTML des Eingabeformulars.
     * @property {Element} _html - das HTML des Eingabeformulars
     */
    constructor(){
        this.html = this._html_generieren();
    }

   // Formular mit .innerHTML erstellen
   _html_generieren() {
    let eingabeformular = document.createElement("section");
    eingabeformular.id= "eingabeformular-container";
    eingabeformular.innerHTML = `    
        
    <form id="eingabeformular" action="#" method="get"></form>

    <div class="eingabeformular-zeile">
        <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
    </div>
   
    <div class="eingabeformular-zeile">
        <div class="titel-typ-eingabe-gruppe">
            <label for="titel">Titel</label>
            <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags"  >
            <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
            <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
            <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
            <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
        </div>
    </div>
    
    <div class="eingabeformular-zeile">
        <div class="betrag-datum-eingabe-gruppe">
            <label for="betrag">Betrag</label>
            <input min = ".01" type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)"  >
            <label for="datum">Datum</label>
            <input type="date" id="datum" name="datum" form="eingabeformular"  size="10" title="Datum des Eintrags" >
        </div>
    </div>
   
    <div class="eingabeformular-zeile">
        <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
    </div>`;
    
    this._absenden_event_hinzufügen(eingabeformular);
    return eingabeformular;
}

    anzeigen () {
        let navigiations_leiste = document.querySelector("#navigationsleiste")
        if (navigiations_leiste !== null) {
            navigiations_leiste.insertAdjacentElement("afterend", this.html );
            this._datum_aktualisieren();
        }
    }

    _absenden_event_hinzufügen(eingabeformular){
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", eingabe => {
            eingabe.preventDefault()
        
            //daten holen und verarbeiten
            let form_data_roh = this._formulardaten_holen(eingabe);
            let form_data_verarbeitet = this._formulardaten_verarbeiten(form_data_roh);
            
            //daten validieren
            let formular_fehler = this._formulardaten_validieren (form_data_verarbeitet);
            
            //auf Fehler prüfen und ausgeben
            let fehler_liste = new Fehler_box();
            if (formular_fehler.length === 0) {
            haushaltsbuch.eintrag_hinzufuegen(form_data_verarbeitet);
            eingabe.target.reset();
            fehler_liste.anzeigen(formular_fehler)
            this._datum_aktualisieren();
            } else {
                fehler_liste.anzeigen(formular_fehler)
            }
        });
    }

    /**
     * Diese private Methode extrahiert die im Eingabeformular eingebenen Daten aus
     * dem Submit-Event des Eingabeformulars.
     * @param {Event} submit_event - das Submit-Event des Eingabe Formulars
     * @returns {Objekt} - einfaches Objekt mit den Rohdaten des Eingabeformulars
     */
    _formulardaten_holen(submit_event) {

        return {
            titel: submit_event.target.elements.titel.value,
            typ: submit_event.target.elements.typ.value,
            betrag: submit_event.target.elements.betrag.value,
            datum: submit_event.target.elements.datum.valueAsDate,
        }
    }

    _formulardaten_verarbeiten(eingabe) {
        let titel = eingabe.titel.trim();
        
        return {
            titel: titel,
            betrag: parseFloat(eingabe.betrag) * 100,
            typ: eingabe.typ,
            datum: eingabe.datum
        }
    }

    _formulardaten_validieren (eingabe) {
    let fehler = [];

        if (eingabe.titel === "") {
            fehler.push("Titel");
        }
        if (eingabe.typ.match(/^(?:einnahme|ausgabe)$/) === null) {
            fehler.push("Typ");
        }
        if (eingabe.datum === null) {
            fehler.push("Datum");
        }
        if (isNaN(eingabe.betrag)) {
            fehler.push("Betrag");
        }
        return fehler;
    }

    _datum_aktualisieren() {
        let datum = document.querySelector("#datum")
        if (datum !== null) {
            datum.valueAsDate = new Date();
        } 
    }
}
