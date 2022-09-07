"use strict";

import { Currency } from "./currency.js";
import { Dates } from "./date.js";
import { Crypto } from "./crypto.js";
import { api_call } from "../../API/api.js";
import { Small_graph } from "./small_graph.js";
import { Balance } from "./balance.js";

let test_api = new Promise(function (resolve, reject) {
  let data_api_test = [
    {
      rate_close: 37797.05112364265,
      rate_high: 39120.14069332009,
      rate_low: 33777.09437898176,
      rate_open: 35560.28686262726,
      time_close: "2022-03-18T23:59:00.0000000Z",
      time_open: "2022-03-09T00:00:00.0000000Z",
      time_period_end: "2022-03-19T00:00:00.0000000Z",
      time_period_start: "2022-03-09T00:00:00.0000000Z",
    },
    {
      rate_close: 42872.63372453261,
      rate_high: 44043.14510015452,
      rate_low: 36576.84107274537,
      rate_open: 37783.16899834396,
      time_close: "2022-03-28T23:59:00.0000000Z",
      time_open: "2022-03-19T00:00:00.0000000Z",
      time_period_end: "2022-03-29T00:00:00.0000000Z",
      time_period_start: "2022-03-19T00:00:00.0000000Z",
    },
    {
      rate_close: 39991.736887613166,
      rate_high: 44264.416606774415,
      rate_low: 38266.640453197724,
      rate_open: 42860.39042841462,
      time_close: "2022-04-07T23:59:00.0000000Z",
      time_open: "2022-03-29T00:00:00.0000000Z",
      time_period_end: "2022-04-08T00:00:00.0000000Z",
      time_period_start: "2022-03-29T00:00:00.0000000Z",
    },
    {
      rate_close: 36741.715012289074,
      rate_high: 40848.26900972042,
      rate_low: 35947.66170680723,
      rate_open: 39970.54793326254,
      time_close: "2022-04-17T23:59:00.0000000Z",
      time_open: "2022-04-08T00:00:00.0000000Z",
      time_period_end: "2022-04-18T00:00:00.0000000Z",
      time_period_start: "2022-04-08T00:00:00.0000000Z",
    },
  ];
  setTimeout(() => {
    resolve(data_api_test);
  }, 1000);
});

export class Graph {
  constructor() {
    this.ctx = $("#graph").get(0);
    this.crypto = new Crypto();
    this.currency = new Currency();
    this.dates = new Dates();
    this.config;
    this.my_chart = null;
    this.datasets = [];
    this._small_chart = null;
    this._balance = null;
  }

