/* ============================================
   BRITOL GROUP — Pricing Loader
   Loads admin-configured pricing from Firestore
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBieVXcXbIk7t1t-otDBjOv7WWKSbGDD3s",
  authDomain: "britoldata.firebaseapp.com",
  projectId: "britoldata",
  storageBucket: "britoldata.firebasestorage.app",
  messagingSenderId: "513106279152",
  appId: "1:513106279152:web:acfad41ac3be94a58ee035",
  measurementId: "G-4CSDHVYKY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Service name mapping: data attribute -> Firebase key
const serviceMapping = {
  'office': 'office-cleaning',
  'bodycorp': 'body-corporate',
  'medical': 'medical-center',
  'restaurant': 'restaurant',
  'carpet': 'carpet-cleaning',
  'childcare': 'child-centre'
};

// Load pricing on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadAndUpdatePricing();
    console.log('✓ Pricing updated from Firestore');
  } catch (error) {
    console.warn('Could not load pricing from Firestore, using defaults');
  }
});

async function loadAndUpdatePricing() {
  // Load pricing document from Firestore
  const pricingRef = doc(db, 'config', 'pricing');
  const pricingDoc = await getDoc(pricingRef);

  if (!pricingDoc.exists()) {
    console.warn('Pricing document not found in Firestore');
    return;
  }

  const pricingData = pricingDoc.data();

  // Update each service card with pricing
  const serviceCards = document.querySelectorAll('.sm-svc-card');
  
  serviceCards.forEach(card => {
    const serviceKey = card.dataset.svc;
    const firebaseKey = serviceMapping[serviceKey];
    
    if (firebaseKey && pricingData[firebaseKey]) {
      const pricing = pricingData[firebaseKey];
      const priceEl = card.querySelector('.svc-price');
      
      if (priceEl) {
        let priceText = '';
        
        // For services with frequency (office, bodycorp)
        if (firebaseKey === 'office-cleaning' || firebaseKey === 'body-corporate') {
          if (pricing.frequency && pricing.price) {
            // Format: "2× weekly · $200/wk excl. GST"
            priceText = `${pricing.frequency} · ${pricing.price}/wk excl. GST`;
          } else if (pricing.frequency) {
            priceText = `${pricing.frequency} · quote on request`;
          } else if (pricing.price) {
            priceText = `${pricing.price}/wk excl. GST`;
          } else {
            priceText = 'quote on request';
          }
        } 
        // For services without frequency (medical, restaurant, carpet, childcare)
        else {
          if (pricing.price) {
            priceText = pricing.price;
          } else {
            priceText = 'quote on request';
          }
        }
        
        priceEl.textContent = priceText;
      }
    }
  });
}

// Make globally available
window.pricingLoader = { loadAndUpdatePricing };
