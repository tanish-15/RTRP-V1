// --------------------------------------------------------------
// 1. CONFIGURATION
// --------------------------------------------------------------
// PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  //YOUR FIREBASE CONFIG HERE
};
let myChart=null;

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
const filterDropdown = document.getElementById('companyFilter');
const tableBody = document.getElementById('questionsTable');

// --------------------------------------------------------------
// 2. AUTHENTICATION & STATE MANAGEMENT
// --------------------------------------------------------------
const authBtn = document.getElementById('authBtn');
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');

auth.onAuthStateChanged(user => {
    if (user) {
        // User just logged IN
        console.log("User logged in:", user.uid);
        
        // 1. Update UI
        authBtn.innerText = "Logout";
        loginView.classList.add('hidden');
        dashboardView.classList.remove('hidden');

        // 2. CLEAR old data (from previous user)
        resetUI();

        // 3. LOAD saved data (The Persistence!)
        loadUserProfile(user.uid);
        loadUserProgress(user.uid);

    } else {
        // User just logged OUT
        console.log("User logged out");
        authBtn.innerText = "Login with Google";
        loginView.classList.remove('hidden');
        dashboardView.classList.add('hidden');
        resetUI();
    }
});

authBtn.addEventListener('click', () => {
    if (auth.currentUser) {
        auth.signOut();
    } else {
        auth.signInWithPopup(provider);
    }
});

function renderChart(easy, medium, hard) {
    const ctx = document.getElementById('prepChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'doughnut', // You can also use 'bar' or 'pie'
        data: {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{
                label: 'Questions Solved',
                data: [easy, medium, hard],
                backgroundColor: [
                    '#2ECC40', // Green for Easy
                    '#FF851B', // Orange for Medium
                    '#FF4136'  // Red for Hard
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}
// Helper: Wipes the screen clean
function resetUI() {
    document.getElementById('lcUsername').value = "";
    document.getElementById('easyVal').innerText = "0";
    document.getElementById('medVal').innerText = "0";
    document.getElementById('hardVal').innerText = "0";
    document.getElementById('totalScore').innerText = "0";
    document.getElementById('feedbackText').innerText = "--";
    document.getElementById('statsDisplay').classList.add('hidden');
    
    // Uncheck all boxes
    document.querySelectorAll('.q-check').forEach(box => box.checked = false);
}

// --------------------------------------------------------------
// 3. LEETCODE STATS (FETCH + SAVE)
// --------------------------------------------------------------
document.getElementById('fetchBtn').addEventListener('click', async () => {
    const username = document.getElementById('lcUsername').value;
    if (!username) return alert("Enter a username!");

    const btn = document.getElementById('fetchBtn');
    btn.innerText = "Fetching...";

    try {
        // 1. Fetch from API
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await res.json();

        if (data.status === 'error') throw new Error("User not found");

        // 2. Update the Screen
        updateStatsUI(data.easySolved, data.mediumSolved, data.hardSolved);

        // 3. SAVE to Database (Long Term Storage)
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            db.collection('users').doc(userId).set({
                leetcode_username: username,
                stats: {
                    easy: data.easySolved,
                    medium: data.mediumSolved,
                    hard: data.hardSolved
                },
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true }); // Merge ensures we don't overwrite other fields
            console.log("Stats saved to DB");
        }

    } catch (e) {
        alert(e.message);
    } finally {
        btn.innerText = "Fetch Stats";
    }
});

// Helper: Updates the HTML numbers and Score
function updateStatsUI(easy, medium, hard) {
    document.getElementById('easyVal').innerText = easy;
    document.getElementById('medVal').innerText = medium;
    document.getElementById('hardVal').innerText = hard;
    document.getElementById('statsDisplay').classList.remove('hidden');

    // The Formula
    const score = (easy * 1) + (medium * 3) + (hard * 5);
    document.getElementById('totalScore').innerText = score;

    const fb = document.getElementById('feedbackText');
    if (score > 400) { fb.innerText = "🔥 Strong Portfolio"; fb.style.color = "green"; }
    else { fb.innerText = "⚠️ Needs Improvement"; fb.style.color = "orange"; }
    renderChart(easy, medium, hard);
}

// --------------------------------------------------------------
// 4. CHECKBOXES (SAVE + LOAD)
// --------------------------------------------------------------

// Save Checkbox Click (Delegated to tableBody)
document.getElementById('questionsTable').addEventListener('change', (e) => {
    if (e.target.classList.contains('q-check')) {
        const qId = e.target.getAttribute('data-id');
        const isChecked = e.target.checked;

        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            db.collection('users').doc(userId).collection('progress').doc(qId).set({
                done: isChecked
            }).then(() => {
                console.log(`Question ${qId} saved: ${isChecked}`);
            });
        }
    }
});

// --------------------------------------------------------------
// 5. DATABASE LOADERS & DYNAMIC TABLE
// --------------------------------------------------------------

// Function A: Load Username & Stats
function loadUserProfile(uid) {
    db.collection('users').doc(uid).get().then(doc => {
        if (doc.exists) {
            const data = doc.data();
            if (data.leetcode_username) {
                document.getElementById('lcUsername').value = data.leetcode_username;
            }
            if (data.stats) {
                updateStatsUI(data.stats.easy, data.stats.medium, data.stats.hard);
            }
        }
    });
}

// Function B: Load Checkboxes from Firestore
function loadUserProgress(uid) {
    db.collection('users').doc(uid).collection('progress').get().then(snapshot => {
        snapshot.forEach(doc => {
            const qId = doc.id;
            const isDone = doc.data().done;
            const checkbox = document.querySelector(`.q-check[data-id="${qId}"]`);
            if (checkbox) {
                checkbox.checked = isDone;
            }
        });
    });
}

// Function to build the Table dynamically
function renderTable(filter = "All") {
    const tableContainer = document.getElementById('questionsTable');
    if (!tableContainer) return;
    
    tableContainer.innerHTML = ""; 

    const dataSource = (typeof practiceData !== 'undefined') ? practiceData : blind75Data;

    dataSource.forEach(q => {
        if (filter === "All" || q.company === filter) {
            let diffColor;
            let textColor = (q.difficulty === "Medium") ? "black" : "white";
            
            if (q.difficulty === "Easy") diffColor = "#2ECC40";      // Green
            else if (q.difficulty === "Medium") diffColor = "#FFDC00"; // Yellow
            else if (q.difficulty === "Hard") diffColor = "#FF4136";   // Red
            else diffColor = "#AAAAAA";                                

            const row = `
                <tr>
                    <td><input type="checkbox" class="q-check" data-id="${q.id}"></td>
                    <td>
                        <strong>${q.title}</strong> 
                        <span class="company-tag" style="background-color: ${diffColor}; color: ${textColor};">
                            ${q.difficulty}
                        </span>
                    </td>
                    <td><code style="background: #eee; padding: 2px 5px;">${q.topic || 'General'}</code></td>
                    <td>${q.company}</td>
                    <td><a href="${q.url}" target="_blank" class="button">Solve</a></td>
                </tr>
            `;
            tableContainer.innerHTML += row;
        }
    });

    if (auth.currentUser) loadUserProgress(auth.currentUser.uid);
}

// --------------------------------------------------------------
// 6. INITIALIZATION & LISTENERS
// --------------------------------------------------------------

//Listener for the dropdown
filterDropdown.addEventListener('change', (e) => {
    renderTable(e.target.value);
});

renderTable();