  write_graph(data_api, set_currency = "EUR", currency) {
    //Diagramm Configuration----------------------------------------
    let dataset = {
      labels: this.read_month(data_api),
      //   Eigentliche Daten zum darstellen; für 2. graph,  neues "datasets" hinzufügen
      datasets: this.datasets,
    };

    let config = {
      type: "line",
      data: dataset,
      options: {
        //Knoten animation/style
        hitRadius: 40,
        hoverRadius: 10,
        radius: 3,
        responsive: true,
        // Y Achse Beschriftung
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return value + ` ${set_currency}`;
              },
            },
          },
        },
        // Animationen
        animations: {
          y: {
            easing: "easeInOutElastic",
            from: (ctx) => {
              if (ctx.type === "data") {
                if (ctx.mode === "default" && !ctx.dropped) {
                  ctx.dropped = true;
                  return 0;
                }
              }
            },
          },
        },
        plugins: {
          // tooltip label einstellungen
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context) {
                
                let value = context.raw;
                value = parseFloat(value).toFixed(2);
                return "      " + context.dataset.label + ":" + " " + value + "-" + set_currency;
              },
            },
          },

          legend: {
            title: {
              display: true,
              text: "*Legenden durch anklicken abwählbar",
            },
            labels: {
              font: {
                family: "Roboto-Medium",
              },
            },
          },
        },
      },
    };
    this.config = config;
  }

  font_style() {
    Chart.defaults.font.family = "Roboto-Bold";
    Chart.defaults.font.size = "15";
  }

  update_graph() {
    const { crypto, currency, date_start, date_end } = this.get_all_currencys();

    crypto.forEach((entry) => {
      const { crypto_value, crypto_name } = entry;
      this.call_api(crypto_value, currency, date_start, date_end)
        .then((data_api) => {
          const dataset = {
            label: crypto_name,
            data: this.read_data(data_api),
            borderColor: this.get_color(crypto_value),
            tension: 0.3,
            backgroundColor: this.get_color(crypto_value),
          };
          this._small_chart = new Small_graph(crypto_value, crypto_name, data_api);
          this._balance = new Balance(crypto_value, crypto_name, data_api);
          return dataset;
        })
        .then((single_dataset) => {
          let search_existend_set = this.datasets.find((object) => object.label === single_dataset.label);

          if (search_existend_set) {
            return;
          } else {
            this.datasets.push(single_dataset);
            this.my_chart.update();
          }
        });
    });
  }

  async call_api(crypto, currency, date_start, date_end) {
    let data_api = await api_call(crypto, currency, date_start, date_end);
    return data_api;
  }

  rewrite_graph() {
    const { crypto, currency, date_start, date_end } = this.get_all_currencys();
    let new_dataset = [];
    this._small_chart?.reset_chart();
    this._balance?.reset_balance();
    let data_api_raw;
    crypto.forEach((entry) => {
      const { crypto_value, crypto_name } = entry;
      this.call_api(crypto_value, currency, date_start, date_end)

        .then((data_api) => {
          const dataset = {
            label: crypto_name,
            data: this.read_data(data_api),
            borderColor: this.get_color(crypto_value),
            backgroundColor: this.get_color(crypto_value),
            tension: 0.3,
          };
          data_api_raw = data_api;
          this._small_chart = new Small_graph(crypto_value, crypto_name, data_api);
          this._balance = new Balance(crypto_value, crypto_name, data_api);

          return dataset;
        })

        .then((single_dataset) => {
          new_dataset.push(single_dataset);
          this.datasets = new_dataset;
        })
        .then(() => {
          this.write_graph(data_api_raw, currency);
          if (this.my_chart !== null) {
            this.my_chart.destroy();
          }
          this.my_chart = new Chart(this.ctx, this.config);
        });
    });
  }

  remove(event_value) {
    this.datasets.forEach((element) => {
      if (element.label === event_value) {
        let index = this.datasets.indexOf(element);
        this.datasets.splice(index);
        this.rewrite_graph();
      }
    });
  }

  //   Monat und Jahr auslesen
  read_month(data) {
    let month = [];
    data.forEach((entry) => {
      month.push(new Date(entry.time_open).toLocaleString("de-DE", { month: "long", day: "numeric", year: "numeric" }));
    });
    return month;
  }

  //  Wert der Währung auslesen
  read_data(data) {
    let unit = [];
    data.forEach((entry) => {
      unit.push(entry.rate_open);
    });
    return unit;
  }

  start() {
    this.font_style();
    this.dates.date_event();
    this.currency.currency_event();
    this.crypto.crypto_event();
    this.date_event();
    this.rewrite_graph();
  }

  get_all_currencys() {
    const crypto = this.crypto.get_crypto();
    const currency = this.currency.get_currency();
    const { date_start, date_end } = this.dates.get_date();

    return { crypto, currency, date_start, date_end };
  }

  get_color(crypto) {
    let color;
    switch (crypto) {
      case "BTC":
        color = "red";
        break;
      case "ETH":
        color = "blue";
        break;

      case "BNB":
        color = "limegreen";
        break;

      case "USDT":
        color = "orange";
        break;

      case "SOL":
        color = "purple";
        break;

      default:
        break;
    }
    return color;
  }

  date_event() {
    document.querySelectorAll(".date_input").forEach((element) => {
      element.addEventListener("change", (event) => {
        this.rewrite_graph();
      });
    });
  }
}
