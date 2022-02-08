import { getUserRefundableReservations, readTable, writeTable, setRefundAsAsked } from "./db_impl.js"

getUserRefundableReservations().then((events) => {
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

            $("button").click(function() {
                console.log(this.id + " aa");
                writeTable("refund", {
                    effettuato: false,
                    reservation_id: this.id
                });
                setRefundAsAsked(this.id);
            });
        });
        
    });

    
});