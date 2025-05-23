# Vivos DNA Device Tracking PWA Project Guide

## Local Development Environment Setup

### Prerequisites
- **Software**:
  - Visual Studio Code (VS Code)
  - Git (version control)
  - Node.js (for local server)
  - Web browser (Chrome recommended for PWA testing)

### Project Folder Structure
```
vivos-tracker/
│
├── index.html
├── style.css
├── app.js
├── service-worker.js
├── manifest.json
│
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
│
└── README.md
```

### VS Code Extensions
1. **Live Server** (for local development)
   - Allows running a local development server
   - Right-click `index.html` → "Open with Live Server"

2. **Git Extensions** (recommended)
   - GitLens
   - GitHub Pull Requests
   - GitHub Copilot

3. **Debugging Tools**
   - Chrome Debugger

## Project Overview

### Purpose
Create a Progressive Web App (PWA) to track wear time for a Vivos dental appliance with the following core requirements:
- Track device wear time precisely
- Work offline
- Store data locally
- Provide simple, intuitive interface
- Minimal dependencies (vanilla JavaScript)
- Installable on mobile device

## Key Requirements

### Technical Specifications
- **Technology Stack**:
  - HTML5
  - Vanilla JavaScript
  - CSS
  - LocalStorage for data persistence
  - Service Worker for offline capabilities
  - Progressive Web App (PWA) features

### Functional Requirements
1. Start/Stop timer functionality
2. Track daily wear time
3. Generate weekly statistics
4. Export data capability
5. Offline operation
6. Mobile-friendly design

## Development Workflow

### Development Phases Implementation Matrix

| Phase                               | Description                                      | Key Tasks                                                                                                | Entry Criteria                                       | Exit Criteria / Deliverables                                                                                                | Dependencies         |
| :---------------------------------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| **Phase 0: Setup & Foundation**     | Environment and project structure setup.         | - Set up dev environment & VS Code. <br> - Initialize Git repository. <br> - Create basic file structure.        | - Project idea defined. <br> - Prerequisites installed. | - `README.md` populated. <br> - Initial project files created. <br> - First commit made.                                       | None                 |
| **Phase 1: Core Timer & Data Logging** | Implement fundamental timer and data storage.    | - HTML for timer controls. <br> - JS for start/stop logic. <br> - localStorage for session start time & history. | - Phase 0 completed.                                 | - Functional start/stop timer. <br> - Wear sessions saved to localStorage. <br> - Basic UI for timer status.                       | Phase 0              |
| **Phase 2: Basic Reporting & PWA Shell** | Display data and implement PWA basics.         | - Display daily total wear time. <br> - List wear history. <br> - Create `manifest.json`. <br> - Basic service worker. | - Phase 1 completed.                                 | - Daily summary visible. <br> - History list populated. <br> - App installable (basic PWA). <br> - Basic offline caching.        | Phase 1              |
| **Phase 3: UI/UX Refinement & Testing** | Improve user experience and test thoroughly.   | - Enhance CSS styling. <br> - Ensure mobile responsiveness. <br> - Cross-browser testing. <br> - Local device testing. | - Phase 2 completed.                                 | - Visually polished UI. <br> - Good UX on mobile. <br> - Core functionality stable. <br> - Deployment plan (optional).         | Phase 2              |
| **Phase 4: Data Visualization**     | Introduce graphical representation of data.      | - Design data visualization approach. <br> - Implement chart/graph for weekly stats. <br> - Integrate into UI.  | - Phase 3 completed.                                 | - Visual display of wear time trends (e.g., weekly bar chart). <br> - Statistics section enhanced.                           | Phase 3              |
| **Phase 5: Notifications & Data Export** | Add reminders and data management features.    | - Implement local notifications (optional). <br> - Develop data export (e.g., JSON/CSV). <br> - Consider data import/backup. | - Phase 3 completed.                                 | - User notifications for wear reminders (if implemented). <br> - Functional data export. <br> - Basic data backup strategy. | Phase 3              |
| **Phase 6: Advanced Tracking & Optimization** | Implement streaks and optimize performance. | - Develop streak tracking logic. <br> - UI for streaks. <br> - Code refactoring. <br> - Performance profiling.      | - Phase 4 or 5 completed.                            | - Streak tracking feature. <br> - Optimized app performance. <br> - Reduced load times.                                     | Phase 4 or 5         |

## Mobile Device Testing

To test your PWA on a mobile device, you have a couple of primary options:

### 1. Testing via Local Network (Recommended for Development)

