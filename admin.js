/* ============================================
   BRITOL GROUP — Admin Panel JavaScript
   Firebase Firestore Integration
   ============================================ */

// Import Firebase functions
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

import { 
  getDoc,
  setDoc,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// DOM Elements
const authContainer = document.getElementById('authContainer');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const authError = document.getElementById('authError');

const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');

const toast = document.getElementById('toast');

let auth, db;

// Initialize Firebase references
window.addEventListener('load', () => {
  auth = window.firebaseAuth;
  db = window.firebaseDb;

  // Check auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      showAdminDashboard();
      loadAllData();
    } else {
      showLoginForm();
    }
  });
});

/* ═══ Authentication ═══ */

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value;

  try {
    authError.textContent = '';
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    authError.textContent = error.message;
    authError.classList.add('show');
  }
});

// Handle Logout
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
});

function showLoginForm() {
  authContainer.style.display = 'flex';
  adminDashboard.style.display = 'none';
}

function showAdminDashboard() {
  authContainer.style.display = 'none';
  adminDashboard.style.display = 'flex';
}

/* ═══ Navigation ═══ */

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const section = item.dataset.section;

    // Update active nav item
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Update active section
    contentSections.forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${section}`).classList.add('active');
  });
});

/* ═══ Toast Notifications ═══ */

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ═══ SERVICES MANAGEMENT ═══ */

const addServiceBtn = document.getElementById('addServiceBtn');
const serviceModal = document.getElementById('serviceModal');
const serviceForm = document.getElementById('serviceForm');
const servicesGrid = document.getElementById('servicesGrid');

let currentServiceId = null;

// Open Add Service Modal
addServiceBtn.addEventListener('click', () => {
  currentServiceId = null;
  document.getElementById('serviceModalTitle').textContent = 'Add Service';
  document.getElementById('serviceId').value = '';
  serviceForm.reset();
  serviceModal.classList.add('active');
});

// Handle Service Form Submit
serviceForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const serviceData = {
    name: document.getElementById('serviceName').value.trim(),
    icon: document.getElementById('serviceIcon').value.trim(),
    description: document.getElementById('serviceDescription').value.trim(),
    image: document.getElementById('serviceImage').value.trim(),
    category: document.getElementById('serviceCategory').value.trim(),
    createdAt: new Date().toISOString()
  };

  try {
    if (currentServiceId) {
      // Update existing service
      const serviceRef = doc(db, 'config', 'services', currentServiceId);
      await updateDoc(serviceRef, serviceData);
      showToast('Service updated successfully!');
    } else {
      // Add new service
      const servicesRef = collection(db, 'config', 'services', '');
      const docRef = doc(collection(db, 'config'), 'services');
      const subcollectionRef = collection(docRef, 'items');
      const newDoc = doc(subcollectionRef);
      await setDoc(newDoc, serviceData);
      showToast('Service added successfully!');
    }

    serviceModal.classList.remove('active');
    await loadServices();
  } catch (error) {
    console.error('Error saving service:', error);
    showToast('Error saving service: ' + error.message, 'error');
  }
});

// Load Services
async function loadServices() {
  try {
    servicesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 32px;">Loading services...</p>';

    // Simplified approach: Store services as a single document
    const configRef = doc(db, 'config', 'services');
    const configSnap = await getDoc(configRef);

    let services = [];
    if (configSnap.exists()) {
      const data = configSnap.data();
      services = data.items || [];
    }

    if (services.length === 0) {
      servicesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 32px;">No services yet. Add your first service!</p>';
      return;
    }

    servicesGrid.innerHTML = services.map((service, index) => `
      <div class="service-card">
        <div class="service-card-header">
          <div class="service-icon-display">${service.icon || '🏢'}</div>
          <div class="service-card-title">${service.name}</div>
        </div>
        <p class="service-card-description">${service.description}</p>
        <div class="service-card-meta">
          ${service.category ? `<span class="meta-tag">${service.category}</span>` : ''}
          ${service.image ? `<span class="meta-tag">Has Image</span>` : ''}
        </div>
        <div class="service-card-actions">
          <button class="btn-edit" onclick="editService(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteService(${index})">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading services:', error);
    servicesGrid.innerHTML = `<p style="grid-column: 1/-1; color: red;">Error loading services: ${error.message}</p>`;
  }
}

