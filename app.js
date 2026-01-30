// --------------------------------------------------------------
// 1. CONFIGURATION
// --------------------------------------------------------------
// PASTE YOUR CONFIG OBJECT HERE FROM WHATSAPP
const firebaseConfig = {
  //YOUR FIREBASE CONFIG HERE
};

// Initialize
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// --------------------------------------------------------------
// 2. AUTHENTICATION FLOW
// --------------------------------------------------------------
const authBtn = document.getElementById('authBtn');
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');

authBtn.addEventListener('click', () => {
    if (auth.currentUser) {
        auth.signOut();
    } else {
        auth.signInWithPopup(provider);
    }
});

auth.onAuthStateChanged(user => {
    if (user) {
        authBtn.innerText = "Logout (" + user.displayName.split(" ")[0] + ")";
        loginView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        clearState();
        loadUserProgress(user.uid); // Load checkboxes
    } else {
        authBtn.innerText = "Login with Google";
        loginView.classList.remove('hidden');
        dashboardView.classList.add('hidden');
        clearState();
    }
});
function clearState() {
    // 1. Reset Stats Numbers
    document.getElementById('easyVal').innerText = '0';
    document.getElementById('medVal').innerText = '0';
    document.getElementById('hardVal').innerText = '0';
    document.getElementById('totalScore').innerText = '0';
    document.getElementById('feedbackText').innerText = '--';
    
    // 2. Clear Username Input
    document.getElementById('lcUsername').value = '';
    
    // 3. Uncheck ALL Blind 75 Checkboxes
    document.querySelectorAll('.q-check').forEach(checkbox => {
        checkbox.checked = false;
    });

    // 4. Hide the Stats Box
    document.getElementById('statsDisplay').classList.add('hidden');
}

// --------------------------------------------------------------
// 3. LEETCODE API & SCORING FORMULA
// --------------------------------------------------------------
document.getElementById('fetchBtn').addEventListener('click', async () => {
    const username = document.getElementById('lcUsername').value;
    if (!username) return alert("Enter a username!");

    const btn = document.getElementById('fetchBtn');
    btn.innerText = "Fetching...";
    
    try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await res.json();

        if (data.status === 'error') throw new Error("User not found");

        // Render Stats
        document.getElementById('easyVal').innerText = data.easySolved;
        document.getElementById('medVal').innerText = data.mediumSolved;
        document.getElementById('hardVal').innerText = data.hardSolved;
        document.getElementById('statsDisplay').classList.remove('hidden');

        // THE "FORMULA"
        // Easy=1, Medium=3, Hard=5
        const score = (data.easySolved * 1) + (data.mediumSolved * 3) + (data.hardSolved * 5);
        document.getElementById('totalScore').innerText = score;
        
        // Feedback Logic
        const fb = document.getElementById('feedbackText');
        if (score > 400) { fb.innerText = "🔥 Strong Portfolio"; fb.style.color = "green"; }
        else { fb.innerText = "⚠️ Needs Improvement"; fb.style.color = "orange"; }

    } catch (e) {
        alert(e.message);
    } finally {
        btn.innerText = "Fetch Stats";
    }
});

// --------------------------------------------------------------
// 4. BLIND 75 TABLE & DATABASE PERSISTENCE
// --------------------------------------------------------------
const tableBody = document.getElementById('questionsTable');

// Render the Static Table
blind75Data.forEach(q => {
    const row = `
        <tr>
            <td><input type="checkbox" class="q-check" data-id="${q.id}"></td>
            <td>${q.title} <span class="company-tag">${q.difficulty}</span></td>
            <td>${q.company}</td>
            <td><a href="${q.url}" target="_blank">Solve</a></td>
        </tr>
    `;
    tableBody.innerHTML += row;
});

// Handle Checkbox Clicks (Save to Firebase)
tableBody.addEventListener('change', (e) => {
    if (e.target.classList.contains('q-check')) {
        const qId = e.target.getAttribute('data-id');
        const isChecked = e.target.checked;
        const uid = auth.currentUser.uid;

        // Save to Firestore: users/{uid}/progress/{qId}
        db.collection('users').doc(uid).collection('progress').doc(qId).set({
            done: isChecked,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
});

// Load Previous Progress
function loadUserProgress(uid) {
    db.collection('users').doc(uid).collection('progress').get().then(snap => {
        snap.forEach(doc => {
            const checkbox = document.querySelector(`.q-check[data-id="${doc.id}"]`);
            if (checkbox) checkbox.checked = doc.data().done;
        });
    });
}
