import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
import { getFirestore, setDoc, addDoc, doc, getDoc, collection, query, getDocs, where } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js'


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
    console.log("Document data:", docSnap.data());
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

export async function getUserTickets(){
  const UID = localStorage.getItem("UID");
  const q = query(collection(db, "reservations"), where("uid", "==", UID));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
} 

export async function writeTableWithID(table, id, data) {
  await setDoc(doc(db, table, id), data);
}

export async function writeTable(table, data) {
  await addDoc(collection(db, table), data);
}
