/* ============================================
   BRITOL GROUP — Firestore Integration
   Loads admin config and updates contact form
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
import { FirestoreConfigLoader } from "./firestore-config.js";

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

// Initialize Config Loader
const configLoader = new FirestoreConfigLoader(db);

// Load config when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load all config from Firestore
    await configLoader.loadConfig();

    // Update contact form with admin-configured values
    configLoader.updateContactForm('quoteForm');

    // Populate service dropdown
    configLoader.populateServiceDropdown('quoteService');

    console.log('✓ Firestore config integrated successfully');
  } catch (error) {
    console.warn('Error loading Firestore config:', error);
    // Form will use default placeholders if Firestore fails
  }
});

// Make config accessible globally
window.firestoreConfig = configLoader;
