// Loadiung-test-------------------------

window.addEventListener("load", () => {
  let loader = document.querySelector("#loading-container");
  loader.style.transform = "translateY(-800px)";
  loader.style.opacity = "0";
  loader.style.scale = "0";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);

  projekte_animation();
});

// Animation Navbar-------------------------------------------------------
let mobileNavLinks = document.querySelectorAll(".navLink");
let bubble = `<div class="bubbleBackground"></div>`;
let element1 = document.querySelector("#background_navigation .link-container:nth-of-type(1)");
let element2 = document.querySelector("#background_navigation .link-container:nth-of-type(2)");
let element3 = document.querySelector("#background_navigation .link-container:nth-of-type(3)");
let element4 = document.querySelector("#background_navigation .link-container:nth-of-type(4)");
let element5 = document.querySelector("#background_navigation .link-container:nth-of-type(5)");
let logo = document.querySelector(".logo-container");
let logoShadow = document.querySelector("#logo_shadow");

// Navbar animation------------------------------------------------------
function load() {
  window.addEventListener("load", () => {
    let navbar = document.querySelector(".dreieck-container");
    navbar.style.transform = "translateY(-500px)";

    setTimeout(function () {
      navbar.style.transform = "translateY(0)";
    }, 1000);

    navAnimation();
  });
  balkenMinimieren();
  // Buttons animation
  mobileNavLinks.forEach((e) =>
    e.addEventListener("click", (element) => {
      mobileNavLinks.forEach((e) => e.classList.remove("active"));
      e.classList.add("active");
    })
  );
}

load();

function balkenMinimieren() {
  element1.style.transform = `skewX(30deg) translateX(200px) scale(0)`;
  element2.style.transform = `skewX(-30deg) translateX(-200px) scale(0)`;
  element3.style.transform = `skewX(30deg) translateX(200px) scale(0)`;
  element4.style.transform = `skewX(-30deg) translateX(-200px) scale(0)`;
  element5.style.transform = `translatey(-100px) scale(0)`;
  logo.style.transform = `translateX(1px) scale(0)`;
}

function navAnimation() {
  setTimeout(function () {
    element1.style.transform = `skewX(30deg) translateX(100px) scale(1)`;
    element2.style.transform = `skewX(-30deg) translateX(-100px) scale(1)`;
    element3.style.transform = `skewX(30deg) translateX(100px) scale(1)`;
    element4.style.transform = `skewX(-30deg) translateX(-100px) scale(1)`;
    element5.style.transform = `translatey(0) scale(1)`;
    logo.style.transform = `translateX(1px) scale(0.9)`;
  }, 1500);

  let navbalken = document.querySelectorAll(".link-container");

  setTimeout(function () {
    navbalken.forEach((element) => {
      element.style.transitionDelay = "0ms";
    });
  }, 2000);

  logoShadow.style.opacity = "1";
}

// socials background-color------------------------------------------
document.querySelectorAll(".socials img").forEach((element) => {
  element.addEventListener("mouseover", () => {
    document.querySelector(".socials-container-re").style.boxShadow = "1px .5px 3px 0px #2868ff";
    document.querySelector(".socials-container-li").style.boxShadow = "1px .5px 3px 0px #2868ff";
  });
  element.addEventListener("mouseout", () => {
    document.querySelector(".socials-container-re").style.boxShadow = "1px .5px 3px 0px #777777";
    document.querySelector(".socials-container-li").style.boxShadow = "1px .5px 3px 0px #777777";
  });
});

