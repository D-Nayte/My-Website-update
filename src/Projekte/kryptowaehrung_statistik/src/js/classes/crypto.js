"use strict";

import { graph } from "../main.js";
import { Small_graph } from "./small_graph.js";

export class Crypto {
  constructor() {
    this.crypto = [{ crypto_value: "BTC", crypto_name: "Bitcoin" }];
    this.crypto_name = ["Bitcoin"];
  }

  get_crypto() {
    return this.crypto;
  }

  crypto_event() {
    let crypto_nodes = document.querySelectorAll(".crypto");

    crypto_nodes.forEach((element) => {
      element.addEventListener("click", (event) => {
        if (event.target.className.includes("active")) {
          event.target.classList.remove("active");
          this.update_crypto();
          this.delete_small_chart(event.target);
          this._delete_balance(event.target);
          graph.remove(event.target.textContent);
        } else {
          event.target.classList.add("active");
          this.update_crypto();
          graph.update_graph();
        }
      });
    });
  }

  update_crypto() {
    let crypto_new = [];
    const crypto_active_nodes = document.querySelectorAll("#crypto_container .active");
    crypto_active_nodes.forEach((element) => {
      crypto_new.push({ crypto_value: element.value, crypto_name: element.textContent });
    });
    this.crypto = crypto_new;
  }

  delete_small_chart(target) {
    let selector = target.value;
    let element = document.querySelector(`#small_graph div[name=${selector}]`);
    element.parentNode.removeChild(element);
  }

  _delete_balance(target) {
    let selector = target.value;
    let element = document.querySelector(`#balance h1[name=${selector}]`);

    element.parentNode.removeChild(element);
  }
}
