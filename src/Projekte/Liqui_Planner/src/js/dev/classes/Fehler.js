
export class Fehler_box {
    
    constructor() {
        this._html = this._html_generieren();
    }

    _html_generieren(){
         let fehler_box = document.createElement("div");
         fehler_box.className = "fehlerbox";
         fehler_box.innerHTML = `<span>Es gibt Fehler in folgenden Eingabefeldern</span>
         <ul>
         </ul>`;
         return fehler_box;
    }

    anzeigen(fehler_liste_arrey){
            this._entfernen();
            fehler_liste_arrey.forEach(e => {
             let li = document.createElement("li");
             li.textContent = e;
             this._html.querySelector("ul").insertAdjacentElement("beforeend", li);
             document.querySelector("#eingabeformular").insertAdjacentElement("beforebegin", this._html);
         });
    }

    _entfernen() {
        document.querySelectorAll(".fehlerbox").forEach(e => e.remove());
    }
}

