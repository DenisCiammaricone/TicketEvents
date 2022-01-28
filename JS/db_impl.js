import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
import { getFirestore, setDoc, doc, getDoc  } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js'


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

export async function writeTable(table, id, data) {
  console.log("kappa");
  await setDoc(doc(db, table, id), data);
  console.log("Document written with ID: ", doc(db, table, id, data));
  
}