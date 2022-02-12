import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
import { getFirestore, setDoc, addDoc, doc, getDoc, collection, query, getDocs, where, updateDoc, increment } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js'


initializeApp({
    apiKey: "AIzaSyBHeMAEuyyfXrVQYShlgrg4BrenCJfiG8s",
    authDomain: "ticketevents-ce96f.firebaseapp.com",
    projectId: "ticketevents-ce96f",
    storageBucket: "ticketevents-ce96f.appspot.com",
    messagingSenderId: "543716838496",
    appId: "1:543716838496:web:3ce5f41ca870b53c08c705",
    measurementId: "G-MEVQV0H403"
});

const db = getFirestore();

/** Remember to use await */
export async function readTable(table, id) {
  const docSnap = await getDoc(doc(db, table,id));
  if(docSnap.exists()){
    return docSnap.data();
  }
  return null;
}

//Restituisce tutti gli eventi prenotabili
export async function getBookableEvents(){
  const q = query(collection(db, "events"), where("prenotabile", "==", true));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
} 

export async function getEvent(eid){
  return readTable("events", eid);
} 

export async function getUserTickets(){
  const UID = localStorage.getItem("UID");
  const q = query(collection(db, "reservations"), where("uid", "==", UID));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
} 

export async function getUserShoppingCart(){
  const UID = localStorage.getItem("UID");
  const q = query(collection(db, "carts"), where("uid", "==", UID), where("prenotato", "==", false));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
} 

export async function getUserRefundableReservations(){
  const UID = localStorage.getItem("UID");
  const q = query(collection(db, "reservations"), where("refund_asked", "==", false), where("uid", "==", UID), where("pagato", "==", true));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

export async function getReservationToRefun(){
  const q = query(collection(db, "refund"), where("effettuato", "==", false));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

export async function giveRefund(refundID){
  const refund = await readTable("refund", refundID);
  const reservationID = refund.reservation_id;
  const reservation = await readTable("reservations", reservationID);
  const UID = reservation.uid;
  const ticketValue = await readTable("events",reservation.eid);
  console.log(ticketValue.prezzo);
  updateDoc(doc(db, "users", UID), {
    portafoglio: increment(ticketValue.prezzo)
  });
  updateDoc(doc(db, "refund", refundID), {
    effettuato: true
  });
}

export function setRefundAsAsked(reservationID){
  updateDoc(doc(db, "reservations", reservationID), {
    refund_asked: true
  });
}

export async function writeTableWithID(table, id, data) {
  await setDoc(doc(db, table, id), data);
}

export async function writeTable(table, data) {
  await addDoc(collection(db, table), data);
}

export function addToCart(idEvento, prezzoEvento){
  const UID = localStorage.getItem("UID");

  writeTable("carts", {
      uid: UID,
      eid: idEvento,
      prezzo: prezzoEvento,
      prenotato: false
  });
}

export function setCartAsOrdered(events) {
  events.forEach(element => {
    updateDoc(doc(db, "carts", element.id), {
      prenotato: true
    });
  });
}

export function bookEvent(event) {
  const UID = localStorage.getItem("UID");
  writeTable("reservations", {
      uid: UID,
      eid: event.data().eid,
      pagato: false,
      refund_asked:false
  });
}
