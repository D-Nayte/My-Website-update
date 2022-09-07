import { liqui_planner as haushaltsbuch } from "../liqui-planner.js";

export class Eintrag {
  constructor(titel, typ, datum, betrag) {
    this._titel = titel;
    this._typ = typ;
    this._datum = datum;
    this._betrag = betrag;
    this._timestamp = Date.now();
    this._html = this._html_generieren();
  }

  html() {
    return this._html;
  }

  titel() {
    return this._titel;
  }

  betrag() {
    return this._betrag;
  }

  datum() {
    return this._datum;
  }

  typ() {
    return this._typ;
  }

  timestamp() {
    return this._timestamp;
  }

  _html_generieren() {
    //Liste generieren mit passenden classen für einnahme und ausgabe
    let listenpunkt = document.createElement("li");
    this._typ == "einnahme" ? listenpunkt.setAttribute("class", "einnahme") : listenpunkt.setAttribute("class", "ausgabe");
    listenpunkt.setAttribute("data-timestamp", this._timestamp);

    //datum erzeugen
    let span_datum = document.createElement("span");
    span_datum.setAttribute("class", "datum");
    span_datum.textContent = this._datum.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    //Titel erzeugen
    let span_titel = document.createElement("span");
    span_titel.setAttribute("class", "titel");
    span_titel.textContent = this._titel;

    //Betrag erzeugen
    let span_betrag = document.createElement("span");
    span_betrag.setAttribute("class", "betrag");
    span_betrag.textContent = `${(this._betrag / 100).toFixed(2).replace(/\./, ",")} €`;

    //Button erzuegen
    let delete_button = document.createElement("button");
    delete_button.setAttribute("class", "entfernen-button");
    let button_icon = document.createElement("i");
    button_icon.setAttribute("class", "fas fa-trash");
    delete_button.insertAdjacentElement("afterbegin", button_icon);

    //Spans mit Listenpunkt verknüpfen
    listenpunkt.insertAdjacentElement("afterbegin", delete_button);
    listenpunkt.insertAdjacentElement("afterbegin", span_betrag);
    listenpunkt.insertAdjacentElement("afterbegin", span_titel);
    listenpunkt.insertAdjacentElement("afterbegin", span_datum);

    //Lösch Button funkionalität
    this._eintrag_entfernen_event(listenpunkt);
    return listenpunkt;
  }

  _eintrag_entfernen_event(listenpunkt) {
    listenpunkt.querySelector(".entfernen-button").addEventListener("click", () => {
      haushaltsbuch.eintrag_entfernen(listenpunkt);
    });
  }
}
