import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const auth = window.firebaseAuth;
const db = window.firebaseDb;

// DOM Elements
const authContainer = document.getElementById('authContainer');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const authError = document.getElementById('authError');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupAuthListeners();
    setupFormListeners();
});

// ═══ Authentication ═══
function setupAuthListeners() {
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            showDashboard();
            loadPricingData();
        } else {
            showLoginForm();
        }
    });
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    try {
        authError.textContent = '';
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        authError.textContent = error.message;
        console.error('Login error:', error);
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Logout error:', error);
    }
}

function showLoginForm() {
    authContainer.style.display = 'flex';
    adminDashboard.style.display = 'none';
}

function showDashboard() {
    authContainer.style.display = 'none';
    adminDashboard.style.display = 'block';
}

// ═══ Pricing Forms ═══
function setupFormListeners() {
    document.querySelectorAll('.pricing-form').forEach(form => {
        form.addEventListener('submit', handleSavePricing);
    });
}

async function handleSavePricing(e) {
    e.preventDefault();
    
    const serviceId = this.dataset.service;
    const formData = new FormData(this);
    const inputs = this.querySelectorAll('input');
    
    const pricingData = {};
    inputs.forEach(input => {
        const fieldName = input.id.replace(new RegExp(`^${serviceId.replace(/-/g, '|')}`), '').replace(/^-/, '');
        pricingData[input.id.substring(serviceId.length + 1) || input.id] = input.value;
    });

    try {
        // Save to Firestore
        const pricingRef = doc(db, 'config', 'pricing');
        const currentData = await getDoc(pricingRef);
        const existingData = currentData.exists() ? currentData.data() : {};
        
        await setDoc(pricingRef, {
            ...existingData,
            [serviceId]: {
                frequency: this.querySelector('[id$="frequency"]')?.value || '',
                price: this.querySelector('[id$="price"]')?.value || '',
                updatedAt: new Date().toISOString()
            }
        });
        
        showToast(`✅ ${serviceId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} saved!`, 'success');
    } catch (error) {
        console.error('Save error:', error);
        showToast('❌ Error saving pricing', 'error');
    }
}

// ═══ Load Pricing Data ═══
async function loadPricingData() {
    try {
        const pricingRef = doc(db, 'config', 'pricing');
        const pricingDoc = await getDoc(pricingRef);
        
        if (pricingDoc.exists()) {
            const data = pricingDoc.data();
            
            // Office Cleaning
            if (data['office-cleaning']) {
                document.getElementById('office-frequency').value = data['office-cleaning'].frequency || '';
                document.getElementById('office-price').value = data['office-cleaning'].price || '';
            }
            
            // Body Corporate
            if (data['body-corporate']) {
                document.getElementById('corporate-frequency').value = data['body-corporate'].frequency || '';
                document.getElementById('corporate-price').value = data['body-corporate'].price || '';
            }
            
            // Medical Center
            if (data['medical-center']) {
                document.getElementById('medical-price').value = data['medical-center'].price || '';
            }
            
            // Restaurant
            if (data['restaurant']) {
                document.getElementById('restaurant-price').value = data['restaurant'].price || '';
            }
            
            // Carpet Cleaning
            if (data['carpet-cleaning']) {
                document.getElementById('carpet-price').value = data['carpet-cleaning'].price || '';
            }
            
            // Child Centre
            if (data['child-centre']) {
                document.getElementById('childcare-price').value = data['child-centre'].price || '';
            }
            
            // Common Area
            if (data['common-area']) {
                document.getElementById('common-price').value = data['common-area'].price || '';
            }
        }
    } catch (error) {
        console.error('Error loading pricing data:', error);
    }
}

// ═══ Toast Notifications ═══
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
