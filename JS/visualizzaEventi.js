import { getBookableEvents } from "./db_impl.js"

getBookableEvents().then((events) => {
    //Gestisci qui l'impaginazione del documento contentente tutti gli eventi
    events.forEach(doc => {
        let a = document.createElement("p");
        let txt = document.createTextNode(doc.data().nome + " " + doc.data().descrizione + " " + doc.data().luogo + " " + doc.data().tipo + " ");
        let btn = document.createElement("button");
        btn.innerHTML = "Prenota";
        btn.classList.add("btn");
        btn.id = doc.id;
        a.appendChild(txt);
        a.appendChild(btn);
        document.getElementById("listaEventi").appendChild(a);
    });

    $("button").click(function() {
        localStorage.setItem("idEvento", this.id);
        location.href = './prenotaBiglietto.html';
    });
});

