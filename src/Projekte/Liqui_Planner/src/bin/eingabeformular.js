"use strikt";

let eingabeformular = {

    // Formular mit .innerHTML erstellen
    html_generieren() {
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
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags" required >
                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
            </div>
        </div>
        
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)" required >
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" placeholder="jjjj-mm-tt" size="10" title="Datum des Eintrags (Format: jjjj-mm-tt)"required >
            </div>
        </div>
       
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>`;
        
        this.absenden_event_hinzufügen(eingabeformular);
        return eingabeformular;
    },

    // erstellte HTML Elemente anzeigen lassen
    anzeigen () {
        let navigiations_leiste = document.querySelector("#navigationsleiste")
        navigiations_leiste.insertAdjacentElement("afterend", this.html_generieren());
        this.datum_aktualisieren();
    },

    // Eingabedaten ausgeben
    absenden_event_hinzufügen(eingabeformular){
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", eingabe => {
            eingabe.preventDefault()
           
            //daten holen und verarbeiten
            let form_data_roh = this.formulardaten_holen(eingabe);
            console.log(form_data_roh);
            form_data_verarbeitet = this.formulardaten_verarbeiten(form_data_roh);
            
            //daten validieren
            formular_fehler = this.formulardaten_validieren (form_data_verarbeitet);
            
            //auf Fehler prüfen und ausgeben
            if (formular_fehler.length === 0) {
               haushaltsbuch.eintrag_hinzufuegen(form_data_verarbeitet);
               eingabe.target.reset();
               this.datum_aktualisieren();
               this.html_fehlerbox_generieren(formular_fehler);
                
            } else {
            this.html_fehlerbox_generieren(formular_fehler);
            }
        });
    },

    //Formular Daten aus Formular in Objekt schreiben
    formulardaten_holen(eingabe) {
    
        return {
            titel: eingabe.target.elements.titel.value,
            typ: eingabe.target.elements.typ.value,
            betrag: eingabe.target.elements.betrag.value,
            datum: eingabe.target.elements.datum.valueAsDate,
        }
    },

    //Titel verarbeiten
    formulardaten_verarbeiten (eingabe) {
    
        let titel = eingabe.titel.trim();
        
        return {
            titel: titel,
            betrag: parseFloat(eingabe.betrag) * 100,
            typ: eingabe.typ,
            datum: eingabe.datum
        }
    },

    //Eingabe daten überprüfen auf richtigkeit
    formulardaten_validieren (eingabe) {
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
    },

    //Heutiges Datum vorhalten
    datum_aktualisieren() {
        let datum = document.querySelector("#datum")
        if (datum !== null) {
            datum.valueAsDate = new Date();
        } 
    },

    // Fehlerbox
    html_fehlerbox_generieren (fehler_arrey ) {
        
        //Ältere Fehlerbox entfernen
        document.querySelectorAll(".fehlerbox").forEach(e => e.remove());
        
        //HTML fehlerbox entfernt
        let fehler_box = document.createElement("div");
        fehler_box.className = "fehlerbox";
        fehler_box.innerHTML = `<span>Es gibt Fehler in folgenden Eingabefeldern</span>
        <ul>
        </ul>`;

        //Fehler einträge erzeugen und anzeigen wenn vorhanden
        if(fehler_arrey.length > 0){
            fehler_arrey.forEach(e => {
            let li = document.createElement("li");
            li.textContent = e;
            fehler_box.querySelector("ul").insertAdjacentElement("beforeend", li);
            document.querySelector("#eingabeformular").insertAdjacentElement("beforebegin", fehler_box);
        })} 
    }
};

