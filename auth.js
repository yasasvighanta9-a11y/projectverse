import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";


function toast(message) {
    const box = document.getElementById("toast");

    if (box) {
        box.textContent = message;
        box.classList.add("show");

        setTimeout(() => box.classList.remove("show"), 3000);
    } else {
        alert(message);
    }
}


// SIGN UP
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const branch = document.getElementById("signupBranch").value;
        const year = document.getElementById("signupYear").value;

        if (!name) {
            toast("Please enter your name.");
            return;
        }

        const submitButton = signupForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Creating account...";

        try {
            const credential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "users", credential.user.uid), {
                uid: credential.user.uid,
                name,
                branch,
                year,
                bio: "Student builder exploring technology.",
                skills: [],
                createdAt: serverTimestamp()
            });

            toast("Account created successfully!");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 800);

        } catch (error) {
            console.error(error);
            toast(getFriendlyError(error.code));

            submitButton.disabled = false;
            submitButton.textContent = "Create Account 🚀";
        }
    });
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Logging in...";

        try {
            await signInWithEmailAndPassword(auth, email, password);

            toast("Login successful!");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 700);

        } catch (error) {
            console.error(error);
            toast(getFriendlyError(error.code));

            submitButton.disabled = false;
            submitButton.textContent = "Login →";
        }
    });
}


// LOGGED-IN USER DISPLAY
onAuthStateChanged(auth, async (user) => {
    const nameElement = document.getElementById("currentUserName");
    const logoutButton = document.getElementById("logoutBtn");

    if (user) {
        if (nameElement) {
            const profileSnapshot = await getDoc(doc(db, "users", user.uid));

            nameElement.textContent = profileSnapshot.exists()
                ? profileSnapshot.data().name
                : user.email;
        }

        if (logoutButton) {
            logoutButton.hidden = false;
        }

    } else {
        if (nameElement) {
            nameElement.textContent = "Guest";
        }

        if (logoutButton) {
            logoutButton.hidden = true;
        }
    }
});


// LOGOUT
const logoutButton = document.getElementById("logoutBtn");

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.href = "login.html";
        } catch (error) {
            toast("Could not log out. Please try again.");
            console.error(error);
        }
    });
}


// FRIENDLIER ERROR MESSAGES
function getFriendlyError(code) {
    const messages = {
        "auth/email-already-in-use": "This email already has an account. Please log in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Please choose a stronger password.",
        "auth/invalid-credential": "Email or password is incorrect.",
        "auth/network-request-failed": "Network error. Check your internet connection.",
        "permission-denied": "Database access denied. Check your Firestore rules."
    };

    return messages[code] || "Something went wrong. Please try again.";
}// ========================================
// PROJECTVERSE PROFILE DISPLAY
// ========================================

onAuthStateChanged(auth, async (user) => {

    const dashboard = document.getElementById("dashboardProfile");
    if (!dashboard) return;

    dashboard.hidden = true;
    if (!user) return;

    try {
        const profileRef = doc(db, "users", user.uid);
        const profileSnapshot = await getDoc(profileRef);

        if (auth.currentUser?.uid !== user.uid) return;

        if (!profileSnapshot.exists()) {
            toast("Student profile not found.");
            return;
        }

        const profile = profileSnapshot.data();

        const name = document.getElementById("dashboardName");
        const email = document.getElementById("dashboardEmail");
        const branch = document.getElementById("dashboardBranch");
        const year = document.getElementById("dashboardYear");
        const skills = document.getElementById("dashboardSkills");
        const currentName = document.getElementById("currentUserName");

        if (name) name.textContent = "Welcome, " + profile.name + "!";
        if (email) email.textContent = user.email;
        if (branch) branch.textContent = profile.branch;
        if (year) year.textContent = profile.year;
        if (skills) skills.textContent = (profile.skills || []).length;
        if (currentName) currentName.textContent = profile.name;
        dashboard.hidden = false;

    } catch (error) {
        console.error("Profile loading error:", error);
        toast("Unable to load your profile.");
    }

});
