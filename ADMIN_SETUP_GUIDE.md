# Britol Group - Admin Panel Setup Guide

## 📋 Overview

This admin panel allows you to manage all editable values on the "Schedule a Cleaning" contact form and services page without touching the code. All values are stored in Firebase Firestore and can be updated in real-time.

---

## 🚀 Quick Start

### 1. **Access Admin Panel**
Navigate to: `https://yoursite.com/admin.html`

### 2. **Login**
Use Firebase Authentication credentials (email/password setup required)

### 3. **Manage Content**
- Services
- Form Field Labels & Placeholders
- Property Types
- Booking Information

---

## 🔧 Setup Instructions

### Step 1: Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one: **"britoldata"**
3. Enable these services:
   - Authentication (Email/Password)
   - Firestore Database

### Step 2: Create Firestore Collections

In Firestore, create the following structure:

```
firestore (database)
└── config (collection)
    ├── services (document)
    │   └── items (array of service objects)
    ├── formFields (document)
    ├── propertyTypes (document)
    │   └── items (array of property type objects)
    └── bookingInfo (document)
```

### Step 3: Create Admin User

1. Go to Firebase Console → Authentication
2. Click "Create user"
3. Email: `admin@britolgroup.com.au`
4. Password: `[Strong password]`
5. Save credentials securely

### Step 4: Database Security Rules

