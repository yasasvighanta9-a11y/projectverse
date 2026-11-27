
import { initializeApp } from
"https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCj0HUOCFQhr3LWOEBfzXQES9_cL0y8kEU",
    authDomain: "project-verse-13ec8.firebaseapp.com",
    projectId: "project-verse-13ec8",
    storageBucket: "project-verse-13ec8.firebasestorage.app",
    messagingSenderId: "232738934892",
    appId: "1:232738934892:web:63815fdbfd5a39a8984849",
    measurementId: "G-4YLQMWHH5V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
