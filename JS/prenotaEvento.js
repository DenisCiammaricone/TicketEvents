import { writeTable } from "./db_impl.js"

const idEvento = localStorage.getItem("idEvento");
const UID = localStorage.getItem("UID");
//TODO: Si può cancellare questo script?
writeTable("reservations", {
    uid: UID,
    eid: idEvento,
    pagato: false
});