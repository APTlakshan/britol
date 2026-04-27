# Britol Group Admin Panel - Setup Checklist

## ✅ Pre-Setup Requirements

- [ ] You have admin@britolgroup.com.au email or can create one
- [ ] Strong password ready (20+ characters recommended)
- [ ] Access to Firebase Console (https://console.firebase.google.com)
- [ ] Stable internet connection
- [ ] Modern web browser (Chrome/Firefox/Safari/Edge)

---

## 🚀 Step 1: Firebase Project Setup

### Create/Verify Firebase Project

- [ ] Visit https://console.firebase.google.com
- [ ] Create new project named "britoldata" OR verify existing project
- [ ] Enable Google Analytics (optional)
- [ ] Wait for project to be created (2-3 minutes)
- [ ] Open the project

### Enable Required Services

- [ ] Go to Build section → Firestore Database
  - [ ] Click "Create database"
  - [ ] Select region closest to you (e.g., australia-southeast1)
  - [ ] Choose "Start in test mode"
  - [ ] Click Create
  - [ ] Wait for creation (1-2 minutes)

- [ ] Go to Build section → Authentication
  - [ ] Click "Get started"
  - [ ] Select "Email/Password" provider
  - [ ] Toggle "Enable"
  - [ ] Click "Save"

---

## 🔐 Step 2: Create Admin User

- [ ] In Firebase Console → Authentication
- [ ] Click "Add user" button
- [ ] Enter email: `admin@britolgroup.com.au`
- [ ] Enter strong password (20+ characters)
- [ ] Click "Create user"
- [ ] ✅ User created successfully
- [ ] Save credentials in secure password manager
- [ ] Note: User won't receive confirmation email in test mode

---

## 🛡️ Step 3: Configure Security Rules

- [ ] Go to Firebase Console → Firestore Database
- [ ] Click "Rules" tab (top navigation)
- [ ] Replace entire content with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access
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

- [ ] Click "Publish"
- [ ] Wait for rules to deploy (typically instant)
- [ ] ✅ Rules published

---

## 📁 Step 4: Create Firestore Collections

### Create Collection Structure

- [ ] Go to Firebase Console → Firestore Database
- [ ] Click "Start collection"
- [ ] Collection ID: `config`
- [ ] Click "Next"
- [ ] Document ID: `services`
- [ ] Click "Save"

Now you'll add documents. Repeat for each:

### Document 1: services
- [ ] Already created (from above)
- [ ] Add field:
  - [ ] Field name: `items`
  - [ ] Type: `array`
  - [ ] Click "Add field"
  - [ ] Add items (see FIRESTORE_SEED_DATA.json for structure)

### Document 2: formFields
- [ ] In collection `config`, click "Add document"
- [ ] Document ID: `formFields`
- [ ] Add fields from FIRESTORE_SEED_DATA.json:
  - [ ] `fullNameLabel` (string): "Full Name"
  - [ ] `fullNamePlaceholder` (string): "John Smith"
  - [ ] `emailLabel` (string): "Email Address"
  - [ ] `emailPlaceholder` (string): "john@example.com"
  - [ ] `phoneLabel` (string): "Phone Number"
  - [ ] `phonePlaceholder` (string): "0405 585 505"
  - [ ] `serviceTypeLabel` (string): "Service Type"
  - [ ] `propertyTypeLabel` (string): "Property Type"
  - [ ] `detailsLabel` (string): "Additional Details"
  - [ ] `detailsPlaceholder` (string): "Tell us more about your needs..."

### Document 3: propertyTypes
- [ ] Click "Add document"
- [ ] Document ID: `propertyTypes`
- [ ] Add field:
  - [ ] Field name: `items`
  - [ ] Type: `array`
  - [ ] Add array items (see FIRESTORE_SEED_DATA.json)

### Document 4: bookingInfo
- [ ] Click "Add document"
- [ ] Document ID: `bookingInfo`
- [ ] Add fields from FIRESTORE_SEED_DATA.json:
  - [ ] `turnaroundTime` (string): "24-48 hours"
  - [ ] `minBookingTime` (number): 1
  - [ ] `availabilityHours` (string): "08:00 AM - 05:00 PM"
  - [ ] `workingDays` (string): "Monday to Friday"
  - [ ] `quoteResponseTime` (string): "Within 24 hours"
  - [ ] `successMessage` (string): "Thank you for your quote request..."

- [ ] ✅ All 4 documents created

---

## 💾 Step 5: Verify Firestore Data

- [ ] Go to Firebase Console → Firestore Database
- [ ] Click "Data" tab
- [ ] Verify collection structure:
  - [ ] `config` collection exists
  - [ ] `services` document visible
  - [ ] `formFields` document visible
  - [ ] `propertyTypes` document visible
  - [ ] `bookingInfo` document visible
- [ ] ✅ All data visible and correct

---

## 🌐 Step 6: Deploy Updated Website

### Update index.html

- [ ] In your project root, open `index.html`
- [ ] Verify these lines are present (after scripts):
  ```html
  <script type="module" src="firestore-config.js"></script>
  <script type="module" src="firestore-integration.js"></script>
  ```
- [ ] If not present, add them before `</body>`
- [ ] Save file

### Upload Files to Server

- [ ] Upload these NEW files to server root:
  - [ ] `admin.html`
  - [ ] `admin.css`
  - [ ] `admin.js`
  - [ ] `firestore-config.js`
  - [ ] `firestore-integration.js`

- [ ] Update on server:
  - [ ] `index.html` (with Firestore script tags)

- [ ] ✅ All files uploaded

---

## 🧪 Step 7: Test Admin Panel

### Access Admin Panel

- [ ] Open browser
- [ ] Navigate to: `https://yoursite.com/admin.html`
- [ ] ✅ Admin login page loads

### Test Login

- [ ] Email: `admin@britolgroup.com.au`
- [ ] Password: `[your strong password]`
- [ ] Click "Sign In"
- [ ] ✅ Should load admin dashboard

### Test Services Section

- [ ] Click "Services" in sidebar
- [ ] ✅ Services grid displays 6 services
- [ ] Click "Edit" on a service
- [ ] ✅ Edit modal opens
- [ ] Click "Cancel" (don't save yet)
- [ ] ✅ Modal closes

### Test Add Service

- [ ] Click "+ Add Service"
- [ ] Fill in test service:
  - [ ] Name: "Test Service"
  - [ ] Icon: "⭐"
  - [ ] Description: "This is a test"
- [ ] Click "Save Service"
- [ ] ✅ Success notification appears
- [ ] ✅ Service appears in grid
- [ ] Delete this test service
- [ ] ✅ Service removed

### Test Form Fields

- [ ] Click "Form Fields" in sidebar
- [ ] ✅ Form loads with current labels
- [ ] Change one label (e.g., "Full Name" → "Your Full Name")
- [ ] Click "Save Form Fields"
- [ ] ✅ Success notification appears
- [ ] Revert change
- [ ] Save again

### Test Property Types

- [ ] Click "Property Types" in sidebar
- [ ] ✅ Property types display (5 items)
- [ ] Click "+ Add Property Type"
- [ ] Fill in test property:
  - [ ] Name: "Test Property"
  - [ ] Description: "Test description"
- [ ] Click "Save"
- [ ] ✅ Success notification
- [ ] Delete test property
- [ ] ✅ Removed from list

### Test Booking Info

- [ ] Click "Booking Info" in sidebar
- [ ] ✅ Form displays with current values
- [ ] Change turnaround time (e.g., to "Same day")
- [ ] Click "Save Booking Info"
- [ ] ✅ Success notification
- [ ] Revert change
- [ ] Save again

### Test Logout

- [ ] Click "Logout" button (top-right)
- [ ] ✅ Returned to login form
- [ ] ✅ Dashboard disappeared

---

## 📱 Step 8: Test Public Website

### Test Form Updates

- [ ] Go to public website: `https://yoursite.com`
- [ ] Hard refresh: `Ctrl+Shift+R`
- [ ] Scroll to "Contact Us" section
- [ ] ✅ Form displays with correct labels
- [ ] ✅ Service dropdown is populated
- [ ] ✅ All fields have correct placeholders

### Test Services Display

- [ ] Scroll to "Services" section
- [ ] ✅ 6 services display
- [ ] ✅ Service icons and descriptions visible
- [ ] ✅ Styling looks correct

### Test Form Submission

- [ ] Fill out contact form:
  - [ ] Name: "Test User"
  - [ ] Email: "test@example.com"
  - [ ] Phone: "0405585505"
  - [ ] Message: "Test message"
- [ ] Click "Send Request"
- [ ] ✅ Success notification appears
- [ ] ✅ Form clears

---

## 🔄 Step 9: Make a Real Admin Change

### Update Services from Admin

- [ ] Login to admin panel: `/admin.html`
- [ ] Go to Services
- [ ] Edit "Office Cleaning"
- [ ] Change description slightly (add a word)
- [ ] Click "Save"
- [ ] ✅ Success notification

### Verify Change on Public Website

- [ ] Go to public website (new tab)
- [ ] Hard refresh: `Ctrl+Shift+R`
- [ ] Go to Services section
- [ ] ✅ See updated description
- [ ] ✅ Confirms integration working

---

## 📊 Step 10: Documentation & Training

- [ ] Read `ADMIN_SETUP_GUIDE.md` (complete reference)
- [ ] Read `ADMIN_QUICK_REFERENCE.md` (daily use)
- [ ] Bookmark admin panel URL: `/admin.html`
- [ ] Save credentials securely in password manager
- [ ] Share credentials securely with team (if needed)
- [ ] Brief team on admin panel usage:
  - [ ] How to login
  - [ ] How to add/edit content
  - [ ] How to test on public website

---

## 🎯 Step 11: Ongoing Maintenance

- [ ] Weekly: Review and update content
- [ ] Monthly: Check for any issues
- [ ] Quarterly: Change admin password
- [ ] As needed: Add new services or types
- [ ] Regular: Monitor public website for updates

---

## 📋 Verification Checklist (Final)

### Admin Panel Works
- [ ] Can login
- [ ] Services section works
- [ ] Form Fields section works
- [ ] Property Types section works
- [ ] Booking Info section works
- [ ] Can add/edit/delete items
- [ ] Can logout

### Public Website Works
- [ ] Contact form has correct labels
- [ ] Dropdowns are populated
- [ ] Services section displays correctly
- [ ] All Firestore values show on website
- [ ] Form submission works

### Firebase Setup
- [ ] Firestore database exists
- [ ] Security rules applied
- [ ] Admin user created
- [ ] Collections have data
- [ ] No errors in console

### Documentation
- [ ] ADMIN_SETUP_GUIDE.md reviewed
- [ ] ADMIN_QUICK_REFERENCE.md bookmarked
- [ ] Credentials saved securely
- [ ] Team trained (if applicable)
- [ ] Troubleshooting guide available

---

## 🆘 If Something Goes Wrong

1. **Check Troubleshooting Guide**
   - See: `TROUBLESHOOTING_GUIDE.md`
   - Most issues have solutions there

2. **Check Browser Console**
   - Press F12 → Console tab
   - Look for red error messages
   - Note exact error text

3. **Verify Firestore Data**
   - Go to Firebase Console
   - Check collections exist
   - Verify documents have data
   - Check data structure matches expected

4. **Test Basic Connectivity**
   - Hard refresh: `Ctrl+Shift+R`
   - Clear browser cache
   - Try different browser
   - Try incognito/private window

5. **Contact Support**
   - Email: `info@britolgroup.com.au`
   - Include error message, browser info, steps to reproduce

---

## 🎉 Setup Complete!

Once all checkboxes are complete, your admin panel is ready:

✅ Admin can login and manage content  
✅ Public website shows admin-configured values  
✅ Changes appear in real-time (after refresh)  
✅ Team trained on usage  
✅ Documentation available  

**You're ready to go!** 🚀

---

## 📞 Quick Reference

| Item | Location |
|------|----------|
| Admin Panel | `/admin.html` |
| Login Email | `admin@britolgroup.com.au` |
| Firebase Console | https://console.firebase.google.com |
| Setup Guide | `ADMIN_SETUP_GUIDE.md` |
| Quick Reference | `ADMIN_QUICK_REFERENCE.md` |
| Troubleshooting | `TROUBLESHOOTING_GUIDE.md` |
| Seed Data | `FIRESTORE_SEED_DATA.json` |

---

## 📅 Timeline Estimate

| Step | Time |
|------|------|
| Firebase Setup | 5-10 min |
| Create Admin User | 2 min |
| Configure Rules | 2 min |
| Create Firestore Data | 10-15 min |
| Deploy Files | 5 min |
| Test Admin Panel | 10 min |
| Test Public Website | 5 min |
| **Total** | **40-50 min** |

---

**Version:** 1.0.0  
**Date:** April 27, 2026  
**Status:** Ready for Setup

---

**Start with Step 1 and work through sequentially.** 

Each step builds on the previous, so don't skip any!

**Questions?** Check TROUBLESHOOTING_GUIDE.md first! 📚
