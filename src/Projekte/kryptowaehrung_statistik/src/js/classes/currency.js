"use strict";

import { graph } from "../main.js";

export class Currency {
  constructor() {
    this.currency = "EUR";
  }
  get_currency() {
    return this.currency;
  }

  currency_event() {
    let currency_nodes = document.querySelectorAll(".currency");
    currency_nodes.forEach((element) => {
      element.addEventListener("click", (event) => {
        currency_nodes.forEach((element) => {
          element.classList.remove("active");
        });
        event.target.classList.add("active");
        this.currency = event.target.value;
        graph.rewrite_graph();
      });
    });
  }
}
