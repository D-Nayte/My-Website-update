import { Gesamtbilanz } from "../exports.js";
import { Monatslistensammlung } from "../exports.js";
import { Navigationsleiste } from "../exports.js";
import { Eingabeformular } from "../exports.js";
import { Eintrag } from "../exports.js";

export class Haushaltsbuch {
  constructor() {
    this._eintraege = [];
    this._gesamtbilanz = new Gesamtbilanz();
    this._monatslistensammlung = new Monatslistensammlung();
    this._navigationsleiste = new Navigationsleiste();
    this._eingabeformular = new Eingabeformular();
  }

  //nach ID Iterrieren und einträge löschen
  eintrag_entfernen(listenpunkt) {
    let timestamp = parseInt(listenpunkt.getAttribute("data-timestamp"));
    for (let index = 0; index < this._eintraege.length; index++) {
      if (this._eintraege[index].timestamp() === timestamp) {
        this._eintraege.splice(index, 1);
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        break;
      }
    }
    this._speichern();
  }

  //Alle Funktionen ausführen
  eintrag_hinzufuegen(form_daten) {
    let neuer_eintrag = new Eintrag(form_daten.titel, form_daten.typ, form_daten.datum, form_daten.betrag);
    this._eintraege.push(neuer_eintrag);
    this._speichern();
    this._monatslistensammlung.aktualisieren(this._eintraege);
    this._gesamtbilanz.aktualisieren(this._eintraege);
  }

  start() {
    // this._wiederherstellen();
    this._navigationsleiste.anzeigen();
    this._eingabeformular.anzeigen();
    this._monatslistensammlung.anzeigen();
    this._gesamtbilanz.anzeigen();
  }

  _speichern() {
    let json_clone = JSON.stringify(this._eintraege);
    localStorage.setItem("eintraege", json_clone);
  }

  // _wiederherstellen() {
  //     let eintraege_wiederherstellen = JSON.parse((localStorage.getItem("eintraege")));
  //     eintraege_wiederherstellen.forEach(eintrag => {
  //         let neuer_eintrag = new Eintrag(
  //             eintrag._titel,
  //             eintrag._typ,
  //             new Date(eintrag._datum),
  //             eintrag._betrag,
  //         );
  //         this._eintraege.push(neuer_eintrag);
  //     });
  //     this._monatslistensammlung.aktualisieren(this._eintraege);
  //     this._gesamtbilanz.aktualisieren(this._eintraege);
  // }
}