This method allows you to test your local development server directly on your mobile device as long as both your computer and mobile device are on the **same Wi-Fi network**.

**High-Level Steps:**

1.  **Start your local development server:**
    *   If using VS Code's "Live Server" extension, right-click `index.html` and select "Open with Live Server".
    *   If using `http-server` or another Node.js-based server, start it from your project's root directory (e.g., `npx http-server .`).
2.  **Find your computer's local IP address:**
    *   **Windows:** Open Command Prompt (`cmd`) and type `ipconfig`. Look for the "IPv4 Address" under your active Wi-Fi or Ethernet adapter (e.g., `192.168.1.100`).
    *   **macOS:** Open System Settings > Network, select your Wi-Fi connection, and find the IP address. Or, open Terminal and type `ipconfig getifaddr en0` (for Wi-Fi, `en1` for Ethernet).
    *   **Linux:** Open a terminal and type `hostname -I` or `ip addr show`.
3.  **Access the PWA on your mobile device:**
    *   Open a web browser (Chrome is recommended for PWA testing) on your mobile device.
    *   In the address bar, type `http://<YOUR_COMPUTER_IP_ADDRESS>:<PORT>`.
        *   Replace `<YOUR_COMPUTER_IP_ADDRESS>` with the IP address you found in step 2.
        *   Replace `<PORT>` with the port number your local server is using. Live Server typically uses `5500` by default. `http-server` often uses `8080`. Your server's console output will usually indicate the port.
        *   Example: `http://192.168.1.100:5500`
4.  **Test PWA features:**
    *   You should see your `index.html` page.
    *   Test functionality, responsiveness, and the "Add to Home Screen" PWA feature if available.

**Troubleshooting Local Network Access:**
*   Ensure both devices are on the *exact same* Wi-Fi network.
*   Firewall software on your computer might block incoming connections. You may need to temporarily disable it or create an exception for your development server or port.
*   Some public or corporate Wi-Fi networks have "client isolation" enabled, which prevents devices on the same network from seeing each other. If this is the case, you'll need to use a different network or the hosting provider method.

### 2. Deploying to a Simple Hosting Provider (for Broader Testing/Sharing)

This method involves uploading your project files to a web hosting service. This makes your PWA accessible from anywhere with an internet connection and is a good way to test on various devices and networks.

**High-Level Steps:**

1.  **Choose a hosting provider:**
    *   **GitHub Pages:** Free, integrates well if your project is already on GitHub. Ideal for static sites.
    *   **Netlify:** Offers a generous free tier, drag-and-drop deployment, continuous deployment from Git.
    *   **Vercel:** Similar to Netlify, excellent for frontend projects, free tier available.
    *   **Firebase Hosting:** Part of Google's Firebase platform, offers a free tier.
2.  **Prepare your project for deployment:**
    *   Ensure all file paths in your HTML, CSS, JavaScript, and manifest (`start_url`, icon paths) are relative and correct for a hosted environment. Usually, paths starting with `/` (e.g., `/index.html`, `/icons/icon-192.png`) work well.
3.  **Deploy your project files:**
    *   Follow the specific instructions for your chosen hosting provider. This usually involves:
        *   Connecting your Git repository (for GitHub Pages, Netlify, Vercel).
        *   Or, manually uploading your project folder (some providers offer this).
4.  **Access the PWA via the public URL:**
    *   Once deployed, the hosting provider will give you a public URL (e.g., `your-username.github.io/vivos-tracker/` or `your-project-name.netlify.app`).
    *   Open this URL in the browser on your mobile device.
5.  **Test PWA features:**
    *   Verify all functionality, offline capabilities (after the service worker has cached assets), and the "Add to Home Screen" feature.

**Which method to choose?**

*   **Local Network Access:** Best for rapid development and iteration. Changes you make locally are immediately testable on your mobile device with a refresh.
*   **Hosting Provider:** Better for testing in more realistic conditions (actual HTTPS, different networks), sharing with others, and testing the full PWA installation and offline experience more robustly.

You don't typically "move" project files directly to your mobile device's file system for PWA testing. PWAs are web applications, so they are accessed via a web server (either local or remote).

## Learning and Motivation Strategies

### Project Completion Tips
- Break project into small, manageable steps
- Set 25-minute work intervals
- Keep a progress log
- Test on mobile device frequently
- Celebrate small achievements

### Roadblock Mitigation
- Use `console.log()` for debugging
- Start with minimal viable product
- Gradually enhance functionality
- Focus on solving a personal need


