import { writeTable } from "./db_impl.js"

document.getElementById('creaEvento').onclick = function creaEvento(){
    const tipo = document.getElementById("tipoEvento").value;
    const nome = document.getElementById("nome").value;
    const descrizione = document.getElementById("descrizione").value;
    const luogo = document.getElementById("luogo").value;
    const prezzo = document.getElementById("prezzo").value;
    const dataEvento = document.getElementById("dataEvento").value;
    const uid = localStorage.getItem("UID");
    console.log(dataEvento);

    writeTable("events", {
        creatore: uid,
        prezzo: prezzo,
        tipo: tipo,
        nome: nome,
        descrizione: descrizione,
        prenotabile: true,
        luogo: luogo,
        data: dataEvento
    });
}