Set Firestore security rules to require authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read for everyone (public access)
    match /{document=**} {
      allow read;
    }
    
    // Restrict write to authenticated users only
    match /config/{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📁 Firestore Data Structure

### 1. Services Document

**Location:** `/config/services`

```json
{
  "items": [
    {
      "name": "Office Cleaning",
      "icon": "🏢",
      "description": "Keep your workspace immaculate...",
      "image": "images/office-cleaning.png",
      "category": "Commercial"
    },
    // ... more services
  ]
}
```

### 2. Form Fields Document

**Location:** `/config/formFields`

```json
{
  "fullNameLabel": "Full Name",
  "fullNamePlaceholder": "John Smith",
  "emailLabel": "Email Address",
  "emailPlaceholder": "john@example.com",
  "phoneLabel": "Phone Number",
  "phonePlaceholder": "0405 585 505",
  "serviceTypeLabel": "Service Type",
  "propertyTypeLabel": "Property Type",
  "detailsLabel": "Additional Details",
  "detailsPlaceholder": "Tell us more about your needs...",
  "updatedAt": "2026-04-27T12:00:00Z"
}
```

### 3. Property Types Document

**Location:** `/config/propertyTypes`

```json
{
  "items": [
    {
      "name": "Office",
      "description": "Commercial office space"
    },
    {
      "name": "Medical Centre",
      "description": "Healthcare facility"
    },
    // ... more property types
  ]
}
```

### 4. Booking Info Document

**Location:** `/config/bookingInfo`

```json
{
  "turnaroundTime": "24-48 hours",
  "minBookingTime": 1,
  "availabilityHours": "08:00 AM - 05:00 PM",
  "workingDays": "Monday to Friday",
  "quoteResponseTime": "Within 24 hours",
  "successMessage": "Thank you for your quote request!",
  "updatedAt": "2026-04-27T12:00:00Z"
}
```

---

## 🎯 Admin Panel Features

### Services Management
**Manage:** Service names, icons, descriptions, images, categories

**Actions:**
- ✅ Add new service
- ✅ Edit existing service
- ✅ Delete service
- ✅ View all services in grid

**Fields:**
- Service Name (required)
- Icon/Emoji (required)
- Description (required)
- Image URL (optional)
- Category (optional)

### Form Fields Management
**Manage:** Form label text and placeholder values

**Editable Fields:**
- Full Name Label & Placeholder
- Email Label & Placeholder
- Phone Label & Placeholder
- Service Type Label
- Property Type Label
- Additional Details Label & Placeholder

**Impact:** Updates form on public website in real-time

### Property Types Management
**Manage:** Available property types for dropdown

**Actions:**
- ✅ Add new property type
- ✅ Edit property type
- ✅ Delete property type

**Fields:**
- Property Type Name (required)
- Description (optional)

### Booking Info Management
**Manage:** Booking-related information

**Editable Fields:**
- Turnaround Time (e.g., "24-48 hours")
- Minimum Booking Time (days)
- Availability Hours (e.g., "08:00 AM - 05:00 PM")
- Working Days (comma-separated)
- Quote Response Time
- Success Message (after form submission)

---

## 🔗 File Structure

```
britol/
├── admin.html                 ← Admin panel interface
├── admin.css                  ← Admin panel styling
├── admin.js                   ← Admin panel logic & Firestore operations
├── firestore-config.js        ← Config loader class
├── firestore-integration.js   ← Integration with public website
├── index.html                 ← Updated to load Firestore config
└── ...other files
```

---

## 📊 How It Works

### Data Flow

```
1. Admin makes changes in /admin.html
           ↓
2. Data saved to Firestore (/config/*)
           ↓
3. Public website loads firestore-integration.js
           ↓
4. firestore-config.js fetches data from Firestore
           ↓
5. Contact form updated with admin values
           ↓
6. Dropdowns populated dynamically
           ↓
7. Users see latest configuration
```

---

## 🛠️ Customization Guide

### Add New Admin Field

1. **In Firestore:**
   - Add new field to appropriate document

2. **In admin.html:**
   - Add form input for new field

3. **In admin.js:**
   - Add form field handling in submit event
   - Add data load logic in load function

4. **In firestore-config.js:**
   - Add getter method
   - Add display/update method if needed

### Modify Service Fields

To add a new field to services (e.g., price, duration):

1. **admin.html** - Add input field in service form
2. **admin.js** - Include in `serviceData` object
3. **firestore-config.js** - Update `updateServicesGrid()` method
4. **index.html** - Update service card display

---

## 🔐 Security Best Practices

### 1. **Protect Admin Password**
- Use a strong password (20+ characters)
- Store in password manager
- Never share credentials

### 2. **Firestore Security Rules**
- Only authenticated users can write to `/config/*`
- Public users can read all data
- Regularly review access logs

### 3. **Backup Data**
- Export Firestore data regularly
- Store backups securely
- Test restore procedures

### 4. **Monitor Changes**
- Firebase provides audit logs
- Review who made changes and when
- Set alerts for suspicious activity

---

## 🐛 Troubleshooting

### Admin Panel Not Loading
- Check Firebase credentials in admin.html
- Verify Firestore is enabled
- Check browser console for errors

### Form Not Updating
- Verify firestore-integration.js is loading
- Check Firestore collection structure
- Confirm data exists in `/config/formFields`

### Dropdowns Empty
- Check `/config/services` and `/config/propertyTypes` exist
- Verify `items` array is populated
- Check browser console for Firestore errors

### Changes Not Appearing
- Hard refresh website (Ctrl+Shift+R)
- Check if Firestore data actually updated
- Verify security rules allow reads

---

## 📱 Mobile Access

Admin panel is responsive and works on tablets/phones:
- Sidebar converts to horizontal tabs on small screens
- Forms stack vertically
- All functionality available on mobile

---

## 🔄 Real-Time Updates

### How It Works
- Public website fetches Firestore data on page load
- Changes made in admin panel are saved immediately
- Users see updated values when they refresh the page

### For Instant Updates
Add this to `firestore-integration.js` to listen for real-time changes:

```javascript
import { onSnapshot } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const configRef = doc(db, 'config', 'services');
onSnapshot(configRef, (doc) => {
  if (doc.exists()) {
    configLoader.config.services = doc.data().items;
    configLoader.updateServicesGrid();
  }
});
```

---

## 📋 Default Values

If Firestore fails or has no data, the website uses these defaults:

**Services:** 6 default services (Office, Medical, Carpet, etc.)

**Form Fields:** Standard English labels

**Property Types:** 5 common types (Office, Medical, Retail, Childcare, Residential)

**Booking Info:** 
- Turnaround: 24-48 hours
- Availability: 08:00 AM - 05:00 PM
- Response: Within 24 hours

---

## 💡 Tips & Tricks

### 1. **Bulk Updates**
- Update form fields all at once
- Changes apply to all pages instantly

### 2. **Service Icons**
- Use Unicode emojis (🏢 🏥 🧹 etc.)
- Or use emoji code (e.g., `&#127379;`)

### 3. **Image URLs**
- Use relative paths: `images/service.png`
- Or external URLs: `https://cdn.example.com/image.png`

### 4. **Maintain Consistency**
- Use same formatting across all entries
- Update descriptions regularly
- Keep property types limited to 5-7 options

---

## 🎓 Firebase Quick Reference

### Firestore Console
1. Go to Firebase Console
2. Select "britoldata" project
3. Click "Firestore Database"
4. View collections and documents

### Authentication Users
1. Go to Firebase Console
2. Select "britoldata" project
3. Click "Authentication"
4. View/manage users

### Data Export/Import
- Use Firebase Admin SDK
- Or export from Firestore console UI

---

## 📞 Support

If you encounter issues:

1. **Check Console Errors**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Note error messages

2. **Verify Firebase Config**
   - Compare credentials in admin.html
   - Ensure project ID matches

3. **Test Firestore Access**
   - Try reading data directly from console
   - Check security rules

4. **Review Documentation**
   - [Firebase Documentation](https://firebase.google.com/docs)
   - [Firestore Guide](https://firebase.google.com/docs/firestore)

---

## 🔄 Version History

- **v1.0** (April 2026) - Initial release
  - Admin authentication
  - Service management
  - Form field customization
  - Property types management
  - Booking info configuration
  - Firestore integration

---

## ✅ Checklist for First Setup

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Admin user created
- [ ] Security rules configured
- [ ] Firestore collections created with initial data
- [ ] Admin credentials saved securely
- [ ] Admin panel tested (login works)
- [ ] Form fields updated and visible
- [ ] Services display correctly
- [ ] Dropdowns populate with options
- [ ] Production deployment complete

---

**Last Updated:** April 27, 2026  
**Admin Panel Version:** 1.0.0  
**Firebase SDK:** 12.12.1
