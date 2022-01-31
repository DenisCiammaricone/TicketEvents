import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js'
import { removeByClass } from "./utilities.js"
import { readTable, writeTableWithID } from './db_impl.js'

const auth = getAuth();
let UID = "";

window.onload = function (){
  loggedIn();
}

function register(email, password){
  createUserWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {
    const user = userCredential.user;

    //Scrive in un database maggiori informazioni riguardo
    //l'utente che si è appena registrato
    //Solo gli spettatori possono registrarsi. 
    //Admin può promuovere uno spettatore a organizzatore evetualmente
    await writeTableWithID("users", userCredential.user.uid, {
      uid: userCredential.user.uid,
      ruolo: "SPETTATORE",
      portafoglio: 0,
      eventiPreferiti: "",
      abbonamento: ""
    });

  
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
  .then( async (userCredential) => {
    // Signed in 
    //response = await readTable("users", userCredential.user.UID);
    localStorage.setItem("UID", userCredential.user.UID);
    location.href = '../index.html';
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
      UID = user.uid;
      localStorage.setItem("UID", user.uid);
      // await readTable("users", UID).then( (response) => {
      // });
      
      removeByClass("userNotLogged");
    } else {
      console.log("No user loggedIn");
      removeByClass("userLogged");
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
