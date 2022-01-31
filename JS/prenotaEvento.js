import { writeTable } from "./db_impl.js"

const idEvento = localStorage.getItem("idEvento");
const UID = localStorage.getItem("UID");
console.log("ID: " + idEvento);

writeTable("reservations", {
    uid: UID,
    eid: idEvento,
    pagato: false
});