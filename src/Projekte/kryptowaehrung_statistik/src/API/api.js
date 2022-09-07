"use strict";

import { Dates } from "../js/classes/date.js";

export const api_call = async function (crypto = "BTC", currency = "EUR", time_start = date_start, time_end = date_end) {
  const url = `https://rest.coinapi.io/v1/exchangerate/${crypto}/${currency}/history?period_id=10DAY&time_start=${time_start}&time_end=${time_end}`;

  const data = await $.ajax({
    url: url,
    headers: { "X-CoinAPI-Key": "22CF76C4-BC8A-4F81-BEA8-72C470B9D52F" },
    method: "GET",

    success: (res, _, xhr) => console.log("Status: " + xhr.status),

    error: (error) => {
      console.error("API request failed:", error);
    },
  });
  return data;
};

// `https://rest.coinapi.io/v1/exchangerate/${crypto}/${currency}/history?period_id=10DAY&time_start=${time_start}&time_end=${time_end}`;
// `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=10DAY&time_start=20-07-31T22:00:00.000Z&time_end=2016-03-01T00:00:00`
