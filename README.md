# Vivos DNA Device Tracking PWA
A Progressive Web App (PWA) to track wear time for a Vivos dental appliance.

# Dev Notes for WIP

- accumulated time was not in the allRecords array but it was in local storage.
- all records is getting cleared on page reload? but the accumulated time is still tracking accross pages.  I need all records to persist. Then I can calculate the accumulated time from the allRecords array.
- don't let the browser zoome in/out so we keep the UI on screen?


## States
[draw.io state diagram](https://app.diagrams.net/#G1LjmWIHFGbhOBomOCT9AVQclbQzsn2rxd#%7B%22pageId%22%3A%22fl5VHqQaEs4XxcpcWQLl%22%7D) 


## Widget Approximation
PWAs don't have access to android apis for widget. 
Options:
- [A PWA icon can have long press shortcuts](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/shortcuts) to features
- when opening from home screen icon toggle the start/stop state?
- setup a service worker to run in the background and update a badge or notification with a button to toggle the state?

## Project Overview

This PWA helps users track their Vivos dental appliance wear time with:
- Precise timer functionality
- Offline capabilities
- Local data storage
- Mobile-friendly design
- Weekly statistics and reporting

## Features WIP

### Hosted on GitHub Pages (public):
- https://tjtripp.github.io/vivos-tracker/
- If installed to home screen, reinstall the PWA after changes to see updates

### Core Features (Phase 1-3)
- [x] Start/Stop timer for wear sessions
- [ ] Daily wear time tracking
- [ ] Session history storage
- [ ] Offline functionality
- [ ] Mobile-responsive design
- [x] PWA installation capability

### Enhanced Features (Phase 4-6)
- [ ] Switch to indexedDB for data storage
- [ ] Widget-like functionality (home screen icon)
- [ ] Weekly statistics and visualization
- [ ] Data export functionality
- [ ] Wear streak tracking
- [ ] Reminder notifications (optional)
- [ ] Performance optimization

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: localStorage for data persistence
- **PWA**: Service Worker for offline functionality
- **Icons**: Custom app icons (192x192, 512x512)

## File Structure

```
vivos-tracker/
│
├── index.html              # Main app interface
├── style.css               # Styling and responsive design
├── app.js                  # Core application logic
├── service-worker.js       # Offline functionality
├── manifest.json           # PWA configuration
│
├── icons/                  # App icons for PWA
│   ├── icon-192.png       # 192x192 icon (to be created)
│   └── icon-512.png       # 512x512 icon (to be created)
│
└── README.md              # This file
```

## Development Phases [needs updating]

### Phase 0: Setup & Foundation ✅
- [x] Project structure created
- [x] Basic file skeletons in place
- [x] Git repository initialized
- [x] Icons created and added

### Phase 1: Core Timer & Data Logging
- [x] Implement start/stop timer functionality
- [x] Add localStorage for session persistence
- [x] Create basic UI for timer controls
- [ ] Handle page refresh/reload scenarios

### Phase 2: Basic Reporting & PWA Shell
- [ ] Display daily total wear time
- [ ] Show wear session history
- [ ] Implement service worker caching
- [x] Make app installable as PWA

### Phase 3: UI/UX Refinement & Testing
- [ ] Enhanced CSS styling
- [ ] Mobile responsiveness
- [ ] Cross-browser testing
- [ ] Local device testing

### Phase 4: Data Visualization
- [ ] Weekly statistics calculation
- [ ] Chart/graph implementation
- [ ] Enhanced statistics display

### Phase 5: Notifications & Data Export
- [ ] Data export functionality (JSON/CSV)
- [ ] Optional reminder notifications
- [ ] Data backup/restore features
- [ ] Handle updating PWA after changes

### Phase 6: Advanced Tracking & Optimization
- [ ] Streak tracking implementation
- [ ] Performance optimization
- [ ] Code refactoring and cleanup

## Development Environment

### Prerequisites
- Visual Studio Code with Live Server extension
- Modern web browser (Chrome recommended)
- Git for version control

### Development Setup
1. Clone or download this repository
2. Open the project folder in VS Code
3. Right-click `index.html` and select "Open with Live Server"
4. The app will open in your browser at `http://localhost:5500`

### Testing on Mobile Device
1. Ensure your computer and mobile device are on the same Wi-Fi network
2. Find your computer's IP address (e.g., 192.168.1.100)
3. On your mobile device, navigate to `http://<YOUR_IP>:5500`
4. Test PWA installation and offline functionality

## Contributing

This is a personal project for medical device tracking. Development follows the phase-based approach outlined in the project guide.

## License

Private project for personal use.
