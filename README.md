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

---

## Code Analysis & Implementation Plan

### Problems Identified

#### 1. **Critical: allRecords Not Being Persisted to localStorage**
- **Location**: `app.js`, lines 217-258 (saveState function)
- **Issue**: The `saveState()` function loads `allRecords` from storage but never saves it back. The line that should persist allRecords is commented out (line 250).
- **Impact**: Session records are stored in memory during runtime but lost on page refresh/reload
- **Severity**: HIGH - Data loss issue

#### 2. **allRecords Array Management Issues**
- **Location**: `app.js`, lines 131-151 (stopStopwatch function)
- **Issue**: `loadAllRecordsFromStorage()` is called in `stopStopwatch()` before pushing a new record, but there's no corresponding save after the push
- **Impact**: New session records are added to the in-memory array but not persisted
- **Severity**: HIGH - Data loss issue

#### 3. **Incorrect Boolean Constructor Usage**
- **Location**: `app.js`, line 141
- **Issue**: `isComplete: new Boolean(currentComplete)` creates a Boolean object instead of a primitive
- **Impact**: Boolean objects always evaluate to true in conditionals, even if wrapping `false`
- **Severity**: MEDIUM - Logic bug
- **Fix**: Use `isComplete: Boolean(currentComplete)` or just `isComplete: currentComplete`

#### 4. **Missing Service Worker Implementation**
- **Location**: `app.js`, line 93; File structure
- **Issue**: Service worker registration is marked as TODO, and `service-worker.js` file doesn't exist in root directory
- **Impact**: PWA lacks offline functionality, won't work without network
- **Severity**: MEDIUM - Missing core PWA feature

#### 5. **Date Reset Logic Not Implemented**
- **Location**: `app.js`, storage management
- **Issue**: The app stores `todaysDate` but never checks if a new day has started to reset `accumulatedTime`
- **Impact**: Daily totals accumulate across multiple days
- **Severity**: MEDIUM - Incorrect data tracking

#### 6. **Incomplete Error Recovery**
- **Location**: `app.js`, lines 274-310 (loadState function)
- **Issue**: Recovery logic handles running timers but doesn't handle incomplete sessions from crashes
- **Impact**: Crashed/interrupted sessions are not marked or recovered properly
- **Severity**: LOW-MEDIUM - Data quality issue

#### 7. **Commented Out Code in Critical Functions**
- **Location**: `app.js`, lines 224-250
- **Issue**: Large blocks of commented code in the `saveState()` function create confusion
- **Impact**: Code maintainability and clarity issues
- **Severity**: LOW - Code quality issue

#### 8. **Inconsistent Date Handling**
- **Location**: `app.js`, various locations
- **Issue**: Mix of timestamps (milliseconds), Date objects, and ISO strings without clear patterns
- **Impact**: Potential timezone and date comparison bugs
- **Severity**: LOW-MEDIUM - Code quality and potential bugs

#### 9. **Missing Data Visualization and Export Features**
- **Location**: Overall application
- **Issue**: Phase 4-6 features listed in README but not implemented (charts, export, streaks)
- **Impact**: Incomplete feature set
- **Severity**: LOW - Planned features, not bugs

#### 10. **No Daily History Display**
- **Location**: `index.html`, `app.js`
- **Issue**: No UI component to display session history or daily totals
- **Impact**: Users can't see their historical data
- **Severity**: MEDIUM - Missing key feature

#### 11. **Incomplete Visibility Change Handling**
- **Location**: `app.js`, lines 427-444
- **Issue**: Visibility change handler doesn't verify timer accuracy after returning from background
- **Impact**: Timer may drift on mobile devices after extended background time
- **Severity**: LOW - Edge case issue

#### 12. **Missing Input Validation**
- **Location**: `app.js`, various functions
- **Issue**: No validation for localStorage data integrity or corrupted state
- **Impact**: App could crash or behave incorrectly with corrupted localStorage
- **Severity**: LOW-MEDIUM - Robustness issue

---

### Implementation Plan

#### **Phase 1: Critical Bug Fixes (Priority: URGENT)**

1. **Fix allRecords Persistence**
   - Uncomment and fix line 250 in `saveState()` to persist allRecords
   - Add `localStorage.setItem(STORAGE_KEYS.allRecords, JSON.stringify(allRecords));` after loading records
   - Test: Verify records persist across page reloads

2. **Fix Boolean Constructor Bug**
   - Replace `new Boolean(currentComplete)` with `currentComplete` or `Boolean(currentComplete)`
   - Test: Verify isComplete field stores correctly

