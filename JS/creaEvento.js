import { getUID } from "./auth.js";
import { writeTable, writeTableWithID } from "./db_impl.js"


document.getElementById('creaEvento').onclick = function creaEvento(){
    const tipo = document.getElementById("tipoEvento").value;
    const nome = document.getElementById("nome").value;
    const descrizione = document.getElementById("descrizione").value;
    const luogo = document.getElementById("luogo").value;

    writeTable("events", {
        creatore: getUID(),
        tipo: tipo,
        nome: nome,
        descrizione: descrizione,
        luogo: luogo
    });
}