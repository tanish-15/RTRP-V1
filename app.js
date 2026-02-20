// --------------------------------------------------------------
// 1. CONFIGURATION
// --------------------------------------------------------------
const firebaseConfig = {
  //YOUR FIREBASE CONFIG HERE
};

let myChart = null;
let activityChart = null;

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// UI Elements
const filterDropdown = document.getElementById('companyFilter');
const tableBody = document.getElementById('questionsTable');
const authBtn = document.getElementById('authBtn');
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');

// UI Toggles
const usernameSection = document.getElementById('usernameSection');
const welcomeSection = document.getElementById('welcomeSection');
const displayUser = document.getElementById('displayUser');
const changeUserBtn = document.getElementById('changeUserBtn');
const themeToggle = document.getElementById('themeToggle');

// --------------------------------------------------------------
// 2. AUTHENTICATION & AUTO-FETCH
// --------------------------------------------------------------
auth.onAuthStateChanged(user => {
    if (user) {
        authBtn.innerText = "Logout";
        loginView.classList.add('hidden');
        dashboardView.classList.remove('hidden');
        
        document.querySelectorAll('.q-check').forEach(b => b.checked = false);
        
        checkAndAutoFetch(user.uid);
        loadUserProgress(user.uid);
    } else {
        authBtn.innerText = "Login with Google";
        loginView.classList.remove('hidden');
        dashboardView.classList.add('hidden');
        resetUI();
    }
});

async function checkAndAutoFetch(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists && doc.data().leetcode_username) {
            const username = doc.data().leetcode_username;
            usernameSection.classList.add('hidden');
            welcomeSection.classList.remove('hidden');
            displayUser.innerText = username;
            fetchLeetCodeData(username);
        } else {
            usernameSection.classList.remove('hidden');
            welcomeSection.classList.add('hidden');
        }
    } catch (e) {
        console.error("Profile check failed:", e);
    }
}

authBtn.addEventListener('click', () => {
    auth.currentUser ? auth.signOut() : auth.signInWithPopup(provider);
});

if(changeUserBtn) {
    changeUserBtn.addEventListener('click', () => {
        welcomeSection.classList.add('hidden');
        usernameSection.classList.remove('hidden');
    });
}

// --------------------------------------------------------------
// 3. CHART RENDERING (THEME AWARE)
// --------------------------------------------------------------
function getChartTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    return {
        text: isDark ? '#d7dadc' : '#666',
        grid: isDark ? '#444' : '#ddd'
    };
}

function renderChart(easy, medium, hard) {
    const ctx = document.getElementById('prepChart').getContext('2d');
    const theme = getChartTheme();
    
    if (myChart instanceof Chart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{ 
                data: [easy, medium, hard], 
                backgroundColor: ['#2ECC40', '#FF851B', '#FF4136'] 
            }]
        },
        options: {
            plugins: {
                legend: { labels: { color: theme.text } }
            }
        }
    });
}

function updateActivityGraph(submissionCalendar) {
    if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) return;

    const theme = getChartTheme();
    const last7Days = [];
    const submissionCounts = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        d.setHours(0, 0, 0, 0); 
        last7Days.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));

        const dayStart = Math.floor(d.getTime() / 1000);
        const dayEnd = dayStart + 86400;

        let dayCount = 0;
        for (const [timestamp, count] of Object.entries(submissionCalendar)) {
            const ts = parseInt(timestamp);
            if (ts >= dayStart && ts < dayEnd) dayCount += count;
        }
        submissionCounts.push(dayCount);
    }

    const ctx = document.getElementById('activityChart').getContext('2d');
    if (activityChart instanceof Chart) activityChart.destroy();

    activityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Submissions',
                data: submissionCounts,
                borderColor: '#0074D9',
                backgroundColor: 'rgba(0, 116, 217, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: theme.text } } },
            scales: { 
                y: { 
                    beginAtZero: true, 
                    ticks: { color: theme.text, stepSize: 1 },
                    grid: { color: theme.grid }
                },
                x: {
                    ticks: { color: theme.text },
                    grid: { color: theme.grid }
                }
            }
        }
    });
}