3. **Implement Date Reset Logic**
   - Add date comparison in `loadState()` to check if it's a new day
   - Reset `accumulatedTime` to 0 when a new day is detected
   - Update `todaysDate` in localStorage
   - Test: Verify accumulated time resets at midnight

#### **Phase 2: Data Management Improvements (Priority: HIGH)**

4. **Improve Session Recovery**
   - Enhance crash recovery to mark interrupted sessions in flags
   - Add logic to handle sessions that span midnight (crossesMidnight flag)
   - Implement longDuration flag checking and user warning
   - Test: Simulate crashes and verify recovery

5. **Add Data Validation**
   - Add try-catch blocks with fallback to default state
   - Validate localStorage data structure before using
   - Add migration logic for future version changes
   - Test: Corrupt localStorage and verify graceful handling

6. **Refactor Date Handling**
   - Standardize on ISO strings for storage, milliseconds for calculations
   - Create utility functions for date conversions
   - Document timezone handling approach
   - Test: Verify dates handle timezone changes

#### **Phase 3: UI/UX Enhancements (Priority: MEDIUM)**

7. **Add Session History Display**
   - Create HTML section for displaying session history
   - Add JavaScript to render allRecords in reverse chronological order
   - Style the history list with CSS
   - Add date grouping for sessions
   - Test: Verify history displays correctly with multiple sessions

8. **Add Daily Summary Display**
   - Create UI component showing daily total
   - Calculate and display today's accumulated time from allRecords
   - Add visual indicator for daily goal (if applicable)
   - Test: Verify daily totals match recorded sessions

9. **Remove Commented Code**
   - Clean up commented code blocks in saveState()
   - Add clear comments explaining the logic flow
   - Document why allRecords is loaded then saved
   - Code review: Verify no functional code was removed

#### **Phase 4: Service Worker Implementation (Priority: MEDIUM)**

10. **Create Service Worker**
    - Create `service-worker.js` file in root directory
    - Implement basic caching strategy for offline support
    - Add install, activate, and fetch event listeners
    - Register service worker in app.js (line 93)
    - Test: Verify app works offline

11. **Add Update Mechanism**
    - Implement service worker update detection
    - Add UI notification for available updates
    - Handle cache versioning
    - Test: Verify updates work correctly

#### **Phase 5: Advanced Features (Priority: LOW)**

12. **Add Data Export**
    - Create export button in UI
    - Implement JSON export of allRecords
    - Add CSV export option
    - Include date range filtering
    - Test: Verify exported data is complete and valid

13. **Implement Data Visualization**
    - Choose charting library (Chart.js or similar)
    - Create weekly statistics calculation
    - Add bar chart or line graph for wear time trends
    - Style the visualization section
    - Test: Verify charts display accurate data

14. **Add Streak Tracking**
    - Implement consecutive days calculation
    - Add streak display in UI
    - Store streak data in localStorage
    - Add streak reset logic
    - Test: Verify streaks calculate correctly

#### **Phase 6: Polish & Optimization (Priority: LOW)**

15. **Performance Optimization**
    - Minimize localStorage read/write operations
    - Consider moving to IndexedDB for large datasets
    - Optimize display update frequency
    - Add debouncing where appropriate
    - Test: Measure and verify performance improvements

16. **Enhanced Error Handling**
    - Add user-friendly error messages
    - Implement toast notifications for events
    - Add confirmation dialogs for destructive actions
    - Log errors to help with debugging
    - Test: Verify all error paths display appropriately

17. **Accessibility Improvements**
    - Add ARIA labels to buttons and displays
    - Ensure keyboard navigation works
    - Test with screen readers
    - Verify color contrast ratios
    - Test: Run accessibility audit

---

### Testing Checklist

- [ ] Unit tests for data management functions
- [ ] Integration tests for timer functionality
- [ ] localStorage persistence tests
- [ ] Service worker caching tests
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Offline functionality testing
- [ ] Long-running session testing (>24 hours)
- [ ] Midnight rollover testing
- [ ] Crash recovery testing
- [ ] PWA installation testing

---

### Deployment Notes

- Current deployment: GitHub Pages at https://tjtripp.github.io/vivos-tracker/
- PWA must be reinstalled after updates to see changes
- Consider adding update notification system
- Document update process for users

---

### Future Enhancements (Post-MVP)

- Push notifications for wear reminders
- Cloud backup/sync across devices
- Goal setting and achievement tracking
- Customizable wear time targets
- Integration with health apps
- Multi-device support
- Dark/light theme toggle
- Localization for multiple languages