// Edit Service
window.editService = async (index) => {
  try {
    const configRef = doc(db, 'config', 'services');
    const configSnap = await getDoc(configRef);
    const services = configSnap.data()?.items || [];
    const service = services[index];

    document.getElementById('serviceModalTitle').textContent = 'Edit Service';
    document.getElementById('serviceName').value = service.name;
    document.getElementById('serviceIcon').value = service.icon;
    document.getElementById('serviceDescription').value = service.description;
    document.getElementById('serviceImage').value = service.image || '';
    document.getElementById('serviceCategory').value = service.category || '';
    currentServiceId = index;

    serviceModal.classList.add('active');
  } catch (error) {
    showToast('Error loading service: ' + error.message, 'error');
  }
};

// Delete Service
window.deleteService = async (index) => {
  if (!confirm('Are you sure you want to delete this service?')) return;

  try {
    const configRef = doc(db, 'config', 'services');
    const configSnap = await getDoc(configRef);
    let services = configSnap.data()?.items || [];
    services.splice(index, 1);

    await setDoc(configRef, { items: services });
    showToast('Service deleted successfully!');
    await loadServices();
  } catch (error) {
    showToast('Error deleting service: ' + error.message, 'error');
  }
};

/* ═══ FORM FIELDS MANAGEMENT ═══ */

const formFieldsForm = document.getElementById('formFieldsForm');

formFieldsForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formFieldsData = {
    fullNameLabel: document.getElementById('fullNameLabel').value || 'Full Name',
    fullNamePlaceholder: document.getElementById('fullNamePlaceholder').value || 'John Smith',
    emailLabel: document.getElementById('emailLabel').value || 'Email Address',
    emailPlaceholder: document.getElementById('emailPlaceholder').value || 'john@example.com',
    phoneLabel: document.getElementById('phoneLabel').value || 'Phone Number',
    phonePlaceholder: document.getElementById('phonePlaceholder').value || '0405 585 505',
    serviceTypeLabel: document.getElementById('serviceTypeLabel').value || 'Service Type',
    propertyTypeLabel: document.getElementById('propertyTypeLabel').value || 'Property Type',
    detailsLabel: document.getElementById('detailsLabel').value || 'Additional Details',
    detailsPlaceholder: document.getElementById('detailsPlaceholder').value || 'Tell us more about your needs...',
    updatedAt: new Date().toISOString()
  };

  try {
    const configRef = doc(db, 'config', 'formFields');
    await setDoc(configRef, formFieldsData);
    showToast('Form fields saved successfully!');
  } catch (error) {
    showToast('Error saving form fields: ' + error.message, 'error');
  }
});

// Load Form Fields
async function loadFormFields() {
  try {
    const configRef = doc(db, 'config', 'formFields');
    const configSnap = await getDoc(configRef);

    if (configSnap.exists()) {
      const data = configSnap.data();
      document.getElementById('fullNameLabel').value = data.fullNameLabel || '';
      document.getElementById('fullNamePlaceholder').value = data.fullNamePlaceholder || '';
      document.getElementById('emailLabel').value = data.emailLabel || '';
      document.getElementById('emailPlaceholder').value = data.emailPlaceholder || '';
      document.getElementById('phoneLabel').value = data.phoneLabel || '';
      document.getElementById('phonePlaceholder').value = data.phonePlaceholder || '';
      document.getElementById('serviceTypeLabel').value = data.serviceTypeLabel || '';
      document.getElementById('propertyTypeLabel').value = data.propertyTypeLabel || '';
      document.getElementById('detailsLabel').value = data.detailsLabel || '';
      document.getElementById('detailsPlaceholder').value = data.detailsPlaceholder || '';
    }
  } catch (error) {
    console.error('Error loading form fields:', error);
  }
}

/* ═══ PROPERTY TYPES MANAGEMENT ═══ */

const addPropertyBtn = document.getElementById('addPropertyBtn');
const propertyModal = document.getElementById('propertyModal');
const propertyForm = document.getElementById('propertyForm');
const propertyTypesList = document.getElementById('propertyTypesList');

let currentPropertyId = null;

addPropertyBtn.addEventListener('click', () => {
  currentPropertyId = null;
  document.getElementById('propertyModalTitle').textContent = 'Add Property Type';
  document.getElementById('propertyId').value = '';
  propertyForm.reset();
  propertyModal.classList.add('active');
});

propertyForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const configRef = doc(db, 'config', 'propertyTypes');
    const configSnap = await getDoc(configRef);
    let propertyTypes = configSnap.exists() ? (configSnap.data().items || []) : [];

    const propertyData = {
      name: document.getElementById('propertyName').value.trim(),
      description: document.getElementById('propertyDescription').value.trim()
    };

    if (currentPropertyId !== null) {
      propertyTypes[currentPropertyId] = { ...propertyTypes[currentPropertyId], ...propertyData };
    } else {
      propertyTypes.push(propertyData);
    }

    await setDoc(configRef, { items: propertyTypes, updatedAt: new Date().toISOString() });
    showToast('Property type saved successfully!');
    propertyModal.classList.remove('active');
    await loadPropertyTypes();
  } catch (error) {
    showToast('Error saving property type: ' + error.message, 'error');
  }
});