// Galerie section animation------------------------------------------
function animation_thumb_click() {
  // capture-phase unterdrücken

  document.querySelector("#yt_link").addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
    },
    true
  );

  for (let zähler = 1; zähler <= 10; zähler++) {
    let elements = document.getElementsByClassName(`bild_p_${zähler}`);
    let pos_x;
    switch (zähler) {
      case 1:
        pos_x = 3.7;
        break;
      case 2:
        pos_x = 2;
        break;
      case 3:
        pos_x = 0;
        break;
      case 4:
        pos_x = -2;
        break;
      case 5:
        pos_x = -3.7;
        break;
      case 6:
        pos_x = 3.7;
        break;
      case 7:
        pos_x = 2;
        break;
      case 8:
        pos_x = 0;
        break;
      case 9:
        pos_x = -2;
        break;
      case 10:
        pos_x = -3.7;
        break;
      default:
        break;
    }
    for (const element of elements) {
      element.style.boxShadow = `${pos_x}px 3.66px 3px -2px var(--sec_color)`;
      element.addEventListener(
        "click",
        () => {
          show_slider(zähler);
        },
        false
      );

      element.addEventListener("mousedown", () => {
        element.style.transform = "scale(.98)";
        element.style.boxShadow = `${pos_x}px 3.66px 8px 0px var(--off_color)`;
      });
      element.addEventListener("mouseup", () => {
        element.style.transform = "scale(1)";
        element.style.boxShadow = `${pos_x}px 3.66px 3px -2.5px var(--off_color)`;
      });
      element.addEventListener("mouseover", () => {
        element.style.transform = "scale(1.00)";
        element.style.boxShadow = `${pos_x}px 3.66px 3px -2px #2868ff`;
      });

      element.addEventListener("mouseout", () => {
        element.style.transform = "scale(1)";
        element.style.boxShadow = `${pos_x}px 3.66px 3px -2px var(--sec_color)`;
      });
    }
  }
}

animation_thumb_click();

//green socks animation------------------------------------
// galerie anzeigen
gsap.registerPlugin(ScrollTrigger);

gsap.from(".galerie-container div", {
  x: 0,
  duration: 1,
  scale: 0,
  y: 40,
  scrollTrigger: {
    scrub: 1,
    trigger: ".galerie-container div",
    start: "top bottom",
    end: "+=500",
  },
  ease: "power2.inOut",
  stagger: {
    grid: [7, 15],
    from: "start",
    amount: 1,
  },
});

gsap.from(".galerie-container h1", {
  opacity: 0,
  duration: 2,
  x: -400,
  opacity: -1,
  scrollTrigger: {
    scrub: 1,
    trigger: ".galerie-container h1",
    start: "top bottom",
    end: "+=350",
  },
});

//galerie ausblenden
gsap.to("#galerie", {
  scrollTrigger: {
    trigger: ".galerie-container",
    start: "bottom center",
    scrub: 1,
    end: "+=300",
  },
  opacity: 0,
});

// Slideshow steuern
function show_slider(zähler) {
  let picture_nummer = document.querySelector(`.picture${zähler}`);
  let slide_container = document.getElementById("slideshow-container");
  let slide_show = document.querySelector("#slideshow");

  slide_container.style.display = "flex";
  picture_nummer.classList.add("active");

  setTimeout(() => {
    slide_show.style.opacity = "1";
    slide_container.style.transform = "scale(1)";
  }, 100);

  setTimeout(() => {
    slide_container.style.backgroundColor = "rgba(0, 0, 0, .6)";
    slide_container.style.boxShadow = "inset 0 0 40px 80px rgba(0, 0, 0, .5)";
  }, 400);

  // Slider schließen und active status entfernen
  let close_button = document.getElementById("close-slider");
  close_button.addEventListener("click", () => {
    slide_container.style.backgroundColor = "transparent";
    slide_container.style.boxShadow = "0 0 0 0 transparent";
    setTimeout(() => {
      slide_container.style.transform = "scale(0)";
      slide_show.style.opacity = ".5";
    }, 350);
    setTimeout(function () {
      slide_container.style.display = "none";
    }, 500);
    setTimeout(() => {
      document.querySelectorAll(".carousel-item").forEach((element) => {
        element.classList.remove("active");
      });
    }, 500);
  });
}

//über mich Bereich--------------------------------------------------------------
// animation text einfahren
gsap.from(".ueber-mich-inhalt", {
  duration: 2,
  delete: 1,
  opacity: -1,
  y: 400,
  scrollTrigger: {
    scrub: 1,
    trigger: "#ueber-mich",
    start: "top bottom",
    end: "+=650",
  },
});

//profilphoto einfahren
gsap.from(".profilfoto", {
  duration: 2,
  x: -400,
  opacity: -1,
  scrollTrigger: {
    scrub: 1,
    trigger: "#ueber-mich",
    start: "top bottom",
    end: "+=650",
  },
});