## Troubleshooting Checklist

- [ ] LocalStorage data persistence
- [ ] Timer accuracy
- [ ] Offline functionality
- [ ] Service worker registration
- [ ] Mobile responsiveness

## Final Advice
- Prioritize functionality over perfection
- Keep the code simple and focused
- Use version control
- Test frequently on actual device
- Remember the core purpose: consistent tracking

**Key Motivation**: This app directly improves your medical treatment tracking, making the development personally meaningful.


## Quick Reference / Cheat Sheet

### Key localStorage Keys
```javascript
// Primary storage keys - never modify these names
const VIVOS_START_TIME_KEY = 'vivosStartTime';      // ISO string of session start
const VIVOS_HISTORY_KEY = 'vivosHistory';           // JSON array of sessions
const IS_WEARING_KEY = 'isWearing';                 // 'true'/'false' string
```

### Core Function Signatures
```javascript
startWearing()                    // No params, sets global state
stopWearing()                     // No params, saves session to history
loadState()                       // Called on page load, restores state
renderHistory()                   // Updates DOM with history array
updateDailyTotal()               // Calculates today's total wear time
updateCurrentSessionTimer()      // Updates live timer display (1sec interval)
formatDuration(milliseconds)     // Returns HH:MM:SS string
```

### Data Structure Schema
```javascript
// Session entry in vivosHistory array:
{
    id: 1640995200000,                    // timestamp for uniqueness
    date: "2024-01-01",                   // YYYY-MM-DD format
    startTime: 1704135000000,             // Unix timestamp in milliseconds
    endTime: 1704143100000,               // Unix timestamp in milliseconds
    durationHours: 2.25,                  // Float hours for calculations
    durationMs: 8100000                   // Milliseconds for precision
}
```

### Common Debug Commands
```javascript
// Check current state
console.log('Is wearing:', localStorage.getItem('isWearing'));
console.log('Start time:', localStorage.getItem('vivosStartTime'));
console.log('History:', JSON.parse(localStorage.getItem('vivosHistory') || '[]'));

// Clear all data (destructive)
localStorage.removeItem('vivosStartTime');
localStorage.removeItem('vivosHistory'); 
localStorage.removeItem('isWearing');

// Verify service worker
navigator.serviceWorker.getRegistrations().then(r => console.log('SW:', r));
```

### Initial Setup Steps
1.  **Create project folder and navigate into it:**
    ```bash
    mkdir vivos-tracker
    cd vivos-tracker
    ```

2.  **Initialize git repository:**
    ```bash
    git init
    ```

3.  **Create basic project files and folders:**
    (You can create these manually in VS Code or use the terminal. Choose the commands for your preferred terminal.)

    ```powershell
    # For Windows PowerShell:
    New-Item index.html, style.css, app.js, service-worker.js, manifest.json, README.md -ItemType File
    New-Item -Name icons -ItemType Directory
    # You will need to add icon-192.png and icon-512.png to the icons/ folder later.
    ```
    ```bash
    # For Git Bash or other bash-like terminals on Windows:
    touch index.html style.css app.js service-worker.js manifest.json README.md
    mkdir icons
    # You will need to add icon-192.png and icon-512.png to the icons/ folder later.
    ```
    ```cmd
    REM For Windows Command Prompt (cmd):
    type nul > index.html
    type nul > style.css
    type nul > app.js
    type nul > service-worker.js
    type nul > manifest.json
    type nul > README.md
    md icons
    REM You will need to add icon-192.png and icon-512.png to the icons/ folder later.
    ```
    *   *Note: Populate `README.md` with project details.*

4.  **Initialize npm (creates `package.json`):**
    ```bash
    npm init -y
    ```
    *   *(Optional) If you prefer a command-line HTTP server over VS Code's Live Server extension:*
        ```bash
        # Install http-server locally as a dev dependency
        npm install --save-dev http-server
        # You can then add a script to package.json: "start": "http-server ."
        # And run it with: npm start
        # Or run directly with npx:
        # npx http-server .`
        ```

5.  **Make your first commit:**
    ```bash
    git add .
    git commit -m "Initial project structure and setup"
    ```

## Code Structure Highlights

### Key JavaScript Functions

Code Structure Highlights - JavaScript Functions:

The startWearing and stopWearing functions in your plan are good. The example app.js above integrates them.
Consider storing duration as a numerical value (e.g., milliseconds or hours as a float) in localStorage to make calculations for statistics easier. Format it to a string only when displaying.
For dates (startTime.toLocaleDateString()), be mindful that toLocaleDateString() is locale-dependent. For consistent storage and easier sorting/filtering, startTime.toISOString().split('T')[0] (which gives YYYY-MM-DD) is often preferred.
The updateWeeklyStats function is a good placeholder. Its implementation will depend on how you structure the data in localStorage.

Remember to create icon-192.png (192x192 pixels) and icon-512.png (512x512 pixels) and place them in the icons/ folder.

service-worker.js: A basic service worker for caching static assets for offline use.


```javascript
// Start wearing timer
function startWearing() {
  const startTime = new Date();
  localStorage.setItem('vivosStartTime', startTime.toISOString());
  // Update UI and start tracking
}