async function loadPropertyTypes() {
  try {
    const configRef = doc(db, 'config', 'propertyTypes');
    const configSnap = await getDoc(configRef);

    let propertyTypes = [];
    if (configSnap.exists()) {
      propertyTypes = configSnap.data().items || [];
    }

    if (propertyTypes.length === 0) {
      propertyTypesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 32px;">No property types yet. Add your first one!</p>';
      return;
    }

    propertyTypesList.innerHTML = propertyTypes.map((property, index) => `
      <div class="property-type-card">
        <div class="property-type-name">${property.name}</div>
        <p class="property-type-desc">${property.description || 'No description'}</p>
        <div class="property-type-actions">
          <button class="btn-edit" onclick="editPropertyType(${index})">Edit</button>
          <button class="btn-delete" onclick="deletePropertyType(${index})">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading property types:', error);
  }
}

window.editPropertyType = async (index) => {
  try {
    const configRef = doc(db, 'config', 'propertyTypes');
    const configSnap = await getDoc(configRef);
    const propertyTypes = configSnap.data()?.items || [];
    const property = propertyTypes[index];

    document.getElementById('propertyModalTitle').textContent = 'Edit Property Type';
    document.getElementById('propertyName').value = property.name;
    document.getElementById('propertyDescription').value = property.description || '';
    currentPropertyId = index;

    propertyModal.classList.add('active');
  } catch (error) {
    showToast('Error loading property: ' + error.message, 'error');
  }
};

window.deletePropertyType = async (index) => {
  if (!confirm('Are you sure you want to delete this property type?')) return;

  try {
    const configRef = doc(db, 'config', 'propertyTypes');
    const configSnap = await getDoc(configRef);
    let propertyTypes = configSnap.data()?.items || [];
    propertyTypes.splice(index, 1);

    await setDoc(configRef, { items: propertyTypes, updatedAt: new Date().toISOString() });
    showToast('Property type deleted successfully!');
    await loadPropertyTypes();
  } catch (error) {
    showToast('Error deleting property: ' + error.message, 'error');
  }
};

/* ═══ BOOKING INFO MANAGEMENT ═══ */

const bookingInfoForm = document.getElementById('bookingInfoForm');

bookingInfoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookingData = {
    turnaroundTime: document.getElementById('turnaroundTime').value || '24-48 hours',
    minBookingTime: parseInt(document.getElementById('minBookingTime').value) || 1,
    availabilityHours: document.getElementById('availabilityHours').value || '08:00 AM - 05:00 PM',
    workingDays: document.getElementById('workingDays').value || 'Monday to Friday',
    quoteResponseTime: document.getElementById('quoteResponseTime').value || 'Within 24 hours',
    successMessage: document.getElementById('successMessage').value || 'Thank you for your quote request!',
    updatedAt: new Date().toISOString()
  };

  try {
    const configRef = doc(db, 'config', 'bookingInfo');
    await setDoc(configRef, bookingData);
    showToast('Booking info saved successfully!');
  } catch (error) {
    showToast('Error saving booking info: ' + error.message, 'error');
  }
});

async function loadBookingInfo() {
  try {
    const configRef = doc(db, 'config', 'bookingInfo');
    const configSnap = await getDoc(configRef);

    if (configSnap.exists()) {
      const data = configSnap.data();
      document.getElementById('turnaroundTime').value = data.turnaroundTime || '';
      document.getElementById('minBookingTime').value = data.minBookingTime || '';
      document.getElementById('availabilityHours').value = data.availabilityHours || '';
      document.getElementById('workingDays').value = data.workingDays || '';
      document.getElementById('quoteResponseTime').value = data.quoteResponseTime || '';
      document.getElementById('successMessage').value = data.successMessage || '';
    }
  } catch (error) {
    console.error('Error loading booking info:', error);
  }
}

/* ═══ Modal Management ═══ */

document.querySelectorAll('.modal-close, .btn-cancel').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal') || 
                 document.getElementById(e.target.dataset.modal);
    if (modal) {
      modal.classList.remove('active');
    }
  });
});

/* ═══ Load All Data ═══ */

async function loadAllData() {
  await loadServices();
  await loadFormFields();
  await loadPropertyTypes();
  await loadBookingInfo();
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});
