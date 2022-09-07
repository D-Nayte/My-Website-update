"use strict";

export class Balance {
  constructor(crypto_value, crypto_name, data_raw) {
    this._crypto_value = crypto_value;
    this._crypto_name = crypto_name;
    this._data = data_raw;
    this._ini = this._create_balance();
  }

  _create_balance() {
    let balance_value = this.get_balance_value();
    this._create_html(balance_value);
  }

  get_balance_value() {
    let balance_start = this._data[0].rate_close;
    let balance_end = this._data[this._data.length - 1].rate_close;

    let balance = balance_end / balance_start;

    if (balance_start > balance_end) {
      balance = `<span style="color: red">-${parseFloat(balance).toFixed(2)}</span>`;
    } else {
      balance = `<span style="color: green">+${parseFloat(balance).toFixed(2)}</span>`;
    }
    return balance;
  }

  _create_html(value) {
    if (!this._check_douple_entries()) {
      let parent_node = document.querySelector("#balance");
      let html = `<h1 name=${this._crypto_value} >${this._crypto_name}/${this._crypto_value}: ${value}</h1>`;
      parent_node.insertAdjacentHTML("afterbegin", html);
    }
  }

  _check_douple_entries() {
    let html_nodes = document.querySelectorAll("#balance h1");
    let boolean = false;
    for (let entry of html_nodes) {
      if (entry.getAttribute("name") === this._crypto_value) {
        boolean = true;
      }
    }
    return boolean;
  }

  reset_balance() {
    let query_selector_all = document.querySelectorAll(`#balance h1`);

    query_selector_all?.forEach((element) => {
      element.parentNode.removeChild(element);
      
    });
  }
}
