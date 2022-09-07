"use strikt";
//Haushaltsbuch

const haushaltsbuch = {

    eintraege: [],    
    gesamtbilanz: new Map(),
    fehler : [],

   
//neuen Eintrag erfassen funktion
    eintrag_erfassen(){
        let neuer_eintrag = new Map();
        neuer_eintrag.set("titel", prompt("Titel").trim());
        neuer_eintrag.set("typ", this.typ_verarbeiten(prompt("Einnahme oder Ausgabe?")));
        neuer_eintrag.set("betrag", this.betrag_verarbeiten(prompt("Bitte Betrag angeben (ohne €) ")));
        neuer_eintrag.set("datum",this.datum_verarbeiten(prompt("Bitte Datum angeben in jjjj.mm.tt")) );
        neuer_eintrag.set("timestamp", Date.now());
    // bei Fehlerhafter Benutzereingabe, eintrag stoppen, fehler Speichern und ausgeben    
        if (this.fehler.length === 0) {
            this.eintraege.push(neuer_eintrag);
        } else {
            console.log("Folgende Fehler wurden gefunden");
            this.fehler_ausgabe();
        }

    }, 
//Benutzereingaben verarbeiten        
typ_verarbeiten(typ) {
    let typ_neu;
    typ_neu = typ.toLowerCase().trim()
   if (this.typ_validieren(typ_neu)) {
        return typ_neu;
    } else {
        this.fehler.push(`Ungültiger Typ für Einnahme/Ausgabe: ${typ_neu}`);
    }
},

// Benutzereingabe validieren
typ_validieren (typ){
    let regex = /^(?:Einnahme|Ausgabe)$/gmi;
    if (typ.match(regex) !== null) {                                  
        return true;
    } else {
        return false;
    }
    
},


//Vermögen eingabe erfassen und verarbeiten
    betrag_verarbeiten(wert) {
        let wert_neu;
       if (this.betrag_validieren(wert)) {
            wert_neu = wert.replace(",", "." );                     // optimal wäre :     Math.round(parseFloat( wert.replace(",", "." ).trim()) * 100  )                   
            wert_neu = wert_neu.trim();
            wert_neu = (parseFloat(wert_neu) * 100);
            wert_neu = Math.round(wert_neu)
            return wert_neu;
        } else {
            this.fehler.push(`Ungültiger Betrag: ${wert_neu}`);
        }
    },

// Benutzereingabe validieren
    betrag_validieren (betrag){
        let regex = /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?()(,([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?)?/gm;
        if (betrag.match(regex) !== null) {                                   // match methode gibt "null" zurück wenn keine Überienstimmung
            return true;
        } else {
            return false;
        }
        
    },
//Datum verarbeiten
    datum_verarbeiten(wert) {
        let wert_neu = wert.trim();
       if (this.datum_validieren(wert_neu)) {
            return new Date(wert_neu);
        } else {
            this.fehler.push(`Ungültiges Datum: ${wert}`);
        }
    },

// Benutzereingabe validieren
    datum_validieren (betrag){
        let regex = /[0-9]+\.(0?[1-9]|[1][0-2])\.[0-9]+/gm;
        if (betrag.match(regex) !== null) {                                  
            return true;
        } else {
            return false;
        }
        
    },
// Fehler in Console schreiben
    fehler_ausgabe() {
        this.fehler.forEach(function (i) {
            console.log(i);
        }) 
    },

//eintraege Sortieren Methode  DATUM IST EIN STRING und in einem Objekt!!!
    eintraege_sortieren () {
        this.eintraege = this.eintraege.sort(function (a, b) {
            if ( a.get("datum") > b.get("datum")) {
                return -1;
            } else if ( a.get("datum") < b.get("datum")){
                return 1;
            } else {
                return 0;
            } 
        });

    },

        // //ALT! über console!neue Einträge in Console schreiben
        //     eintraeg_ausgeben(){
        //         console.clear();
                            
         //         this.eintraege.forEach( function (eintrag) {
         //             console.log(
         //                 `Titel: ${eintrag.get("titel")}\n`
         //                 +`Einnahme/Ausgabe:${eintrag.get("typ")}\n`
          //                 +`Betrag: ${(eintrag.get("betrag") / 100).toFixed(2)} €\n`
             //                 +`Datum: ${eintrag.get("datum").toLocaleDateString("de-DE", {                  
         //                                                                                 year: "numeric",
         //                                                                                 month: "long",
         //                                                                                 day: "numeric",
         //                                                                                 weekday: "long"
         //                 })}`
         //             );
         //         });
         //     },

//HTML Eintrag generieren
    html_eintrag_generieren(eintrag){

        //Liste generieren mit passenden classen für einnahme und ausgabe
        let listenpunkt = document.createElement("li");
        if (eintrag.get("typ") == "einnahme") {
            listenpunkt.setAttribute("class", "einnahme");
        } else {
            listenpunkt.setAttribute("class", "ausgabe");
        };
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

    html_gesamtbilanz_generieren(){
        //Alle Elemente erstellen inc Klassen
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
        if (this.gesamtbilanz.get("bilanz") >= 0) {
            span_bilanz_betrag.className = "positiv";
        }   else {
            span_bilanz_betrag.className = "negativ";
        };
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
    
    gesamtbilanz_anzeigen(){
       //Prüfen ob Gesamtbilanz bereits angezeigt wird
       let gesamt_bilanz_vorhanden = document.querySelectorAll("#gesamtbilanz");
       if (gesamt_bilanz_vorhanden.length > 0 ) {
           gesamt_bilanz_vorhanden.forEach (eintraege => {eintraege.remove();});
       }
       document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());
    },

//Alle Funktionen ausführen
   eintrag_hinzufügen(){
       let weiterer_eintrag = true;
        while (weiterer_eintrag) {
            this.eintrag_erfassen()
            if(this.fehler.length === 0) {
                this.eintraege_sortieren()
                this.eintraege_anzeigen()        //ALT  eintraeg_ausgeben()
                this.gesamt_bilanz_erstellen()
                this.gesamtbilanz_anzeigen() 
                this.gesamt_Bilanz_ausgeben()
            } else {
                this.fehler = [];
            }
            weiterer_eintrag = confirm("Weiteren Eintrag hinzufügen?");
            
        }
     }   

            
         
     
 




}
