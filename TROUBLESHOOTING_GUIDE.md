# Admin Panel - Troubleshooting Guide

## 🆘 Common Issues & Solutions

---

## 🔐 Authentication Issues

### Issue: "Invalid Email or Password"

**Symptoms:**
- Can't login to admin panel
- Error appears on login form

**Solutions:**

1. **Check Email Format**
   - Correct: `admin@britolgroup.com.au`
   - Wrong: `admin @britolgroup.com.au` (space)
   - Make sure there are no extra spaces

2. **Verify Password**
   - Check CAPS LOCK is off
   - Password is case-sensitive
   - No leading/trailing spaces

3. **Confirm User Exists**
   - Go to Firebase Console
   - Authentication → Users
   - Search for your email
   - If missing, create new user

4. **Reset Password**
   - In Firebase Console → Users
   - Click user email
   - Click "Reset Password"
   - Follow email link
   - Set new password

---

### Issue: "Too Many Failed Login Attempts"

**Symptoms:**
- Account locked temporarily
- Can't login even with correct password

**Solution:**
- Wait 5-15 minutes for lock to lift
- Try again
- Or reset password via Firebase console

---

### Issue: "User Not Found"

**Symptoms:**
- Error suggests email doesn't exist

**Solution:**
1. Verify email in Firebase Console
2. Create new admin user:
   - Firebase Console → Authentication
   - Click "Add user"
   - Enter email and password
   - Click Create
3. Use new credentials to login

---

## 📄 Firestore Data Issues

### Issue: Admin Panel Loads But No Data Shows

**Symptoms:**
- Login works
- Services/Forms section empty
- "Loading..." message stays

**Causes & Fixes:**

1. **Firestore Collections Don't Exist**
   - Go to Firebase Console → Firestore
   - Check if `/config` collection exists
   - If missing, create it:
     ```
     Collection ID: config
     Document ID: services (add manually)
     Field: items (Array type)
     ```

2. **Security Rules Block Read**
   - Go to Firestore → Rules
   - Ensure read access allowed:
     ```javascript
     match /{document=**} {
       allow read;
     }
     ```

3. **Data Structure Wrong**
   - Check document structure matches:
     ```json
     {
       "items": [...]  // For services & propertyTypes
     }
     ```

4. **Browser Cache**
   - Hard refresh: `Ctrl+Shift+R`
   - Clear cache: Settings → Privacy
   - Try incognito/private window

---

### Issue: "Can't Save Changes" or "Save Button Does Nothing"

**Symptoms:**
- Click Save but nothing happens
- No error message appears
- Changes don't appear in Firestore

**Solutions:**

1. **Check Required Fields**
   - Verify all required fields filled (marked with *)
   - Empty fields won't save

2. **Check Internet Connection**
   - Test connection: ping google.com
   - Try different network (WiFi/mobile data)

3. **Check Firebase Permissions**
   - Go to Firebase Console → Firestore → Rules
   - Ensure write rules allow authenticated users:
     ```javascript
     match /config/{document=**} {
       allow write: if request.auth != null;
     }
     ```

4. **Check Browser Console**
   - Press F12 to open DevTools
   - Go to Console tab
   - Look for red error messages
   - Take note of error and contact support

5. **Verify User is Authenticated**
   - Check top-right corner shows admin name
   - If shows login form, you're logged out

6. **Try Different Browser**
   - Chrome, Firefox, Safari, or Edge
   - Clear cache first

---

## 🌐 Website Update Issues

### Issue: "Changes Not Showing on Public Website"

**Symptoms:**
- Admin panel saves successfully
- Website still shows old values
- Contact form not updated

**Solutions:**

1. **Hard Refresh Website**
   - Windows: `Ctrl+Shift+R`
   - Mac: `Cmd+Shift+R`
   - Or clear cache manually

2. **Clear Browser Cache**
   - Settings → Privacy/History
   - Clear browsing data
   - Check "All time" and "Cached images/files"
   - Clear data
   - Refresh website

3. **Check Firestore Data Actually Saved**
   - Go to Firebase Console
   - Firestore Database
   - Navigate to `/config/services`
   - Verify changes are there
   - If not, admin save didn't work

4. **Check Frontend Scripts Loaded**
   - Website → Right-click → Inspect
   - Console tab (F12)
   - Look for errors about missing files:
     - `firestore-config.js`
     - `firestore-integration.js`
   - If errors, check file paths in index.html

5. **Test Specific Changes**
   - Change form field label to something obvious
   - Wait 5 seconds
   - Hard refresh website
   - Check if changed
   - If yes, caching is working

---

### Issue: "Contact Form Still Shows Old Labels"

**Symptoms:**
- Changed form labels in admin
- Website shows original labels
- Service dropdown shows hardcoded services

