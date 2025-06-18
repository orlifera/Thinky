// Importa le funzioni necessarie
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// La tua configurazione Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeKFQslMeKkmwLaTlRUWk56lFbvsaA8LM",
    authDomain: "thinky-e99a2.firebaseapp.com",
    projectId: "thinky-e99a2",
    storageBucket: "thinky-e99a2.appspot.com",
    messagingSenderId: "128227829993",
    appId: "1:128227829993:web:a16879925627194f9d6878",
    measurementId: "G-912W3907H0"
};

// Inizializza l'app Firebase
const app = initializeApp(firebaseConfig);
// Inizializza Firestore
export const db = getFirestore(app);