//profilbild ausfahren
gsap.to("#ueber-mich", {
  scrollTrigger: {
    trigger: "#ueber-mich",
    start: "bottom center",
    scrub: 1,
    end: "+=300",
  },
  opacity: 0,
});

// Projekt bereich------------------------------------------------------------
// Projekte aus .json lesen
fetch("./src/assets/config/projekte.json")
  .then((response) => response.json())
  .then((projekte) => {
    projekte.forEach((eintrag) => {
      let regex = /_/gi;
      let anker = document.createElement("a");
      anker.href = `./src/Projekte/${eintrag}/index.html`;
      anker.className = "projekt_einzeln";

      let img = document.createElement("img");
      anker.insertAdjacentElement("afterbegin", img);
      let p = document.createElement("p");
      img.insertAdjacentElement("afterend", p);
      img.src = `./src/Projekte/thumbs/${eintrag}.png`;
      p.textContent = `${eintrag.replace(regex, " ")}`;
      document.querySelector(".projekt-container").insertAdjacentElement("afterbegin", anker);
      projekte_design();
    });
  });

function projekte_design() {
  //Projekte schatten
  setTimeout(() => {
    let shadow_anker = document.querySelectorAll(".projekt_einzeln");
    shadow_anker.forEach((e) => {
      e.addEventListener("mouseout", () => {
        e.style.boxShadow = "0px 0px 6px 0px #FF7500";
      });
      e.addEventListener("mouseover", () => {
        e.style.boxShadow = "0px 0px 6px 0px #2868ff";
      });
    });
  }, 100);
}

function projekte_animation() {
  //Projekte sektion anzeigen
  gsap.from("#projekte h1", {
    opacity: 0,
    duration: 2,
    x: -400,
    opacity: -1,
    scrollTrigger: {
      scrub: 1,
      trigger: "#projekte h1",
      start: "top bottom",
      end: "+=350",
    },
  });

  // Projekte einzel animation
  setTimeout(() => {
    let projekt_einzeln = document.querySelectorAll(".projekt_einzeln");
    gsap.from(projekt_einzeln, {
      opacity: 0,
      y: 200,
      scrollTrigger: {
        trigger: projekt_einzeln,
        scrub: 1,
        start: "top bottom",
        end: "+=500",
      },
      stagger: {
        grid: [7, 15],
        from: "center",
        amount: 1,
      },
    });
    gsap.to(projekt_einzeln, {
      boxShadow: "0px 0px 6px 0px #FF7500",
    });
  }, 100);
}

// Kontakt Bereich--------------------------------------------
// Kontaktkarte ausfahren
document.querySelector("#kontakt-btn").addEventListener("click", () => {
  document.querySelector("#form-absolute").classList.toggle("formactive");
});

// Formular senden und response geben
let form = document.getElementById("formular");

form.onsubmit = function (event) {
  event.preventDefault();

  //toggle formular sichtbarkeit
  document.querySelector("#form-absolute").classList.toggle("formactive");

  let response_div = document.querySelector("#form_response");
  let response_text = document.querySelector(".response p");

  var formData = new FormData(form);
  var xhr = new XMLHttpRequest("");
  xhr.open("POST", form.action, true);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onload = function (e) {
    // Response
    try {
      var response = JSON.parse(xhr.response);
    } catch (e) {
      var response = { success: false, error_msg: "no json request" };
      console.error(response);
    }

    // Success
    if (xhr.status === 200 && response.success == true) {
      // Redirect to Success-URL
      // ... or display Success-Message
      response_text.style.color = "#32D800";
      response_text.innerHTML = `<i class="fa-solid fa-check-double"></i>&nbspErfolgreich gesendet`;
      response_div.style.display = "flex";
    }

    // Error
    else {
      // Display Error Message
      let msg = response.error;
      if (response.error_msg != "") msg = response.error_msg;
      response_text.style.color = "red";
      response_text.innerHTML = `<i class="fa-solid fa-bug"></i>&nbspError: ${msg}`;
      response_div.style.display = "flex";
    }
  };

  // close btn funktionalität
  document.querySelector("#response_btn").addEventListener("click", () => {
    response_div.style.display = "none";
  });

  xhr.send(formData);
};
