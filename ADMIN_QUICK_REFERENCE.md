# Admin Panel - Quick Reference Guide

## 🔐 Login

**URL:** `https://yoursite.com/admin.html`

**Credentials:**
- Email: `admin@britolgroup.com.au`
- Password: `[Your secure password]`

---

## 📊 Main Sections

### 1. 🏢 Services (Manage cleaning services)

**What You Can Edit:**
- Service name (e.g., "Office Cleaning")
- Icon/Emoji (e.g., 🏢)
- Description text
- Image URL
- Category label

**Quick Actions:**
- **Add Service** → Click "+ Add Service" button
- **Edit Service** → Click "Edit" on any service card
- **Delete Service** → Click "Delete" on any service card

**Tips:**
- Use emojis for visual appeal
- Keep descriptions under 150 characters
- Use relative image paths: `images/service.png`

---

### 2. 📝 Form Fields (Customize contact form labels)

**What You Can Edit:**
- Full Name label & placeholder
- Email Address label & placeholder
- Phone Number label & placeholder
- Service Type label
- Property Type label
- Additional Details label & placeholder

**Impact:**
- Changes apply to all contact forms instantly
- Users see your custom labels

**Example:**
```
Default: "Full Name" placeholder: "John Smith"
Custom:  "Your Full Name" placeholder: "Jane Doe"
```

---

### 3. 🏠 Property Types (Dropdown options)

**What You Can Edit:**
- Property type name (e.g., "Office", "Medical Centre")
- Description text

**Quick Actions:**
- **Add Property** → Click "+ Add Property Type"
- **Edit Property** → Click "Edit" on any card
- **Delete Property** → Click "Delete" on any card

**Best Practices:**
- Keep to 5-7 main types for clarity
- Use clear, familiar names
- Add brief descriptions

---

### 4. 📅 Booking Info (Service availability & messaging)

**What You Can Edit:**
- Turnaround Time (e.g., "24-48 hours")
- Minimum Booking Time in days
- Availability Hours (e.g., "08:00 AM - 05:00 PM")
- Working Days (e.g., "Monday to Friday")
- Quote Response Time
- Success Message (shown after form submission)

**Examples:**

```
Turnaround Time: "24-48 hours for initial quote"
Availability Hours: "08:00 AM - 05:00 PM (AEST)"
Working Days: "Monday to Friday (excluding public holidays)"
Quote Response: "Usually within 4-6 hours"
Success Message: "Thank you! Check your email for updates."
```

---

## 🔄 Workflow

### To Update Services
1. Click **Services** in sidebar
2. Click **+ Add Service** or **Edit**
3. Fill in fields:
   - Name: `Office Cleaning`
   - Icon: `🏢`
   - Description: `Your service description...`
   - Image: `images/office-cleaning.png`
   - Category: `Commercial`
4. Click **Save Service**
5. ✅ Done! Public website updates automatically

### To Update Form Labels
1. Click **Form Fields** in sidebar
2. Edit the label text fields
3. Click **Save Form Fields**
4. ✅ Done! Contact form updates instantly

### To Add Property Types
1. Click **Property Types** in sidebar
2. Click **+ Add Property Type**
3. Fill in:
   - Name: `Office`
   - Description: `Commercial office space`
4. Click **Save**
5. ✅ Done! Dropdown updates on form

### To Update Booking Info
1. Click **Booking Info** in sidebar
2. Edit the fields (all optional)
3. Click **Save Booking Info**
4. ✅ Done! Info available to frontend

---

## ⚠️ Important Notes

### Changes Are Real-Time
- All changes save immediately to Firestore
- Public website fetches latest data on page refresh
- No approval needed—changes go live instantly

### Best Practices
- ✅ Use consistent formatting
- ✅ Check spelling/grammar before saving
- ✅ Keep descriptions concise
- ✅ Use actual file paths for images
- ✅ Don't use special characters in names

### Avoid
- ❌ Leaving required fields empty
- ❌ Using very long descriptions
- ❌ Deleting all services (keep at least 1)
- ❌ Making frequent rapid changes (wait 1-2 seconds)

---

## 🆘 Troubleshooting

**"Can't log in"**
- Check caps lock on password
- Verify email is correct
- Check internet connection

**"Changes not showing on website"**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check Firestore console for data

**"Modal not opening"**
- Close any open modals first
- Try refresh page
- Check browser console (F12)

**"Can't save changes"**
- Verify all required fields are filled
- Check internet connection
- Try again in a few seconds

---

## 🔐 Security Tips

1. **Never share your admin credentials**
2. **Use a strong password** (20+ characters)
3. **Log out when done** (Click "Logout" button)
4. **Don't leave admin panel open** on shared computers
5. **Change password regularly** (at least quarterly)

---

## 📱 Mobile Usage

Admin panel works on tablets and phones:
- Sidebar converts to horizontal menu
- Forms are touch-friendly
- All features available

**Recommended:** Use desktop for comfort, but mobile works fine

---

## 📞 Need Help?

Check these common issues:

| Problem | Solution |
|---------|----------|
| Lost password | Reset via Firebase Console |
| Form won't save | Ensure all required fields filled |
| Can't see changes | Hard refresh (Ctrl+Shift+R) |
| Images not loading | Verify image path exists |
| Dropdown empty | Add items in Property Types section |

---

## 🎯 Common Tasks

### Update All Form Labels to Spanish
1. Go to Form Fields
2. Change each label to Spanish
3. Click Save
4. ✅ All forms now in Spanish

### Add Seasonal Service
1. Go to Services
2. Click "+ Add Service"
3. Fill in details (e.g., "Spring Cleaning")
4. Save
5. ✅ Available immediately

### Change Business Hours
1. Go to Booking Info
2. Update "Availability Hours"
3. Save
4. ✅ Updated on website

### Remove Service
1. Go to Services
2. Find service card
3. Click "Delete"
4. Confirm deletion
5. ✅ Removed from website

---

## 🔔 Notifications

After saving, you'll see a success message in bottom-right corner:
- ✅ Green = Success (saved to Firestore)
- ❌ Red = Error (check console)

---

## 📊 Firestore Data Limits

- **Services:** Unlimited (but ~10-15 recommended)
- **Form Fields:** Fixed set (~10 fields)
- **Property Types:** Recommended 5-10 max
- **Booking Info:** Single document, unlimited fields

---

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Firebase SDK:** 12.12.1

---

## 🚀 You're Ready!

- ✅ Login to `/admin.html`
- ✅ Manage your content
- ✅ Changes go live instantly
- ✅ Users see your custom values

**Questions?** Contact: info@britolgroup.com.au
