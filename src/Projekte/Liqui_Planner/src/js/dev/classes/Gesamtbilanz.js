"use strict";

export class Gesamtbilanz {
  constructor() {
    this._einnahmen = 0;
    this._ausgaben = 0;
    this._bilanz = 0;
    this._html = this._html_generieren();
  }

  aktualisieren(eintraege) {
    this._einnahmen = 0;
    this._ausgaben = 0;
    this._bilanz = 0;
    eintraege.forEach((eintraege) => {
      console.log(eintraege);

      switch (eintraege._typ) {
        case "einnahme":
          this._einnahmen = this._einnahmen += eintraege.betrag();
          this._bilanz = this._bilanz += eintraege.betrag();
          break;
        case "ausgabe":
          this._ausgaben = this._ausgaben += eintraege.betrag();
          this._bilanz = this._bilanz -= eintraege.betrag();
          break;
        default:
          break;
      }
    });
    this._html = this._html_generieren();
    this.anzeigen();
  }

  _html_generieren() {
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
    span_betrag_einnahme.textContent = ` ${(this._einnahmen / 100).toFixed(2).replace(/\./, ",")} €`;
    //Ausgabe Zeile erstellen
    let div_ausgabe = document.createElement("div");
    div_ausgabe.className = "gesamtbilanz-zeile ausgabe";
    let span_ausgabe = document.createElement("span");
    span_ausgabe.textContent = "Ausgaben:";
    let span_ausgabe_betrag = document.createElement("span");
    span_ausgabe_betrag.textContent = ` ${(this._ausgaben / 100).toFixed(2).replace(/\./, ",")} €`;
    //Bilanz Zeile erstellen
    let div_bilanz = document.createElement("div");
    div_bilanz.className = "gesamtbilanz-zeile bilanz";
    let span_bilanz = document.createElement("span");
    span_bilanz.textContent = "Bilanz:";
    let span_bilanz_betrag = document.createElement("span");
    span_bilanz_betrag.textContent = ` ${(this._bilanz / 100).toFixed(2).replace(/\./, ",")} €`;
    this._bilanz >= 0 ? (span_bilanz_betrag.className = "positiv") : (span_bilanz_betrag.className = "negativ");

    //Einnahmen Zeile
    div_einnahme.insertAdjacentElement("afterbegin", span_einnahme);
    div_einnahme.insertAdjacentElement("beforeend", span_betrag_einnahme);
    div_ausgabe.insertAdjacentElement("afterbegin", span_ausgabe);
    //Ausgaben Zeile
    div_ausgabe.insertAdjacentElement("beforeend", span_ausgabe_betrag);
    div_bilanz.insertAdjacentElement("afterbegin", span_bilanz);
    div_bilanz.insertAdjacentElement("beforeend", span_bilanz_betrag);
    //Bilanz Zeile
    aside.insertAdjacentElement("beforeend", div_einnahme);
    aside.insertAdjacentElement("beforeend", div_ausgabe);
    aside.insertAdjacentElement("beforeend", div_bilanz);

    return aside;
  }

  //Prüfen ob Gesamtbilanz bereits angezeigt wird
  anzeigen() {
    this._entfernen();
    document.querySelector("body").insertAdjacentElement("beforeend", this._html);
  }

  _entfernen() {
    let gesamt_bilanz_vorhanden = document.querySelectorAll("#gesamtbilanz");
    if (gesamt_bilanz_vorhanden.length > 0) {
      gesamt_bilanz_vorhanden.forEach((eintraege) => {
        eintraege.remove();
      });
    }
  }
}