// --------------------------------------------------------------
// 4. DATA FETCHING
// --------------------------------------------------------------
async function fetchLeetCodeData(username) {
    const btn = document.getElementById('fetchBtn');
    const originalText = btn.innerText;
    btn.innerText = "Syncing...";

    try {
        const res = await fetch(`https://leetcode-stats-api.vercel.app/${username}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();

        updateStatsUI(data.easySolved, data.mediumSolved, data.hardSolved);
        if (data.submissionCalendar) updateActivityGraph(data.submissionCalendar);

        usernameSection.classList.add('hidden');
        welcomeSection.classList.remove('hidden');
        displayUser.innerText = username;

        if (auth.currentUser) {
            db.collection('users').doc(auth.currentUser.uid).set({
                leetcode_username: username,
                stats: data,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        }
    } catch (e) {
        if (document.activeElement === btn) alert("LeetCode user not found!");
    } finally {
        btn.innerText = originalText;
    }
}

document.getElementById('fetchBtn').addEventListener('click', () => {
    const username = document.getElementById('lcUsername').value.trim();
    if (username) fetchLeetCodeData(username);
});

function updateStatsUI(easy, medium, hard) {
    document.getElementById('easyVal').innerText = easy;
    document.getElementById('medVal').innerText = medium;
    document.getElementById('hardVal').innerText = hard;
    document.getElementById('statsDisplay').classList.remove('hidden');

    const score = (easy * 1) + (medium * 3) + (hard * 5);
    document.getElementById('totalScore').innerText = score;

    const fb = document.getElementById('feedbackText');
    fb.innerText = score > 400 ? "🔥 Strong Portfolio" : "⚠️ Needs Improvement";
    fb.style.color = score > 400 ? "green" : "orange";
    
    renderChart(easy, medium, hard);
}

// --------------------------------------------------------------
// 5. TABLE & PROGRESS
// --------------------------------------------------------------
function loadUserProgress(uid) {
    db.collection('users').doc(uid).collection('progress').get().then(snapshot => {
        snapshot.forEach(doc => {
            const checkbox = document.querySelector(`.q-check[data-id="${doc.id}"]`);
            if (checkbox) checkbox.checked = doc.data().done;
        });
    });
}

document.getElementById('questionsTable').addEventListener('change', (e) => {
    if (e.target.classList.contains('q-check') && auth.currentUser) {
        db.collection('users').doc(auth.currentUser.uid).collection('progress').doc(e.target.getAttribute('data-id')).set({
            done: e.target.checked
        });
    }
});

function renderTable(filter = "All") {
    const tableContainer = document.getElementById('questionsTable');
    tableContainer.innerHTML = ""; 
    const dataSource = (typeof practiceData !== 'undefined') ? practiceData : [];
    
    dataSource.forEach(q => {
        if (filter === "All" || q.company === filter) {
            let diffBg = q.difficulty === "Easy" ? "#2ECC40" : q.difficulty === "Medium" ? "#FFDC00" : "#FF4136";
            let diffText = q.difficulty === "Medium" ? "black" : "white";

            tableContainer.innerHTML += `<tr>
                <td><input type="checkbox" class="q-check" data-id="${q.id}"></td>
                <td><strong>${q.title}</strong> <span class="company-tag" style="background-color: ${diffBg}; color: ${diffText};">${q.difficulty}</span></td>
                <td><code>${q.topic || 'General'}</code></td>
                <td>${q.company}</td>
                <td><a href="${q.url}" target="_blank" class="button">Solve</a></td>
            </tr>`;
        }
    });
    if (auth.currentUser) loadUserProgress(auth.currentUser.uid);
}

// --------------------------------------------------------------
// 6. NIGHT MODE & UI HELPERS
// --------------------------------------------------------------
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerText = "☀️";
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerText = isDark ? "☀️" : "🌙";

   
    const easy = parseInt(document.getElementById('easyVal').innerText) || 0;
    const medium = parseInt(document.getElementById('medVal').innerText) || 0;
    const hard = parseInt(document.getElementById('hardVal').innerText) || 0;
    renderChart(easy, medium, hard);
    
    
});

function resetUI() {
    const lcInput = document.getElementById('lcUsername');
    if(lcInput) lcInput.value = "";
    document.querySelectorAll('.q-check').forEach(b => b.checked = false);
    document.getElementById('statsDisplay').classList.add('hidden');
}

filterDropdown.addEventListener('change', (e) => renderTable(e.target.value));
renderTable();
