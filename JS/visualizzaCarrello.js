import { getUserShoppingCart, getEvent } from "./db_impl.js"


getUserShoppingCart().then((events) => {
    let prezzo = 0
    //Gestisci qui l'impaginazione del documento contentente tutti gli eventi
    events.forEach(doc => {
        getEvent(doc.data().eid).then((e) => {
            let a = document.createElement("p");

            let txt = document.createTextNode(e.nome + " " + e.descrizione + 
            " " + e.luogo + " " + e.tipo + " " + doc.data().prezzo + " ");
    
            a.appendChild(txt);
            document.getElementById("listaEventi").appendChild(a);
        });
        
    });

});

