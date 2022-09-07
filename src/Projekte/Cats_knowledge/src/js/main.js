async function api() {
  try {
    let response = await fetch("https://catfact.ninja/fact");
    let data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

function animation_string() {
  let p = document.querySelector(".quotes");
  let index = 0;

  api().then((data) => {
    let text = data.fact;

    let mein_interval = setInterval(() => {
      if (index < text.length) {
        delete_child();
        add_child();
      } else {
        clearInterval(mein_interval);
        delete_child();
        add_child(true);

        setTimeout(() => {
          console.log("ende");
          p.textContent = "";
          animation_string();
        }, 2000);
      }
    }, 150);

    function add_child(end = false) {
      if (end === false) {
        let blend = document.createElement("span");
        blend.className = "blend";
        document.querySelector(".quotes").insertAdjacentElement("beforeend", blend);
        setTimeout(() => {
          blend.style.opacity = "0";
          blend.style.scale = "0.5";
          p.innerHTML += text[index];
          index++;
        }, 100);
      } else {
        let blend = document.createElement("span");
        blend.className = "blend";
        document.querySelector(".quotes").insertAdjacentElement("beforeend", blend);
        let mein_interval = setInterval(() => {
          console.log("fehler");
          blend.classList.toggle("opacity");
          setTimeout(() => {
            clearInterval(mein_interval);
          }, 1400);
        }, 200);
      }
    }

    function delete_child() {
      let blend = document.querySelector(".blend");

      if (blend != null) {
        blend.parentNode.removeChild(blend);
      }
    }
  });
}

animation_string();
