"use strict";

export class Dates {
  constructor() {
    this.date_start = "";
    this.date_end = "";
    this._load = this._on_load();
  }

  _on_load() {
    // Datumsformat für HTML value einstellen zum start der Anwendung, Templatestring, JJJJ-MM
    let date_end = `${new Date(Date.now()).toLocaleDateString("en-US", { year: "numeric" })}-${new Date(Date.now()).toLocaleDateString("en-US", {
      month: "2-digit",
    })}`;
    let date_start = `${new Date(Date.now() - 86400000 * 62).toLocaleDateString("en-US", { year: "numeric" })}-${new Date(
      Date.now() - 86400000 * 62
    ).toLocaleDateString("en-US", {
      month: "2-digit",
    })}`;

    $("#date_start").val(date_start);
    $("#date_end").val(date_end);

    this.date_start = date_start;
    this.date_end = date_end;
  }

  date_event() {
    document.querySelectorAll(".date_input").forEach((element) => {
      element.addEventListener("change", (event) => {
        if (event.target.id === "date_start") {
          this.date_start = event.target.value;
        } else {
          this.date_end = event.target.value;
        }
      });
    });
  }

  get_date() {
    const dates = {
      date_start: new Date(this.date_start).toISOString(),
      date_end: new Date(this.date_end).toISOString(),
    };
    return dates;
  }
}