// Stop wearing timer
function stopWearing() {
  const startTime = new Date(localStorage.getItem('vivosStartTime'));
  const endTime = new Date();
  const wearDuration = (endTime - startTime) / (1000 * 60 * 60); // Hours
  
  // Save session to history
  const history = JSON.parse(localStorage.getItem('vivosHistory') || '[]');
  history.push({
    date: startTime.toLocaleDateString(),
    start: startTime.toLocaleTimeString(),
    end: endTime.toLocaleTimeString(),
    duration: wearDuration.toFixed(2)
  });
  
  localStorage.setItem('vivosHistory', JSON.stringify(history));
}

// Calculate weekly statistics
function updateWeeklyStats() {
  const history = JSON.parse(localStorage.getItem('vivosHistory') || '[]');
  // Process and display weekly wear time
}
```


## Code Examples


### index.html example
```html
<!-- filepath: vivos-tracker/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vivos Tracker</title>
    <link rel="stylesheet" href="style.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#007bff"/>
</head>
<body>
    <header>
        <h1>Vivos Wear Time Tracker</h1>
    </header>
    <main>
        <section id="timer-controls">
            <button id="timerButton">Start Wearing</button>
            <p>Status: <span id="statusIndicator">Not Wearing</span></p>
            <p>Current Session: <span id="currentSessionTimer">00:00:00</span></p>
        </section>
        <section id="daily-summary">
            <h2>Today's Summary</h2>
            <p>Total Wear Time: <span id="dailyTotal">0.00</span> hours</p>
        </section>
        <section id="history">
            <h2>Wear History</h2>
            <ul id="historyList">
                <!-- History items will be populated here by app.js -->
            </ul>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Your Name/Project</p>
    </footer>
    <script src="app.js"></script>
</body>
</html>
```

### style.css example

```css
<!-- filepath: vivos-tracker/style.css -->
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
}

header {
    background: #007bff;
    color: #fff;
    padding: 1rem 0;
    text-align: center;
}

main {
    padding: 1rem;
    max-width: 800px;
    margin: auto;
}

section {
    background: #fff;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

button {
    display: inline-block;
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
}

button:hover {
    background: #0056b3;
}

#timerButton.active {
    background-color: #dc3545; /* Red when active (Stop button) */
}
#timerButton.active:hover {
    background-color: #c82333;
}


#historyList {
    list-style-type: none;
    padding: 0;
}

#historyList li {
    background: #e9ecef;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 3px;
}

footer {
    text-align: center;
    padding: 1rem;
    background: #333;
    color: #fff;
    position: relative;
    bottom: 0;
    width: 100%;
}

### manifest.json
```javascript
<!-- filepath: vivos-tracker/manifest.json -->
{
    "name": "Vivos Wear Tracker",
    "short_name": "VivosTrack",
    "description": "A Progressive Web App to track Vivos dental appliance wear time.",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#007bff",
    "orientation": "portrait-primary",
    "icons": [
        {
            "src": "icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        }
    ]
}
```

### service-worker.js
<!-- filepath: vivos-tracker/service-worker.js -->
```javascript
const CACHE_NAME = 'vivos-tracker-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
    // Add other static assets if any
];

// Install event: cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch(error => {
                console.error('Service Worker: Failed to cache app shell', error);
            })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // Ensure new service worker takes control immediately
});

// Fetch event: serve assets from cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Cache hit - return response
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Not in cache - fetch from network
                return fetch(event.request).then(
                    networkResponse => {
                        // Optionally, cache the new resource here if needed
                        return networkResponse;
                    }
                );
            })
            .catch(error => {
                console.error('Service Worker: Error fetching data', error);
                // Optionally, return a fallback page for offline navigation to HTML pages
                // if (event.request.mode === 'navigate') {
                //     return caches.match('/offline.html'); // You would need to create and cache an offline.html
                // }
            })
    );
});
```

