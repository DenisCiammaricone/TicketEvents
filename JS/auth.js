import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
import { getFirestore, setDoc, doc, getDoc  } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js'
import { removeByClass } from "./utilities.js"

initializeApp({
    apiKey: "AIzaSyBHeMAEuyyfXrVQYShlgrg4BrenCJfiG8s",
    authDomain: "ticketevents-ce96f.firebaseapp.com",
    projectId: "ticketevents-ce96f",
    storageBucket: "ticketevents-ce96f.appspot.com",
    messagingSenderId: "543716838496",
    appId: "1:543716838496:web:3ce5f41ca870b53c08c705",
    measurementId: "G-MEVQV0H403"
});

const auth = getAuth();
const db = getFirestore();

window.onload = function (){
  loggedIn();
}

function register(email, password){
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    //Scrive in un database maggiori informazioni riguardo
    //l'utente che si è appena registrato
    //Solo gli spettatori possono registrarsi. 
    //Admin può promuovere uno spettatore a organizzatore evetualmente
    try {
      setDoc((doc(db, "users",userCredential.user.uid)), {
        uid: userCredential.user.uid,
        ruolo: "SPETTATORE",
        portafoglio: 0,
        eventiPreferiti: "",
        abbonamento: ""
      });
      console.log("Document written with ID: ", doc(db, "users",userCredential.user.uid).id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // Chiama il login con email e password;
  })
  .catch((error) => {
    //Utilizza questi const per mostrare eventuali messaggi
    //di errore durante la registrazione
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function login(email, password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    location.href = '../index.html';
    // ...
  })
  .catch((error) => {
    //Utilizza questi const per mostrare eventuali messaggi
    //di errore durante il login
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function logOut(){
  signOut(auth).then(() => {
    console.log("Logging Out!");
  }).catch((error) => {
    console.log("ERROR Logging Out!");
  });
}

//Capisce se si è già loggati o no
function loggedIn(){
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;

      const docRef = doc(db, "users",uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //Puoi accedere a ogni singolo dato con docSnap.data().<nome_dato>
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      
      console.log("logged as uid: " + uid);
      removeByClass("userNotLogged");

    } else {
      console.log("No user loggedIn");
      removeByClass("userLogged");
      return false;
    }
  });
}

if(document.getElementById("logOut")) {
  document.getElementById("logOut").onclick = function() {
    logOut();
  };
}

//Controlla se esiste il bottone executeBtn
if(document.getElementById("executeBtn")) {
  document.getElementById("executeBtn").onclick = function() {
    //Prende i valori di email e password 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    //Capisce in quale pagina ci troviamo, se login o register
    //ed esegue la rispettiva funzione
    if (document.getElementById("executeBtn").name == "register") {
      register(email,password); 
    } else if(document.getElementById("executeBtn").name == "login"){
      login(email,password); 
    }
  };
}
