"use strict";

const url = "https://catfact.ninja/fact";

// use AJAX
export const api_ajax = await $.ajax({
  url: url,
  // headers: {
  // "Content-type" : "application/json"  //daten die der server von uns erwarten kann
  // }
  // username: placeholder, // optional
  // passwort: placeholder, // optional
  method: "GET", //default!

  // data: JSON.stringify({
  //   object: "value",             // zum mitsenden für POST PUT etc; akzeptiert Objecte, string oder function !!ACTUNG! VS ändert manuelle json in Objecte!
  //   object2: "value",
  // })
  dataType: "json", //daten die wir zurück erwarten

  success: (res, status, xhr) => res,

  error: (error) => {
    console.error("Api error:" + error);
  },
});

// use JavaScript
export const api_js = await fetch(url, {
  // method:"POST",
  // header: {
  // "Content-type" : "application/json"  //daten die der server von uns erwarten kann
  // },
  // body: JSON.stringify({                 // daten zum mitsenden
  //   object: "value",
  //   object2: "value",
  // }),
})
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.error("API error:" + error));
