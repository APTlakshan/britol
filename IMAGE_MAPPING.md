# Image Naming & Mapping Guide

## New Image Naming Convention

Your images should follow this **meaningful naming structure** in the `images/` folder:

```
images/
├── logo.png                          # Britol Group logo
├── service-vehicle-with-logo.png     # Service vehicle (keep as is)
├── office-cleaning-01.jpeg           # Office cleaning - variant 1
├── office-cleaning-02.jpeg           # Office cleaning - variant 2
├── office-cleaning-03.jpeg           # Office cleaning - variant 3
├── office-cleaning-04.jpeg           # Office cleaning - variant 4
├── floor-cleaning-01.jpeg            # Floor/carpet cleaning - variant 1
├── floor-cleaning-02.jpeg            # Floor/carpet cleaning - variant 2
├── floor-cleaning-03.jpeg            # Floor/carpet cleaning - variant 3
├── floor-cleaning-04.jpeg            # Floor/carpet cleaning - variant 4
├── washroom-cleaning-01.jpeg         # Washroom/sanitization - variant 1
├── washroom-cleaning-02.jpeg         # Washroom/sanitization - variant 2
├── washroom-cleaning-03.jpeg         # Washroom/sanitization - variant 3
├── washroom-cleaning-04.jpeg         # Washroom/sanitization - variant 4
├── kitchen-cleaning-01.jpeg          # Kitchen/commercial - variant 1
├── kitchen-cleaning-02.jpeg          # Kitchen/commercial - variant 2
└── kitchen-cleaning-03.jpeg          # Kitchen/commercial - variant 3
```

---

## Current HTML Mappings

### Services Section
| Service | Image Used | Purpose |
|---------|-----------|---------|
| Office Cleaning | `office-cleaning-01.jpeg` | Service card hero image |
| Medical Centre | `washroom-cleaning-01.jpeg` | Sanitization theme |
| Carpet Cleaning | `floor-cleaning-01.jpeg` | Floor cleaning focus |
| Body Corporate | `office-cleaning-02.jpeg` | Commercial building |
| Childcare Centre | `floor-cleaning-02.jpeg` | Safety & cleanliness |
| Retail & Common | `kitchen-cleaning-01.jpeg` | Commercial kitchen |

### Gallery Section (6 images)
| Position | Image | Label |
|----------|-------|-------|
| 1 (Hero) | `office-cleaning-03.jpeg` | Clean Office Space |
| 2 | `office-cleaning-04.jpeg` | Deep Office Clean |
| 3 | `washroom-cleaning-02.jpeg` | Medical Sanitation |
| 4 | `floor-cleaning-03.jpeg` | Carpet Restoration |
| 5 | `floor-cleaning-04.jpeg` | Childcare Centre |
| 6 | `kitchen-cleaning-02.jpeg` | Retail Space |

### Other Sections
| Section | Image | Purpose |
|---------|-------|---------|
| Hero Banner | `office-cleaning-01.jpeg` | Main page background |
| About Us | `service-vehicle-with-logo.png` | Team/company representation |
| Logo (all) | `logo.png` | Branding (navbar, footer) |

---

## How to Update Your Images

1. **Rename your image files** to match the structure above:
   - Use meaningful category names: `office-cleaning`, `floor-cleaning`, `washroom-cleaning`, `kitchen-cleaning`
   - Add variant numbers: `-01.jpeg`, `-02.jpeg`, etc.
   - Keep file extension consistent: `.jpeg` or `.png`

2. **Your current files mapping:**
   ```
   office cleaning 3.jpeg        → office-cleaning-01.jpeg
   office cleaning 5.jpeg        → office-cleaning-02.jpeg
   office clenaing 4.jpeg        → office-cleaning-03.jpeg
   office clenaing 6.jpeg        → office-cleaning-04.jpeg
   
   floor cleaning.jpeg           → floor-cleaning-01.jpeg
   floor cleaning2.jpeg          → floor-cleaning-02.jpeg
   floor cleaning3.jpeg          → floor-cleaning-03.jpeg
   floor cleaning4.jpeg          → floor-cleaning-04.jpeg
   
   wash room cleaning 4.jpeg     → washroom-cleaning-01.jpeg
   wash room cleaning 6.jpeg     → washroom-cleaning-02.jpeg
   washroom cleaning 2.jpeg      → washroom-cleaning-03.jpeg
   washroom cleaning 3.jpeg      → washroom-cleaning-04.jpeg
   washroom cleaning.jpeg        → (spare)
   
   kitchen cleaning 2.jpeg       → kitchen-cleaning-01.jpeg
   kitchen cleaning 3.jpeg       → kitchen-cleaning-02.jpeg
   kitchen cleaning.jpeg         → (spare)
   
   logo.png                       → logo.png (keep as is)
   service vehicle with logo.png  → service-vehicle-with-logo.png
   ```

---

## Benefits of This Structure

✅ **Clear naming** - Anyone can understand what each image contains
✅ **Easy updates** - Change one image, entire pages update
✅ **Scalability** - Add more variants easily (`office-cleaning-05.jpeg`, etc.)
✅ **Professional** - Meaningful file names improve SEO & accessibility
✅ **Organization** - All related images grouped by type
✅ **Consistency** - Uniform naming across the project

---

## Next Steps

1. Rename your image files according to the mapping above
2. All HTML references are already updated ✅
3. Test the website to ensure all images load correctly
4. Consider compressing images for better performance
