"use strikt";


let input = document.querySelector("#input");
let zahlen_string = {wert:""};
let ergebnis = {wert:""};
let schreibmaschiene = 0;
let schreibmaschiene_txt;

class Belegung_ziffern {

    constructor (nummer) {
        this.value = nummer,
        this.document =this.dokument(),
        this.listener = this.listener_funk( this.document)
        
    }

    dokument(){
       return document.querySelector(`#number${this.value}`); 
    }

    listener_funk(dokument) {
        
        this.aktualisieren;
        dokument.addEventListener("click", () => {
            if (Object.keys(ergebnis.wert).length > 1){
                reset();
                clear_schreibmaschiene();
            };
            zahlen_string.wert += this.value;
            aktualisieren()
        });
            
    };
    
};

class Belegung_operator{

    constructor () {
        this.document =this.dokument(),
        this.listener = this.listener_funk(this.document)
        
    }

    dokument(){
       return document.querySelectorAll(`.operator`); 
    }

    listener_funk(dokument) {
        dokument.forEach( e => {
            e.addEventListener("click", () => {
                if (e.id === "plus") {
                    zahlen_string.wert += "+";
                }
                if (e.id === "minus"){
                    zahlen_string.wert += "-";
                }
                if (e.id === "durch"){
                    zahlen_string.wert += "/";
                }
                if (e.id === "multi"){
                    zahlen_string.wert += "*";
                }
                aktualisieren();
                if (e.id === "summe"){
                   summ(zahlen_string.wert);
                }
                if (e.id === "taschenrechner_licht"){
                    reset();
                    clear_schreibmaschiene();
                    aktualisieren();
                }
                
                
            });
        })
       document.querySelector("#screen").addEventListener("keypress" , (input) =>{
        if (input.key === "Enter") {
            summ(zahlen_string.wert);
            aktualisieren();
            reset();      
        } else {
            aktualisieren();
            zahlen_string.wert += input.key;
        }
       })
    }

   
};

function aktualisieren(){
    if (Object.keys(ergebnis.wert).length >= 1){
        input.value = ergebnis.wert;
    } else {
        input.value = null;
        input.value = zahlen_string.wert; 
    }
};

function reset() {
    zahlen_string.wert = "";
    ergebnis.wert = "";
};

function tasten_belegen (){
    let zähler = 0;
    while (zähler <= 9) {
       new Belegung_ziffern(zähler);
        zähler++;
    }
    new Belegung_operator()
};


function summ(wert_string) {
    let regex = /[a-zA-Z]?[a-zA-Z]?#?/g;
    let valid_string = wert_string.replace(/x/g, "*");
    valid_string = wert_string.replace(/,/g, ".");
    valid_string = valid_string.replace(regex, "");
    if (valid_string.lastIndexOf("(") > -1 && (valid_string.lastIndexOf("(") > valid_string.length-5) ) {
        ergebnis.wert = "error";
        aktualisieren();
    } 
    else if ((eval(valid_string)) == Infinity){
        ergebnis.wert = "error";
        aktualisieren();
    } else {
        let valid_result = (eval(valid_string));
        ergebnis.wert = `${valid_string} = ${valid_result}`
        schreibmaschiene_txt = valid_result.toString();
        clear_schreibmaschiene()
        document.querySelector("#ergebniss").innerHTML = "="
        typeWriter();
        aktualisieren();
    };
    
};

function clear_schreibmaschiene() {
    document.querySelector("#ergebniss").innerHTML = "";
    schreibmaschiene = 0;
    schreibmaschiene_txt;
}

function typeWriter() {
    let text = schreibmaschiene_txt.replace(/\./g, ","); 
    if (schreibmaschiene < text.length) {
        
      document.querySelector("#ergebniss").innerHTML += text.charAt(schreibmaschiene);
      schreibmaschiene++;
      document.querySelector("#pencil").play();
      document.querySelector("#ergebniss").style.width = "23vw";
      setTimeout(typeWriter, 350);
    } else {
        document.querySelector("#pencil").pause();
    }
    
    
}

document.addEventListener("resize", () => {
    let block = document.querySelector(".block")
    let rechner = document.querySelector(".bild")
    block.style.transform = `scale(${(window.innerWidth / 2144)})`
    rechner.style.transform = `scale(${(window.innerWidth / 2144)})`
    console.log("hallo");
})


window.addEventListener('resize', () => {
    let block = document.querySelector(".block")
    let rechner = document.querySelector(".bild")
    block.style.transform = `scale(${(window.innerWidth / 2144)})`
    rechner.style.transform = `scale(${(window.innerWidth / 2144)})`

});

tasten_belegen();


