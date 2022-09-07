"use strict";

function subcount() {
  let aktueller_stand = counter.aktueller_stand;
  let ziel = counter.ziel;
  let fortschrittleiste_voll = 100;
  let fortschrittleiste_indikator = fortschrittleiste_voll / ziel;
  let fortschrittleiste_fortschritt = fortschrittleiste_indikator * aktueller_stand;
  let fortschrittleiste = document.querySelector(".inline");
  let counter_html = document.querySelector(".text_nummer");
  let formular = document.querySelector("form");
  let add_subs = document.querySelector("#add_sub");

  if (aktueller_stand < 1) {
    fortschrittleiste.style.background = `linear-gradient(90deg, rgb(51, 248, 133) 0%, rgb(77, 77, 77) 0%)`;
  } else {
    fortschrittleiste.style.background = `linear-gradient(95deg, rgba(51,248,133,1) 0%, rgba(51,248,133,1) ${fortschrittleiste_fortschritt}%, rgba(77,77,77,1) ${
      fortschrittleiste_fortschritt + 10
    }%)`;
  }
  counter_html.innerHTML = `${aktueller_stand}/${ziel} `;
  formular.addEventListener("submit", (f) => {
    f.preventDefault();
    f.stopPropagation();
    let current_subs = document.querySelector("#current_subs");
    if (current_subs.value == "" || current_subs.value == "" || add_subs.value === "") {
      alert(`Bitte "Sub Goal", "currents Subs" und "add Subs(s)" ausfüllen `);
      return;
    } else {
      test_overlay();
    }
  });
}

function animation() {
  let startwert = 20;
  let rahmen = document.querySelector(".rahmen");
  rahmen.style.background = `linear-gradient(${startwert}deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 100%)`;

  let mein_intervall = setInterval(() => {
    startwert += 5;
    rahmen.style.background = `linear-gradient(${startwert}deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 100%)`;

    if (startwert >= 175) {
      clearInterval(mein_intervall);
      mein_intervall = setInterval(() => {
        startwert += 0.2;
        rahmen.style.background = `linear-gradient(${startwert}deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 100%)`;
        if (startwert >= 200) {
          clearInterval(mein_intervall);
        }
      }, 20);
    }
  }, 25);
}

function test_overlay() {
  let goal_input = document.querySelector("#ziel");
  let current_subs = document.querySelector("#current_subs");
  let aktueller_stand = parseFloat(current_subs.value);
  let ziel = parseFloat(goal_input.value);
  let fortschrittleiste_voll = 100;
  let fortschrittleiste_indikator = fortschrittleiste_voll / ziel;
  let fortschrittleiste_fortschritt = fortschrittleiste_indikator * aktueller_stand;
  let fortschrittleiste = document.querySelector(".inline");
  let counter_html = document.querySelector(".text_nummer");
  let add_subs = parseFloat(document.querySelector("#add_sub").value);
  let fortschrittleiste_add = fortschrittleiste_indikator * (aktueller_stand + add_subs);
  let neuer_stand = 0;
  let anim_leiste = 0;
  let zähler = 0;
  let reset_btn = document.querySelector("#reset_btn");
  animation();

  if (aktueller_stand <= 0 || ziel <= 0 || add_subs <= 0) {
    alert("Keine negativen Zahlen zulässig");
  } else {
    if (aktueller_stand >= ziel) {
      alert(`Achtung, "current Subs" übersteigt "Sub Goal"`);
      reset_btn.click();
    } else {
      if (aktueller_stand < 1) {
        fortschrittleiste.style.background = `linear-gradient(95deg, rgba(51,248,133,0) 0%, rgba(51,248,133,0) 0%, rgba(77,77,77,1) 0%)`;
      } else {
        fortschrittleiste.style.background = `linear-gradient(95deg, rgb(51, 248, 133) ${fortschrittleiste_fortschritt}%, rgb(77, 77, 77) ${
          fortschrittleiste_fortschritt + 10
        }%)`;
        setTimeout(() => {
          neue_runde();
          function neue_runde() {
            counter_html.innerHTML = `${aktueller_stand + neuer_stand}/${ziel} `;
            if (fortschrittleiste_fortschritt < fortschrittleiste_add - 1) {
              if (anim_leiste <= fortschrittleiste_fortschritt) {
                let erstes_intervall = setInterval(() => {
                  fortschrittleiste.style.background = `linear-gradient(95deg, rgba(51,248,133,1) 0%, rgba(144,255,190,1) ${
                    anim_leiste - 5
                  }%, rgba(51,248,133,1) ${fortschrittleiste_fortschritt}%, rgba(77,77,77,1) ${fortschrittleiste_fortschritt + 10}%)`;
                  anim_leiste += fortschrittleiste_fortschritt / 80;
                  if (anim_leiste >= fortschrittleiste_fortschritt) {
                    clearInterval(erstes_intervall);
                    neue_runde();
                  }
                }, 7);
              } else if (anim_leiste >= fortschrittleiste_fortschritt) {
                let neues_intervall = setInterval(() => {
                  if (zähler < 99) {
                    fortschrittleiste_fortschritt = fortschrittleiste_fortschritt + (fortschrittleiste_indikator * 1) / 100;
                    fortschrittleiste.style.background = `linear-gradient(95deg, rgba(51,248,133,1) 0%, rgba(51,248,133,1) ${fortschrittleiste_fortschritt}%, rgba(77,77,77,1) ${
                      fortschrittleiste_fortschritt + 10
                    }%)`;
                    zähler = zähler + 1;
                  } else {
                    fortschrittleiste.style.background = `linear-gradient(95deg, rgba(51,248,133,1) 0%, rgba(51,248,133,1) ${fortschrittleiste_fortschritt}%, rgba(77,77,77,1) ${
                      fortschrittleiste_fortschritt + 10
                    }%)`;
                    anim_leiste = 0;
                    zähler = 0;
                    clearInterval(neues_intervall);
                    neuer_stand += 1;
                    neue_runde();
                  }
                }, 5);
              }
            } else {
              fortschrittleiste.style.background = `linear-gradient(95deg, rgba(51,248,133,1) 0%, rgba(51,248,133,1) ${fortschrittleiste_fortschritt}%, rgba(77,77,77,1) ${
                fortschrittleiste_fortschritt + 10
              }%)`;
              counter_html.innerHTML = `${aktueller_stand + add_subs}/${ziel} `;
              reset_btn.click();
            }
          }
        }, 2000);
      }
      counter_html.innerHTML = `${aktueller_stand + neuer_stand}/${ziel} `;
    }
  }
}

subcount();
animation();
