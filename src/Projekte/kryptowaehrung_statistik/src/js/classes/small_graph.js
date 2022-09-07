"use strict";

export class Small_graph {
  constructor(crypto_value, crypto_name, data_api_raw) {
    this._data = data_api_raw;
    this._crypto_value = crypto_value;
    this._crypto_name = crypto_name;
    this._config = {};
    this._graph_list = [];
    this._init = this._create_small_graph();
  }

  _create_small_graph() {
    if (!this._check_douple_entries()) {
      this._create_html_elements();
      this._create_config(this._data);
      let html_selector = document.querySelector(`div[name=${this._crypto_value}] .graph_small`);
      this._graph_list.push(new Chart(html_selector, this._config));
    }
  }

  font_style() {
    Chart.defaults.font.family = "Roboto-Bold";
    Chart.defaults.font.size = "11";
  }

  _create_config() {
    this.font_style();
    const labels = this._read_month(this._data);

    const data = {
      labels: labels,
      datasets: this._create_dataset(this._data),
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context) {
                
                let value = context.raw;
                value = parseFloat(value).toFixed(2);
                return "      " + context.dataset.label + ":" + " " + value;
              },
            },
          },

          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: `${this._crypto_name}`,
          },
          labels: {
            font: {
              family: "Roboto-Medium",
            },
          },
        },
      },
    };
    this._config = config;
  }

  //  Neute Datensetz erstellen
  _create_dataset(data_raw) {
    const dataset_open = {
      label: "eröffnet",
      data: data_raw.map((entry) => {
        return entry.rate_open;
      }),
      backgroundColor: "green",
    };

    const dataset_closed = {
      label: "geschlossen",
      data: data_raw.map((entry) => {
        return entry.rate_close;
      }),
      backgroundColor: "blue",
    };

    const dataset_highest = {
      label: "höchste",
      data: data_raw.map((entry) => {
        return entry.rate_high;
      }),
      backgroundColor: "orange",
    };

    const dataset_lowest = {
      label: "niedrigste",
      data: data_raw.map((entry) => {
        return entry.rate_low;
      }),
      backgroundColor: "red",
    };

    return [dataset_open, dataset_closed, dataset_highest, dataset_lowest];
  }

  //   HTML-Elemente erstellen
  _create_html_elements() {
    let html = `<div name=${this._crypto_value} class="graph_small_container">
      <canvas class="graph_small"></canvas>
    </div>`;
    document.querySelector("#small_graph").insertAdjacentHTML("afterbegin", html);
  }

  _check_douple_entries() {
    let html_nodes = document.querySelectorAll(".graph_small_container");
    let boolean = false;
    for (let entry of html_nodes) {
      if (entry.getAttribute("name") === this._crypto_value) {
        boolean = true;
      }
    }

    return boolean;
  }

  //   Monats Label erstellen
  _read_month(data) {
    let month = [];
    data.forEach((entry) => {
      month.push(new Date(entry.time_open).toLocaleString("de-DE", { month: "long", day: "numeric", year: "numeric" }));
    });
    return month;
  }

  reset_chart() {
    let query_selector_all = document.querySelectorAll(`#small_graph div[name]`);

    query_selector_all.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }
}

const labels = ["Janur", "Febru"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "eröffnet",
      data: [3, -4],
      backgroundColor: "blue",
    },
    {
      label: "geschlossen",
      data: [1, -2],
      backgroundColor: "red",
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Bitcoin",
      },
      labels: {
        font: {
          family: "Roboto-Medium",
        },
      },
    },
  },

  _html_generieren() {
    let html = `<div name=${this._crypto_value} class="graph_small_container">
      <canvas class="graph_small"></canvas>
    </div>`;
    this.dapslodmsopkadmopksladsamwk();

    return html;
  },
};
