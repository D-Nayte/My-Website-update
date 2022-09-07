"use strikt";
//Haushaltsbuch

const haushaltsbuch = {

    eintraege: [],    
    gesamtbilanz: new Map(),
    

    //eintraege Sortieren Methode  DATUM IST EIN STRING und in einem Objekt!!!
    eintraege_sortieren () {                                                                            //Als übersicht für bedingten tenearen Operator
        this.eintraege = this.eintraege.sort(function (a, b) {                                          // if ( a.get("datum") > b.get("datum")) {
           return a.get("datum") > b.get("datum") ? -1 : a.get("datum") < b.get("datum") ?  1 : 0;      //     return -1;
        });                                                                                             // } else if ( a.get("datum") < b.get("datum")){
    },                                                                                                  //     return 1;
 //                                                                                                     // } else {
 //                                                                                                     //     return 0;
 //                                                                                                     // } 
                                                                            
 

    //HTML Eintrag generieren
    html_eintrag_generieren(eintrag){

        //Liste generieren mit passenden classen für einnahme und ausgabe
        let listenpunkt = document.createElement("li");
        eintrag.get("typ") == "einnahme" ? listenpunkt.setAttribute("class", "einnahme") : listenpunkt.setAttribute("class", "ausgabe");
        listenpunkt.setAttribute("data-timestamp", eintrag.get("timestamp"));

        //span Elemente für die Liste erzeugen
            //datum erzeugen
        let span_datum = document.createElement("span");
        span_datum.setAttribute("class", "datum");
        span_datum.textContent = eintrag.get("datum").toLocaleDateString("de-DE", {                  
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            });

            //Titel erzeugen
        let span_titel = document.createElement("span");
        span_titel.setAttribute("class", "titel");
        span_titel.textContent = eintrag.get ("titel");

            //Betrag erzeugen
        let span_betrag = document.createElement("span");
        span_betrag.setAttribute("class", "betrag");
        span_betrag.textContent = `${(eintrag.get("betrag") / 100).toFixed(2).replace(/\./, ",")} €`;

            //Button erzuegen
        let delete_button = document.createElement("button");
        delete_button.setAttribute("class", "entfernen-button");
        let button_icon = document.createElement("i");
        button_icon.setAttribute("class" , "fas fa-trash");
        delete_button.insertAdjacentElement("afterbegin", button_icon);

        //Spans mit Listenpunkt verknüpfen
        listenpunkt.insertAdjacentElement("afterbegin" , delete_button);
        listenpunkt.insertAdjacentElement("afterbegin" , span_betrag);
        listenpunkt.insertAdjacentElement("afterbegin" , span_titel);
        listenpunkt.insertAdjacentElement("afterbegin" , span_datum);
            
        //Lösch Button funkionalität
        this.eintrag_entfernen_event(listenpunkt);
        //Liste ausgeben
        return listenpunkt;
        
    },

    //HTML Einträge Anzeigen
    eintraege_anzeigen () {
        document.querySelectorAll(".monatsliste  ul").forEach(ul => ul.remove());
        let neue_ul = document.createElement("ul");
            this.eintraege.forEach(eintrag => {
                neue_ul.insertAdjacentElement("beforeend", this.html_eintrag_generieren(eintrag))
            });
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin",neue_ul)
    },

    // Listener Event und ID übergabe für Löschbutton
    eintrag_entfernen_event(listenpunkt){
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", () => {this.eintrag_entfernen(listenpunkt)})
    },

    //nach ID Iterrieren und einträge löschen
    eintrag_entfernen(listenpunkt){
        let timestamp = parseInt(listenpunkt.getAttribute("data-timestamp"));
        for (let index = 0; index < this.eintraege.length; index++) {
            if (this.eintraege[index].get("timestamp") === timestamp) {
                this.eintraege.splice(index, 1);
                this.eintraege_anzeigen();        
                this.gesamt_bilanz_erstellen();
                this.gesamtbilanz_anzeigen(); 
                console.log(this.eintraege);
            };
            break;
        }
    },


    //Bilanz Verrechnen
    gesamt_bilanz_erstellen(){

        let neue_gesamtbilanz = new Map();
            neue_gesamtbilanz.set("einnahmen", 0);
            neue_gesamtbilanz.set("ausgaben", 0);
            neue_gesamtbilanz.set("bilanz", 0);

        this.eintraege.forEach( w => {
            switch (w.get("typ")) {
                case "einnahme":
                    neue_gesamtbilanz.set("einnahmen", neue_gesamtbilanz.get("einnahmen") + w.get("betrag"));
                    neue_gesamtbilanz.set ("bilanz", neue_gesamtbilanz.get("bilanz") + w.get("betrag"));
                    break;
                case "ausgabe":
                    neue_gesamtbilanz.set("ausgaben", neue_gesamtbilanz.get("ausgaben") + w.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") - w.get("betrag"));
                    break;
                default:
                    console.log(`"${w.get("typ")}" ist kein Typ, bitte auf schreibweise achten`);
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
    },
        

    //Bilanz ausgeben in console
    gesamt_Bilanz_ausgeben(){ if ( this.gesamtbilanz.get("bilanz") >= 0 ) {
        //bei positiver Bilanz, ausgeben
            console.log(
                `Einnahmen: ${(this.gesamtbilanz.get("einnahmen") / 100).toFixed(2)} €\n`
                +`Ausgaben: ${(this.gesamtbilanz.get("ausgaben") / 100).toFixed(2)} €\n`
                +`Bilanz: Positiv mit ${(this.gesamtbilanz.get("bilanz") / 100).toFixed(2)} €`);
        //bei negativer Bilanz, ausgeben
        } else {
            console.log(
                `Einnahmen: ${(this.gesamtbilanz.get("einnahmen") / 100).toFixed(2)} €\n`
                +`Ausgaben: ${(this.gesamtbilanz.get("ausgaben") / 100).toFixed(2)} €\n`
                +`Bilanz: Negativ mit ${(this.gesamtbilanz.get("bilanz") / 100).toFixed(2)} €`);
        }
    
    },

    //Alle Elemente erstellen inc Klassen
    html_gesamtbilanz_generieren(){
        let aside = document.createElement("aside");
        aside.id = "gesamtbilanz";

        let h1 = document.createElement("h1");
        h1.textContent = "Gesamtbilanz";
        aside.insertAdjacentElement("afterbegin", h1);
        //Einnahme Zeile erstellen
        let div_einnahme = document.createElement("div");
        div_einnahme.className = "gesamtbilanz-zeile einnahmen";
        let span_einnahme = document.createElement("span");
        span_einnahme.textContent = "Einnahme:";
        let span_betrag_einnahme = document.createElement("span");
        span_betrag_einnahme.textContent= ` ${(this.gesamtbilanz.get("einnahmen") / 100).toFixed(2).replace(/\./, ",")} €`;
        //Ausgabe Zeile erstellen
        let div_ausgabe = document.createElement("div");
        div_ausgabe.className = "gesamtbilanz-zeile ausgabe";
        let span_ausgabe = document.createElement("span");
        span_ausgabe.textContent = "Ausgaben:";
        let span_ausgabe_betrag = document.createElement("span");
        span_ausgabe_betrag.textContent= ` ${(this.gesamtbilanz.get("ausgaben") / 100).toFixed(2).replace(/\./, ",")} €`;
        //Bilanz Zeile erstellen
        let div_bilanz = document.createElement("div");
        div_bilanz.className= "gesamtbilanz-zeile bilanz";
        let span_bilanz = document.createElement("span");
        span_bilanz.textContent = "Bilanz:";
        let span_bilanz_betrag = document.createElement("span");
        span_bilanz_betrag.textContent= ` ${(this.gesamtbilanz.get("bilanz") / 100).toFixed(2).replace(/\./, ",")} €`;
        this.gesamtbilanz.get("bilanz") >= 0 ? span_bilanz_betrag.className = "positiv" : span_bilanz_betrag.className = "negativ";
        
        //Elemente zusammenfügen
            //Einnahmen Zeile
        div_einnahme.insertAdjacentElement("afterbegin", span_einnahme);
        div_einnahme.insertAdjacentElement("beforeend", span_betrag_einnahme)
        div_ausgabe.insertAdjacentElement("afterbegin", span_ausgabe);
            //Ausgaben Zeile
        div_ausgabe.insertAdjacentElement("beforeend", span_ausgabe_betrag)
        div_bilanz.insertAdjacentElement("afterbegin", span_bilanz);
        div_bilanz.insertAdjacentElement("beforeend", span_bilanz_betrag)
            //Bilanz Zeile
        aside.insertAdjacentElement("beforeend", div_einnahme);
        aside.insertAdjacentElement("beforeend", div_ausgabe);
        aside.insertAdjacentElement("beforeend", div_bilanz);

        return aside;

    },

    //Prüfen ob Gesamtbilanz bereits angezeigt wird
    gesamtbilanz_anzeigen(){
       let gesamt_bilanz_vorhanden = document.querySelectorAll("#gesamtbilanz");
       if (gesamt_bilanz_vorhanden.length > 0 ) {
           gesamt_bilanz_vorhanden.forEach (eintraege => {eintraege.remove();});
       }
       document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());
    },

    //Alle Funktionen ausführen
    eintrag_hinzufuegen(form_daten){ 
        let neuer_eintrag = new Map;
        neuer_eintrag.set("titel", form_daten.titel);
        neuer_eintrag.set("typ", form_daten.typ);
        neuer_eintrag.set("betrag", form_daten.betrag);
        neuer_eintrag.set("datum", form_daten.datum);
        neuer_eintrag.set("timestamp", Date.now());
        this.eintraege.push(neuer_eintrag);

        this.eintraege_sortieren()
        this.eintraege_anzeigen()        
        this.gesamt_bilanz_erstellen()
        this.gesamtbilanz_anzeigen() 
        this.gesamt_Bilanz_ausgeben()
    }
            
};
