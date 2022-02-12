import { getBookableEvents, addToCart } from "./db_impl.js"

getBookableEvents().then((events) => {
    let prezzo = 0

    events.forEach(doc => {
        let a = document.createElement("p");
        prezzo = doc.data().prezzo;

        let txt = document.createTextNode(doc.data().nome + " " + doc.data().descrizione + 
        " " + doc.data().luogo + " " + doc.data().tipo + " " + doc.data().prezzo + " " + doc.data().data + " ");

        let btn = document.createElement("button");
        btn.innerHTML = "Aggiungi al Carrello";
        btn.classList.add("btn");
        btn.value = prezzo
        btn.id = doc.id;
        a.appendChild(txt);
        a.appendChild(btn);
        document.getElementById("listaEventi").appendChild(a);
    });

    //Aggiunge gli elementi cliccati al carrello
    $("button").click(function() {
        addToCart(this.id, this.value);
    });
});

