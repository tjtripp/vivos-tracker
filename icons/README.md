# PWA App Icons

This directory contains the required app icons for the Vivos Tracker PWA.

## Required Icons

You need to create these two icon files:

### icon-192.png
- Size: 192x192 pixels
- Format: PNG
- Purpose: Standard app icon for various display sizes
- Used by: App manifest, home screen, app switcher

### icon-512.png  
- Size: 512x512 pixels
- Format: PNG
- Purpose: High-resolution icon for larger displays
- Used by: Splash screen, app stores, high-DPI displays

## Icon Design Guidelines

### Content Suggestions
- Simple, recognizable symbol related to dental health
- Vivos logo or stylized "V" 
- Timer/clock symbol to represent tracking
- Tooth icon with timer elements
- Clean, minimalist design that works at small sizes

### Technical Requirements
- Square aspect ratio (1:1)
- PNG format with transparency support
- High contrast for visibility
- Readable at small sizes (192px should be legible)
- Consistent design between both sizes

### Design Tools
- Free options: GIMP, Paint.NET, Canva
- Online tools: Favicon.io, PWA Builder
- Professional: Adobe Illustrator, Photoshop

### Color Scheme
- Consider using the app's theme color: #007bff (blue)
- White or light background for contrast
- Ensure good visibility on various home screen backgrounds

## Creating Icons

1. Design your icon at 512x512 pixels
2. Export as PNG with transparency
3. Resize to 192x192 pixels for the smaller version
4. Test both icons by temporarily setting them in manifest.json
5. Verify they display correctly when app is installed

## Placeholder Icons

Until you create custom icons, you can:
1. Use online PWA icon generators
2. Create simple colored squares with "V" text
3. Use free icon resources (ensure licensing compatibility)

## Testing Icons

After creating icons:
1. Update manifest.json paths if needed
2. Test PWA installation on mobile device
3. Verify icons appear correctly on home screen
4. Check splash screen appearance

Remember: Icons are required for full PWA functionality and app store submissions.
