import { getUserTickets, readTable} from "./db_impl.js"

getUserTickets().then((events) => {
    events.forEach(reservation => {
        readTable("events", reservation.data().eid).then((event) => {
            let a = document.createElement("p");
            let txt = document.createTextNode(event.nome + " " + event.descrizione + " ");
            let btn = document.createElement("button");
            btn.innerHTML = "Rimborsa";
            btn.classList.add("btn");
            btn.id = reservation.id;
            a.appendChild(txt);
            a.appendChild(btn);
            document.getElementById("listaEventi").appendChild(a);
        })
    });

    $("button").click(function() {
        localStorage.setItem("idEvento", this.id);
        location.href = './prenotaBiglietto.html';
    });
});