### app.js
<!-- filepath: vivos-tracker/app.js -->
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const timerButton = document.getElementById('timerButton');
    const statusIndicator = document.getElementById('statusIndicator');
    const currentSessionTimerDisplay = document.getElementById('currentSessionTimer');
    const dailyTotalDisplay = document.getElementById('dailyTotal');
    const historyList = document.getElementById('historyList');

    let isWearing = false;
    let vivosStartTime = null;
    let sessionInterval;

    const VIVOS_START_TIME_KEY = 'vivosStartTime';
    const VIVOS_HISTORY_KEY = 'vivosHistory';
    const IS_WEARING_KEY = 'isWearing';

    // Load state from localStorage
    loadState();

    timerButton.addEventListener('click', () => {
        if (isWearing) {
            stopWearing();
        } else {
            startWearing();
        }
    });

    function formatDuration(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    function updateCurrentSessionTimer() {
        if (isWearing && vivosStartTime) {
            const now = new Date();
            const elapsed = now - vivosStartTime;
            currentSessionTimerDisplay.textContent = formatDuration(elapsed);
        } else {
            currentSessionTimerDisplay.textContent = "00:00:00";
        }
    }

    function startWearing() {
        vivosStartTime = new Date();
        localStorage.setItem(VIVOS_START_TIME_KEY, vivosStartTime.toISOString());
        isWearing = true;
        localStorage.setItem(IS_WEARING_KEY, 'true');
        
        timerButton.textContent = 'Stop Wearing';
        timerButton.classList.add('active');
        statusIndicator.textContent = 'Wearing';
        
        sessionInterval = setInterval(updateCurrentSessionTimer, 1000);
        updateCurrentSessionTimer(); // Initial call
        console.log('Timer started at:', vivosStartTime);
    }

    function stopWearing() {
        if (!vivosStartTime) return; // Should not happen if logic is correct

        clearInterval(sessionInterval);
        const endTime = new Date();
        const wearDurationMs = endTime - vivosStartTime;
        const wearDurationHours = wearDurationMs / (1000 * 60 * 60);

        const history = JSON.parse(localStorage.getItem(VIVOS_HISTORY_KEY) || '[]');
        const sessionEntry = {
            id: Date.now(), // Unique ID for the session
            date: vivosStartTime.toISOString().split('T')[0],
            startTime: vivosStartTime.toLocaleTimeString(),
            endTime: endTime.toLocaleTimeString(),
            durationHours: parseFloat(wearDurationHours.toFixed(2)),
            durationMs: wearDurationMs
        };
        history.push(sessionEntry);
        localStorage.setItem(VIVOS_HISTORY_KEY, JSON.stringify(history));

        localStorage.removeItem(VIVOS_START_TIME_KEY);
        vivosStartTime = null;
        isWearing = false;
        localStorage.setItem(IS_WEARING_KEY, 'false');

        timerButton.textContent = 'Start Wearing';
        timerButton.classList.remove('active');
        statusIndicator.textContent = 'Not Wearing';
        currentSessionTimerDisplay.textContent = "00:00:00";
        
        console.log('Timer stopped. Duration:', wearDurationHours.toFixed(2), 'hours');
        renderHistory();
        updateDailyTotal();
    }

    function loadState() {
        const storedStartTime = localStorage.getItem(VIVOS_START_TIME_KEY);
        const storedIsWearing = localStorage.getItem(IS_WEARING_KEY);

        if (storedIsWearing === 'true' && storedStartTime) {
            vivosStartTime = new Date(storedStartTime);
            isWearing = true;
            
            timerButton.textContent = 'Stop Wearing';
            timerButton.classList.add('active');
            statusIndicator.textContent = 'Wearing';
            sessionInterval = setInterval(updateCurrentSessionTimer, 1000);
            updateCurrentSessionTimer(); // Update timer display immediately
        } else {
            isWearing = false;
            timerButton.textContent = 'Start Wearing';
            timerButton.classList.remove('active');
            statusIndicator.textContent = 'Not Wearing';
            currentSessionTimerDisplay.textContent = "00:00:00";
        }
        renderHistory();
        updateDailyTotal();
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem(VIVOS_HISTORY_KEY) || '[]');
        historyList.innerHTML = ''; // Clear existing items
        // Display latest entries first
        history.slice().reverse().forEach(entry => {
            const listItem = document.createElement('li');
            listItem.textContent = `Date: ${entry.date}, Start: ${entry.startTime}, End: ${entry.endTime}, Duration: ${entry.durationHours.toFixed(2)} hours`;
            historyList.appendChild(listItem);
        });
    }
    
    function updateDailyTotal() {
        const history = JSON.parse(localStorage.getItem(VIVOS_HISTORY_KEY) || '[]');
        const today = new Date().toISOString().split('T')[0];
        
        const todayEntries = history.filter(entry => entry.date === today);
        const totalTodayHours = todayEntries.reduce((sum, entry) => sum + entry.durationHours, 0);
        
        dailyTotalDisplay.textContent = totalTodayHours.toFixed(2);
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
});
```


## Error Handling and Edge Cases

### Critical Error Scenarios

#### 1. localStorage Quota Exceeded
```javascript
// Add to all localStorage.setItem() calls:
try {
    localStorage.setItem(key, value);
} catch (e) {
    if (e.name === 'QuotaExceededError') {
        // Option 1: Clear old history
        const history = JSON.parse(localStorage.getItem(VIVOS_HISTORY_KEY) || '[]');
        const recentHistory = history.slice(-50); // Keep last 50 sessions
        localStorage.setItem(VIVOS_HISTORY_KEY, JSON.stringify(recentHistory));
        
        // Option 2: Alert user and export data
        alert('Storage full. Please export your data.');
        exportData(); // Function to download JSON
    }
}
```

#### 2. Invalid Date Recovery
```javascript
function loadState() {
    const storedStartTime = localStorage.getItem(VIVOS_START_TIME_KEY);
    const storedIsWearing = localStorage.getItem(IS_WEARING_KEY);

    if (storedIsWearing === 'true' && storedStartTime) {
        try {
            vivosStartTime = new Date(storedStartTime);
            // CRITICAL: Validate date is reasonable
            if (isNaN(vivosStartTime.getTime()) || vivosStartTime > new Date()) {
                throw new Error('Invalid start time');
            }
        } catch (error) {
            // Recovery: Reset to clean state
            console.error('Date parsing failed:', error);
            localStorage.removeItem(VIVOS_START_TIME_KEY);
            localStorage.setItem(IS_WEARING_KEY, 'false');
            isWearing = false;
            return;
        }
    }
}
```

#### 3. Timer Drift and Page Visibility
```javascript
// Handle page visibility changes to prevent timer drift
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page hidden - stop interval to save battery
        if (sessionInterval) {
            clearInterval(sessionInterval);
        }
    } else {
        // Page visible - restart interval if wearing
        if (isWearing && vivosStartTime) {
            sessionInterval = setInterval(updateCurrentSessionTimer, 1000);
            updateCurrentSessionTimer(); // Immediate update
        }
    }
});
```

#### 4. Service Worker Registration Failures
```javascript
// Enhanced service worker registration with fallback
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW registered:', registration.scope);
            })
            .catch(error => {
                console.warn('SW registration failed:', error);
                // App still functions without SW, just no offline capability
                // Optionally notify user about reduced offline functionality
            });
    });
} else {
    console.warn('Service Workers not supported - no offline capability');
}
```

### Data Corruption Prevention
```javascript
function validateHistoryEntry(entry) {
    return entry && 
           typeof entry.id === 'number' &&
           typeof entry.date === 'string' &&
           typeof entry.durationHours === 'number' &&
           entry.durationHours >= 0 &&
           entry.durationHours <= 24; // Reasonable daily max
}

function cleanHistory() {
    const history = JSON.parse(localStorage.getItem(VIVOS_HISTORY_KEY) || '[]');
    const validHistory = history.filter(validateHistoryEntry);
    
    if (validHistory.length !== history.length) {
        console.warn('Removed corrupted history entries');
        localStorage.setItem(VIVOS_HISTORY_KEY, JSON.stringify(validHistory));
    }
    return validHistory;
}
```

### Browser Compatibility Checks
```javascript
// Check for required features at app startup
function checkBrowserSupport() {
    const requirements = {
        localStorage: typeof Storage !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        date: !isNaN(new Date().getTime())
    };
    
    const unsupported = Object.entries(requirements)
        .filter(([feature, supported]) => !supported)
        .map(([feature]) => feature);
    
    if (unsupported.length > 0) {
        console.error('Unsupported features:', unsupported);
        // Display user-friendly error message
    }
    
    return unsupported.length === 0;
}
```