**Solutions:**

1. **Verify Form Fields Document Exists**
   - Firebase Console → Firestore
   - Collection: `config`
   - Document: `formFields`
   - Should have fields like:
     ```
     fullNameLabel: "Full Name"
     emailLabel: "Email Address"
     ```

2. **Check firestore-integration.js Loaded**
   - Open website
   - Press F12 → Console
   - Type: `window.firestoreConfig`
   - Should show object (not error)
   - If error, script not loaded

3. **Verify firestore-config.js Loaded**
   - Console (F12) → Check for error messages
   - Should see: `✓ Firestore config loaded successfully`
   - If not, check file exists at root

4. **Update index.html Script Tags**
   - Verify these lines in index.html:
     ```html
     <script type="module" src="firestore-config.js"></script>
     <script type="module" src="firestore-integration.js"></script>
     ```
   - Should be before closing `</body>`

5. **Test in Console**
   - Open console (F12)
   - Type: `window.firestoreConfig.getFormFields()`
   - Should return object with labels
   - If error, integration not working

---

## 🔧 Firebase Connection Issues

### Issue: "Firebase Config Error" or "Project Not Found"

**Symptoms:**
- Console shows Firebase errors
- Admin panel won't load
- No data loads

**Solutions:**

1. **Verify Firebase Config in admin.html**
   - Open admin.html in text editor
   - Find `const firebaseConfig = {`
   - Check:
     - `projectId: "britoldata"` ✓
     - `apiKey`: Should be present
     - `authDomain`: Should be `britoldata.firebaseapp.com`

2. **Verify Firebase Project Exists**
   - Go to Firebase Console
   - Look for "britoldata" project
   - If missing, create it or use different name
   - Update projectId in admin.html

3. **Check Network Connection**
   - Test: Visit https://firebase.google.com
   - If can't reach, network issue
   - Try different network (WiFi/mobile)

4. **Check Firebase Services Active**
   - Firebase Console → britoldata project
   - Firestore Database → Should be enabled
   - Authentication → Should be enabled

---

### Issue: "CORS Error" or "Cross-Origin Error"

**Symptoms:**
- Console shows CORS/Cross-Origin errors
- Can't connect to Firestore
- Data won't load

**Solutions:**

1. **This is usually a browser security feature**
   - Should only appear in development
   - Should not happen on production HTTPS

2. **If on localhost development:**
   - Use `localhost` (not IP address)
   - Access via: `http://localhost:8000`
   - Not: `http://192.168.x.x:8000`

3. **Check Firestore Security Rules**
   - Firebase Console → Firestore → Rules
   - Should have public read access:
     ```javascript
     match /{document=**} {
       allow read;
     }
     ```

---

## 🎨 UI/Display Issues

### Issue: Admin Panel Layout Broken or Misaligned

**Symptoms:**
- Sidebar and content not side-by-side
- Buttons misaligned
- Text overlapping

**Solutions:**

1. **Check admin.css Loaded**
   - Right-click page → Inspect
   - Look for red text: "Failed to load admin.css"
   - Check file exists in root folder

2. **Clear CSS Cache**
   - Hard refresh: `Ctrl+Shift+R`
   - Clear browser cache

3. **Try Different Browser**
   - Test in Chrome, Firefox, Safari
   - Different browser might have better luck

4. **Check Window Size**
   - Try resizing window
   - Mobile view should stack layout

---

### Issue: "Modal Won't Open" or "Add/Edit Dialog Stuck"

**Symptoms:**
- Click "Add Service" but modal doesn't appear
- Modal appears but can't close
- Form fields won't respond

**Solutions:**

1. **Refresh Page**
   - Reload entire page
   - Try again

2. **Check for JavaScript Errors**
   - Console (F12)
   - Look for red errors
   - Note error text

3. **Close All Modals First**
   - Press ESC key
   - Or click X button
   - Then try opening modal again

4. **Clear Site Data**
   - Settings → Privacy
   - Clear all cookies and cache
   - Reload page

---

## 📊 Data Import/Export Issues

### Issue: "Can't Import Seed Data" from FIRESTORE_SEED_DATA.json

**Symptoms:**
- Firebase import fails
- Error message appears
- Data doesn't appear in Firestore

**Solutions:**

1. **Manual Import Instead**
   - Don't use JSON import
   - Manually create documents in Firebase console:
     - Collection: `config`
     - Document: `services`
     - Add field: `items` (Array)
     - Add array items one by one

2. **Check JSON Format**
   - Must be valid JSON
   - No trailing commas
   - Proper quotes and brackets

3. **Use Firebase CLI**
   - Install: `npm install -g firebase-tools`
   - Login: `firebase login`
   - Import: `firebase firestore:import seed-data.json --project=britoldata`

---

## 🚀 Performance Issues

