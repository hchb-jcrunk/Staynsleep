// Mock Data
let currentUser = null;
const rewards = [
    {
        id: 1,
        title: "Coworking Day Pass",
        type: "Business",
        cost: 500,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=60",
        description: "Access to premium coworking spaces in 50+ cities."
    },
    {
        id: 2,
        title: "Family Resort Night",
        type: "Leisure",
        cost: 2000,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=60",
        description: "One night stay at any of our family-friendly resorts."
    },
    {
        id: 3,
        title: "Airport Lounge Access",
        type: "Business",
        cost: 800,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=60",
        description: "Relax before your flight with complimentary food and drinks."
    },
    {
        id: 4,
        title: "Weekend Spa Package",
        type: "Leisure",
        cost: 1500,
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=500&q=60",
        description: "Full weekend access to spa facilities and treatments."
    }
];

// Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });

    // Show requested page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('active');
    }

    // Update Nav
    updateNav();

    // Render rewards if on the rewards page
    if (pageId === 'rewards') {
        renderRewards('public-rewards-list');
    }
}

function updateNav() {
    const loginBtn = document.getElementById('nav-login-btn');
    const logoutBtn = document.getElementById('nav-logout-btn');

    if (currentUser) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}

// Auth
function handleLogin(e) {
    e.preventDefault();
    // Mock Login
    currentUser = {
        name: "Jane Traveler",
        email: "jane@example.com",
        points: 1250
    };
    updateDashboard();
    showPage('dashboard');
}

function handleSignup(e) {
    e.preventDefault();
    // Mock Signup
    currentUser = {
        name: "New Member",
        email: "new@example.com",
        points: 500 // Sign up bonus
    };
    updateDashboard();
    showPage('dashboard');
}

function logout() {
    currentUser = null;
    showPage('landing');
}

// Dashboard
function updateDashboard() {
    if (!currentUser) return;

    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-points').textContent = currentUser.points;

    renderRewards('rewards-list');
}

function renderRewards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = rewards.map(reward => `
        <div class="reward-card">
            <div class="reward-img" style="background-image: url('${reward.image}')"></div>
            <div class="reward-info">
                <div class="reward-header">
                    <h4>${reward.title}</h4>
                    <span class="badge ${reward.type.toLowerCase()}">${reward.type}</span>
                </div>
                <p style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">${reward.description}</p>
                <span class="reward-cost">${reward.cost} Points</span>
                <button class="reward-btn" onclick="handleRewardClick(${reward.id})">
                    ${currentUser ? (currentUser.points >= reward.cost ? 'Redeem Now' : 'Not Enough Points') : 'Sign In to Redeem'}
                </button>
            </div>
        </div>
    `).join('');
}

function handleRewardClick(id) {
    if (!currentUser) {
        showPage('login');
        return;
    }
    redeemReward(id);
}

function redeemReward(id) {
    const reward = rewards.find(r => r.id === id);
    if (currentUser.points >= reward.cost) {
        currentUser.points -= reward.cost;
        alert(`Successfully redeemed: ${reward.title}! Check your email for the voucher.`);
        updateDashboard();
    } else {
        alert("You don't have enough points for this reward yet.");
    }
}

function simulateBooking() {
    const type = document.getElementById('trip-type').value;
    const pointsEarned = type === 'business' ? 500 : 200; // More points for business usually

    currentUser.points += pointsEarned;
    alert(`Booking Confirmed! You earned ${pointsEarned} points for your ${type} trip.`);
    updateDashboard();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    showPage('landing');
    renderRewards('public-rewards-list'); // Render public list on load
});
