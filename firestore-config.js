/* ============================================
   BRITOL GROUP — Firestore Config Loader
   Fetches admin-configured values from Firestore
   ============================================ */

import { getDoc, doc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// Default fallback values (in case Firestore is not available)
const DEFAULT_CONFIG = {
  services: [
    {
      name: "Office Cleaning",
      icon: "🏢",
      description: "Keep your workspace immaculate with our comprehensive office cleaning services. We handle everything from desks to floors.",
      image: "images/office-cleaning.png",
      category: "Commercial"
    },
    {
      name: "Medical Centre Cleaning",
      icon: "🏥",
      description: "Stringent sanitation protocols for clinics and healthcare facilities, meeting the highest hygiene standards.",
      image: "images/medical-cleaning.png",
      category: "Healthcare"
    },
    {
      name: "Carpet Cleaning",
      icon: "🧹",
      description: "Deep steam cleaning and stain removal to restore your carpets to their original glory. Fresh and allergen-free.",
      image: "images/carpet-cleaning.png",
      category: "Specialized"
    },
    {
      name: "Body Corporate & Strata Cleaning",
      icon: "🏘️",
      description: "Professional common area maintenance for residential and commercial strata properties across Melbourne.",
      image: "images/retail-cleaning.png",
      category: "Commercial"
    },
    {
      name: "Childcare Centre Cleaning",
      icon: "🧒",
      description: "Safe, non-toxic cleaning for early learning centres. We use child-safe products to protect little ones.",
      image: "images/childcare-cleaning.png",
      category: "Specialized"
    },
    {
      name: "Retail & Common Area Cleaning",
      icon: "🛍️",
      description: "Inviting, spotless retail spaces that make a great impression on every customer who walks through the door.",
      image: "images/retail-cleaning.png",
      category: "Commercial"
    }
  ],
  formFields: {
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "John Smith",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "0405 585 505",
    serviceTypeLabel: "Service Type",
    propertyTypeLabel: "Property Type",
    detailsLabel: "Additional Details",
    detailsPlaceholder: "Tell us more about your needs..."
  },
  propertyTypes: [
    { name: "Office", description: "Commercial office space" },
    { name: "Medical Centre", description: "Healthcare facility" },
    { name: "Retail Store", description: "Retail or commercial space" },
    { name: "Childcare Centre", description: "Childcare or educational facility" },
    { name: "Residential", description: "Residential property" }
  ],
  bookingInfo: {
    turnaroundTime: "24-48 hours",
    minBookingTime: 1,
    availabilityHours: "08:00 AM - 05:00 PM",
    workingDays: "Monday to Friday",
    quoteResponseTime: "Within 24 hours",
    successMessage: "Thank you for your quote request! We'll get back to you within 24 hours."
  }
};

class FirestoreConfigLoader {
  constructor(db) {
    this.db = db;
    this.config = JSON.parse(JSON.stringify(DEFAULT_CONFIG)); // Deep copy
    this.loaded = false;
  }

  /**
   * Load all configuration from Firestore
   */
  async loadConfig() {
    try {
      // Load services
      const servicesRef = doc(this.db, 'config', 'services');
      const servicesSnap = await getDoc(servicesRef);
      if (servicesSnap.exists()) {
        this.config.services = servicesSnap.data().items || this.config.services;
      }

      // Load form fields
      const formFieldsRef = doc(this.db, 'config', 'formFields');
      const formFieldsSnap = await getDoc(formFieldsRef);
      if (formFieldsSnap.exists()) {
        this.config.formFields = formFieldsSnap.data();
      }

      // Load property types
      const propertyTypesRef = doc(this.db, 'config', 'propertyTypes');
      const propertyTypesSnap = await getDoc(propertyTypesRef);
      if (propertyTypesSnap.exists()) {
        this.config.propertyTypes = propertyTypesSnap.data().items || this.config.propertyTypes;
      }

      // Load booking info
      const bookingInfoRef = doc(this.db, 'config', 'bookingInfo');
      const bookingInfoSnap = await getDoc(bookingInfoRef);
      if (bookingInfoSnap.exists()) {
        this.config.bookingInfo = bookingInfoSnap.data();
      }

      this.loaded = true;
      console.log('✓ Firestore config loaded successfully');
      return this.config;
    } catch (error) {
      console.warn('Could not load Firestore config, using defaults:', error.message);
      this.loaded = true;
      return this.config;
    }
  }

  /**
   * Get all services
   */
  getServices() {
    return this.config.services;
  }

  /**
   * Get form field labels and placeholders
   */
  getFormFields() {
    return this.config.formFields;
  }

  /**
   * Get property types
   */
  getPropertyTypes() {
    return this.config.propertyTypes;
  }

  /**
   * Get booking info
   */
  getBookingInfo() {
    return this.config.bookingInfo;
  }

  /**
   * Get single service by name
   */
  getServiceByName(name) {
    return this.config.services.find(s => s.name.toLowerCase() === name.toLowerCase());
  }

  /**
   * Update contact form with admin-configured labels
   */
  updateContactForm(formId = 'quoteForm') {
    const form = document.getElementById(formId);
    if (!form) return;

    const ff = this.config.formFields;
    const fields = {
      quoteName: { label: ff.fullNameLabel, placeholder: ff.fullNamePlaceholder },
      quoteEmail: { label: ff.emailLabel, placeholder: ff.emailPlaceholder },
      quotePhone: { label: ff.phoneLabel, placeholder: ff.phonePlaceholder }
    };

    Object.entries(fields).forEach(([fieldId, config]) => {
      const input = form.querySelector(`#${fieldId}`);
      const label = form.querySelector(`label[for="${fieldId}"]`);
      if (input) input.placeholder = config.placeholder;
      if (label) label.textContent = config.label + ' *';
    });
  }

  /**
   * Populate service dropdown
   */
  populateServiceDropdown(selectId = 'quoteService') {
    const select = document.querySelector(`#${selectId}`);
    if (!select) return;

    const ff = this.config.formFields;
    select.innerHTML = `<option value="">-- ${ff.serviceTypeLabel} --</option>`;

    this.config.services.forEach(service => {
      const option = document.createElement('option');
      option.value = service.name;
      option.textContent = service.name;
      select.appendChild(option);
    });
  }

  /**
   * Populate property type dropdown
   */
  populatePropertyTypeDropdown(selectId = 'quoteProperty') {
    const select = document.querySelector(`#${selectId}`);
    if (!select) return;

    const ff = this.config.formFields;
    select.innerHTML = `<option value="">-- ${ff.propertyTypeLabel} --</option>`;

    this.config.propertyTypes.forEach(property => {
      const option = document.createElement('option');
      option.value = property.name;
      option.textContent = property.name;
      select.appendChild(option);
    });
  }

  /**
   * Update services grid on page
   */
  updateServicesGrid(gridId = 'servicesGrid') {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = this.config.services.map(service => `
      <div class="service-card">
        <div class="service-card-img">
          <img src="${service.image || 'images/placeholder.png'}" alt="${service.name}" loading="lazy" />
          <div class="service-icon">${service.icon || '🏢'}</div>
        </div>
        <div class="service-card-body">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * Get booking info for display
   */
  displayBookingInfo() {
    const bi = this.config.bookingInfo;
    return {
      turnaroundTime: bi.turnaroundTime,
      minBookingTime: bi.minBookingTime,
      availabilityHours: bi.availabilityHours,
      workingDays: bi.workingDays,
      quoteResponseTime: bi.quoteResponseTime,
      successMessage: bi.successMessage
    };
  }
}

// Export for use in other scripts
window.FirestoreConfigLoader = FirestoreConfigLoader;

// Make it available globally
export { FirestoreConfigLoader };