### Issue: "Admin Panel Slow" or "Takes Forever to Load"

**Symptoms:**
- Page loads very slowly
- Services/data take long to appear
- Buttons respond slowly

**Solutions:**

1. **Check Internet Speed**
   - Test at speedtest.net
   - Minimum 5 Mbps recommended
   - 1+ Mbps required

2. **Close Other Tabs/Programs**
   - Close unused browser tabs
   - Close bandwidth-hungry apps
   - Reduces system load

3. **Check Firestore Database Load**
   - Firebase Console → Firestore Stats
   - Look for spike in reads/writes
   - If high, wait for it to settle

4. **Try Different Network**
   - WiFi too slow? Try mobile data
   - Mobile data slow? Try WiFi
   - Work network? Try home network

5. **Check for Too Much Data**
   - If hundreds of services, can be slow
   - Keep services under 50 for speed

---

## 🔒 Security Issues

### Issue: "Unauthorized" or "Permission Denied"

**Symptoms:**
- Can't save data
- Error says not authorized
- Read but can't write

**Solutions:**

1. **Verify You're Logged In**
   - Check admin name in top-right corner
   - If shows "Login" form, log in first

2. **Check Firestore Security Rules**
   - Firebase Console → Firestore → Rules
   - Write access should include:
     ```javascript
     allow write: if request.auth != null;
     ```

3. **Verify User Permissions**
   - Firebase Console → Authentication
   - Check user exists
   - Check email matches login

---

### Issue: "Changes Saved But Others Can't See Them"

**Symptoms:**
- Your changes work for you
- Other users see old data
- Others' changes don't work

**Solutions:**

1. **Check Security Rules Allow Read**
   - Public should be able to read:
     ```javascript
     match /{document=**} {
       allow read;
     }
     ```

2. **Clear Cache Globally**
   - Wait a few minutes
   - Have others hard refresh
   - Clear all caches

---

## 🎯 Testing Checklist

Use this to verify everything works:

```
☐ Can login to admin.html
☐ Services section loads and shows services
☐ Can add a new service
☐ Can edit a service
☐ Can delete a service
☐ Form Fields section loads
☐ Can update form field labels
☐ Property Types section loads
☐ Can add property type
☐ Booking Info section loads
☐ Can update booking info
☐ Public website loads
☐ Contact form has updated labels
☐ Service dropdown is populated
☐ Hard refresh shows latest changes
☐ Can logout successfully
☐ Can login again
```

---

## 📞 When to Contact Support

Contact support if:

1. **Security/Permission Errors Persist**
   - Despite fixing security rules
   - Different users getting errors

2. **Firestore Won't Connect**
   - After verifying config
   - After checking network
   - Getting consistent connection errors

3. **Data Corruption**
   - Data seems wrong
   - Lost data unexpectedly
   - Database state inconsistent

4. **Production Emergency**
   - Website is down
   - Users can't submit forms
   - Data loss situation

**Contact:** info@britolgroup.com.au

---

## 🔍 Debug Information to Provide

When contacting support, include:

1. **Error Message**
   - Full text of error
   - From console (F12)

2. **Browser Info**
   - Browser type and version
   - Operating system

3. **Firebase Project Info**
   - Project ID: `britoldata`
   - Collections affected

4. **Reproduction Steps**
   - What you were doing
   - What happened
   - What should happen

5. **Screenshots**
   - Error screen
   - Affected page
   - Console errors (if visible)

---

## 📚 Additional Resources

- **Firebase Docs:** https://firebase.google.com/docs
- **Firestore Guide:** https://firebase.google.com/docs/firestore
- **Authentication Help:** https://firebase.google.com/docs/auth
- **Security Rules:** https://firebase.google.com/docs/firestore/security/start

---

## ✅ Verification Steps

### Before Contacting Support

1. Hard refresh website: `Ctrl+Shift+R`
2. Clear browser cache
3. Try different browser
4. Try different network (WiFi/mobile)
5. Verify Firestore data in console
6. Check browser console for errors (F12)
7. Review this guide for similar issues
8. Verify Firebase project still exists
9. Confirm admin user still exists
10. Test on laptop/desktop (if on mobile)

### After Implementing Fix

1. Wait 2-3 minutes for propagation
2. Hard refresh: `Ctrl+Shift+R`
3. Clear cache completely
4. Test in incognito window
5. Try different browser
6. Test on different device
7. Verify in Firebase console

---

**Version:** 1.0.0  
**Last Updated:** April 27, 2026  
**Firebase SDK:** 12.12.1

---

**Remember:** Most issues are solved by:
1. Hard refresh (`Ctrl+Shift+R`)
2. Clear cache
3. Check Firestore data exists
4. Verify security rules
5. Test in different browser

**You've got this!** 🚀
