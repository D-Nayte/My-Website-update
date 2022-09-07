"use strict";

let btn = document.querySelector(".btn");
let bean_img = document.querySelector("#beanboozled");
let bean_p = document.querySelector("#beanName");
let bean_flopp = document.querySelector(".flopp");
let bean_hot = document.querySelector(".hot");
let icon = document.querySelector(".drei");
let scaler = 0;
let bean_pictures = [
  "Faules-Ei+Butter-Popcorn.png",
  "Hundefutter+Schokoladenpuding.png",
  "Nasenpopel+Saftige-Birne.png",
  "Pfirsich+Erbrochenes.png",
  "Schmutziges-Spuelwasser+Geburtstagskuchen.png",
  "Stinktier+Lakritze.png",
  "Stinkwanze+Geröstete-Marshmallow.png",
  "Toter-Fisch+Erdbeer-Bananae-Smoothie.png",
  "Tutti-Frutti+Stinke-Socke.png",
  "Verdorbene+Milch-Kokusnuss.png",
];

let bean_name_flopp = [
  "Faules Ei",
  "Hundefutter",
  "Nasenpopel",
  "Erbrochenes ",
  "Schmutziges Spuelwasser",
  "Stinktier",
  "Stinkwanze",
  "Toter Fisch",
  "Stinke-Socke",
  "Verdorbene Milch",
];

let bean_name_hot = [
  "Butter-Popcorn",
  "Schokoladenpudding",
  "Saftige-Birne",
  "Pfirsich ",
  "Geburtstagskuchen",
  "Lakritze",
  "Gerösteter-Marshmallow",
  "Erdbeer-Bananae-Smoothie",
  "Tutti-Frutti",
  "Kokusnuss",
];

const zufallszahl = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function bilder_durchlauf(zähler) {
  btn.style.pointerEvents = "none";
  let index = 0;
  let ende = 0;
  let timer = zähler;
  let intervall = setInterval(ändern, timer);
  function ändern() {
    if (timer < 265) {
      if (index <= bean_pictures.length - 1 && ende <= bean_pictures.length * 3) {
        bean_flopp.textContent = `${bean_name_flopp[index]} `;
        bean_hot.textContent = `${bean_name_flopp[index]} `;
        bean_hot.style.transform = `scale(${0.5 + (0.5 / 49) * scaler})`;
        bean_flopp.style.transform = `scale(${0.5 + (0.5 / 49) * scaler})`;
        bean_img.src = `./src/pictures/${bean_pictures[index]}`;
        index++;
        ende++;
        scaler++;
      } else {
        index = 0;
        ende = 0;
        timer = timer * 1.5;
        clearInterval(intervall);
        bilder_durchlauf(timer);
      }
    } else {
      let auswählen = zufallszahl(0, bean_pictures.length - 1);
      bean_img.src = `./src/pictures/${bean_pictures[auswählen]}`;
      bean_flopp.textContent = `${bean_name_flopp[auswählen]} `;
      bean_flopp.style.opacity = "1";
      bean_hot.textContent = ` ${bean_name_hot[auswählen]}`;
      bean_hot.style.opacity = "1";
      icon.style.opacity = "1";
      setTimeout(() => {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "visible";
      }, 1000);
      clearInterval(intervall);
    }
  }
}

btn.addEventListener("click", () => {
  bean_flopp.style.opacity = "0.6";
  bean_hot.style.opacity = "0.6";
  btn.style.pointerEvents = "none";
  icon.style.opacity = "0";
  bean_hot.style.transform = `scale(${0.5})`;
  bean_flopp.style.transform = `scale(${0.5})`;
  scaler = 0;
  btn.style.transition = " opacity 1ms";
  btn.style.opacity = "0";
  btn.style.transition = "opacity 2s";
  setTimeout(() => {
    bilder_durchlauf(50);
  }, 750);
});

bilder_durchlauf(50);
