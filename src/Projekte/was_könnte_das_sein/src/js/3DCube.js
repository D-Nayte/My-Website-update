"use strict";

let auf = document.querySelector("#button_auf");
let rechts = document.querySelector("#button_stop");
let reload = false;
let prisma = document.querySelector("#cube");
let ball = document.querySelector(".ball");

function drehen() {
  let prisma_shadow = document.querySelector("#shadow");
  let rotieren = 0;
  let schweben = {
    richtung: "hoch",
    wert: 0,
    schatten: 120,
  };

  let cube_drehen = setInterval(() => {
    if (rotieren >= 360) {
      rotieren = 0;
    }

    prisma.style.transform = `rotateY(${rotieren}deg) rotatez(0deg)`;

    if (schweben.richtung === "hoch" && schweben.wert <= 10) {
      prisma.style.top = "410px";
      schweben.wert += 0.2;
      schweben.schatten += 0.3;
      prisma_shadow.style.width = `${schweben.schatten}px`;
      if (schweben.wert >= 10) {
        schweben.richtung = "runter";
      }
    }
    if (schweben.richtung === "runter" && schweben.wert >= -10) {
      prisma.style.top = "390px";
      schweben.wert -= 0.2;
      schweben.schatten -= 0.3;
      prisma_shadow.style.width = `${schweben.schatten}px`;
      if (schweben.wert <= -10) {
        schweben.richtung = "hoch";
      }
    }

    ball.style.transform = `rotateY(${-rotieren}deg) rotateX(0deg)`;
    rotieren = rotieren + 0.5;
    rechts.addEventListener("click", () => {
      prisma.style.top = "400px";
      prisma.style.transitionProperty = "all";
      prisma.style.transition = "500ms";
      clearInterval(cube_drehen);
    });
  }, 16);
}

auf.addEventListener("click", () => {
  if (reload) {
    location.reload();
    auf.textContent = "Drück mich!";
  } else {
    rechts.click();

    ball.style.boxShadow = `0 0 2rem .6rem #50BFE6`;
    setTimeout(() => {
      document.querySelectorAll(".links").forEach((part) => {
        öffnen_anim(part, 50, "z", 90);
      });

      document.querySelectorAll(".rechts").forEach((part) => {
        öffnen_anim(part, -50, "z", 90);
      });

      document.querySelectorAll(".vorne").forEach((part) => {
        öffnen_anim(part, 50, "x", 0);
      });

      document.querySelectorAll(".hinten").forEach((part) => {
        öffnen_anim(part, -50, "x", 0);
      });

      setTimeout(() => {
        show_screen();
      }, 1700);
    }, 1000);
    auf.textContent = "reload";
    reload = true;
  }
});

function öffnen_anim(elem, winkel, achse, y) {
  let zähler = 33;
  let mein_interval = setInterval(() => {
    if (winkel < 0) {
      if (-zähler <= winkel) {
        clearInterval(mein_interval);
      } else {
        elem.style.transform = `rotate${achse}(${-zähler}deg) rotateY(${y}deg) `;
        elem.style.transform = `rotate${achse}(${-zähler}deg) rotateY(${y}deg) translatey(6px)`;
        // elem.style.filter = `blur(${zähler * 0.05}px)`;
        zähler += 0.1;
      }
    }
    if (winkel > 0) {
      if (zähler >= winkel) {
        clearInterval(mein_interval);
      } else {
        elem.style.transform = `rotate${achse}(${zähler}deg) rotateY(${y}deg) `;
        elem.style.transform = `rotate${achse}(${zähler}deg) rotateY(${y}deg) translatey(6px)`;
        // elem.style.filter = `blur(${zähler * 0.05}px)`;
        zähler += 0.1;
      }
    }
  }, 10);
}

function show_screen() {
  let screen = document.querySelector(".screenContainer");
  screen.classList.add("active");
}

function zoomen() {
  document.querySelector("#cube").style.transform = `rotateY(${45}deg) rotateX(0deg)`;
}

drehen(true);
