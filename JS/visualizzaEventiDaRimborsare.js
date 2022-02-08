import { getReservationToRefun, giveRefund } from "./db_impl.js"

getReservationToRefun().then((events) => {
    events.forEach(doc => {
        let a = document.createElement("p");
        let txt = document.createTextNode(doc.id + " ");
        let btn = document.createElement("button");
        btn.innerHTML = "Rimborsa";
        btn.classList.add("btn");
        btn.id = doc.id;

        a.appendChild(txt);
        a.appendChild(btn);

        document.getElementById("listaEventi").appendChild(a);

        $("button").click(function() {
            giveRefund(this.id);
        });
        
    });

    
});