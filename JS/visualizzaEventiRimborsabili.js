import { getUserTickets, readTable} from "./db_impl.js"

getUserTickets().then((events) => {
    events.forEach(doc => {
        readTable("events", doc.data().eid).then((evnt) => {
            let a = document.createElement("p");
            let txt = document.createTextNode(evnt.nome + " " + evnt.descrizione + 
            " " + evnt.luogo + " " + evnt.tipo + " " + evnt.prezzo + " ");
            let btn = document.createElement("button");
            btn.innerHTML = "Richiedi Rimborso";
            btn.classList.add("btn");
            btn.id = doc.id;
            a.appendChild(txt);
            a.appendChild(btn);
            document.getElementById("listaEventi").appendChild(a);
        });
    });

    $("button").click(function() {
        localStorage.setItem("idEvento", this.id);
    });
});