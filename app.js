// Get DOM elements
const timerDisplay = document.querySelector('#timerDisplay');
const startStopBtn = document.querySelector('#startStopBtn');
const resetBtn = document.querySelector('#resetBtn');
const statusDisplay = document.querySelector('#statusDisplay');

// Storage keys - keeping time consistent across sessions
const STORAGE_KEYS = {
    isRunning: 'stopwatch_isRunning',
    currentStartTime: 'stopwatch_currentStartTime',
    accumulatedTime: 'stopwatch_accumulatedTime',
    todaysDate: 'stopwatch_todaysDate',
    allRecords: 'stopwatch_allRecords'
}


// State variables
let currentStartTime = null;
let currentEndTime = null;
let isRunning = false;
let accumulatedTime = 0; // Total time today in milliseconds
let intervalId = null;
let displayUpdateInterval = 1000; // Update every 100 ms
let allRecords = []; // Store all records

/**
* Get today's date as a string (YYYY-MM-DD format)
* @returns {string} today's date
*/
function getTodaysDate() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Save current state to localStorage
 */
function saveState() {
    try {
        localStorage.setItem(STORAGE_KEYS.isRunning, isRunning);
        localStorage.setItem(STORAGE_KEYS.currentStartTime, currentStartTime || '');
        localStorage.setItem(STORAGE_KEYS.accumulatedTime, accumulatedTime);
        localStorage.setItem(STORAGE_KEYS.todaysDate, getTodaysDate());
        localStorage.setItem(STORAGE_KEYS.allRecords, JSON.stringify(allRecords));

        console.log('💾 State saved to localStorage');
    } catch (error) {
        console.warn('⚠️ Could not save to localStorage:', error);
    }
}

/**
 * Load state from localStorage and handle recovery scenarios
 * Get this working and then add a day accumulator and total accumulator or save 
 * the each date's time in a list to localStorage.
 */
function loadState() {
    try {
        const savedDate = localStorage.getItem(STORAGE_KEYS.todaysDate);
        const todaysDate = getTodaysDate();

        // If it's a new day, reset accumulated time
        if (savedDate !== todaysDate) {
            console.log('🌅 New day detected - resetting daily accumulated time');
        // if timer is running then end session at midnight and start a new one
            accumulatedTime = 0;
            currentStartTime = null;  // this should be midnight 12 am
            isRunning = false;
            saveState(); // Save the reset state
            return;
        }

        // Load saved values
        const savedIsRunning = localStorage.getItem(STORAGE_KEYS.isRunning) === 'true';
        const savedStartTime = localStorage.getItem(STORAGE_KEYS.currentStartTime);
        const savedAccumulatedTime = parseInt(localStorage.getItem(STORAGE_KEYS.accumulatedTime) || '0');

        accumulatedTime = savedAccumulatedTime;

        // Handle crash recovery - was the timer running when we left?
        if (savedIsRunning && savedStartTime) {
            const savedStart = parseInt(savedStartTime);
            const now = Date.now();
            const timeSinceStart = now - savedStart;

            // Sanity check - if more than 24 hours, something's wrong
            // With daily saves reset to previous day end or somthing like that
            if (timeSinceStart > 24 * 60 * 60 * 1000) {
                console.log('🚨 Crash recovery: Timer was running too long, resetting');
                resetStopwatch();
                return;
            }

            // Resume the timer from where it left off
            console.log('🔄 Crash recovery: Resuming timer that was running');
            currentStartTime = savedStart;
            isRunning = true;
            startInterval();
            updateButtonState();

            statusDisplay.textContent = 'Recovered from crash - timer was running';
        } else {
            // Timer wasn't running, just restore accumulated time
            console.log('📖 Loaded saved state - timer was stopped');
            isRunning = false;
            currentStartTime = null;
            updateDisplay();

            if (accumulatedTime > 0) {
                statusDisplay.textContent = `Resumed - ${formatTime(accumulatedTime)} accumulated today`;
            }
        }

    } catch (error) {
        console.warn('⚠️ Could not load from localStorage:', error);
        resetStopwatch();
    }
}

/**
 * Format milliseconds into HH:MM:SS display
 * @param {number} ms - milliseconds to format
 * @returns {string} formatted time string
 */
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // We don't need milliseconds for this simple timer, but we can include them if needed
    // const milliseconds = Math.floor((ms % 1000) / displayUpdateInterval);
    // for the format output :${milliseconds.toString().padStart(1, '0')}

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
  * Calculate total time to display (accumulated + current session)
  * @returns {number} total milliseconds
  */
function getTotalTime() {
    let total = accumulatedTime;

    if (isRunning && currentStartTime) {
        const currentSession = Date.now() - currentStartTime;
        total += currentSession;
    }

    return total;
}

/**
 * Update the time display
 */
function updateDisplay() {
    const totalTime = getTotalTime();
    timerDisplay.textContent = formatTime(totalTime);
}

/**
 * Update button states based on current running state
 */
function updateButtonState() {
    if (isRunning) {
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('stop');
        statusDisplay.textContent = 'Timer running...';
    } else {
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop');
        if (accumulatedTime > 0) {
            statusDisplay.textContent = `Stopped - Total today: ${formatTime(accumulatedTime)}`;
        } else {
            statusDisplay.textContent = 'Ready to start';
        }
    }
}

/**
 * Start the update interval
 */
function startInterval() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(updateDisplay, displayUpdateInterval);
}


/**
     * Start the stopwatch
     */
function startStopwatch() {
    currentStartTime = Date.now();
    isRunning = true;

    updateButtonState();
    startInterval();
    saveState(); // Persist the start immediately

    console.log('⏱️ Stopwatch started');
}

/**
 * Stop the stopwatch and accumulate the time
 */
function stopStopwatch() {
    if (!isRunning || !currentStartTime) return;

    // Get the end time of the current session
    currentEndTime = Date.now();

    // Calculate the session time and add to accumulated
    const sessionTime = currentEndTime - currentStartTime;
    accumulatedTime += sessionTime;

    // Save and update the allRecords with each session
    allRecords = localStorage.getItem(STORAGE_KEYS.allRecords);
    if (!allRecords) {
        allRecords = [];
    } else {
        allRecords = JSON.parse(allRecords);
        allRecords.push({
            sessionTime: sessionTime,
            startTime: new Date(currentStartTime).getTime(),
            endTime: new Date(currentEndTime).getTime()
        });
    }


    // Clear running state
    isRunning = false;
    currentStartTime = null;
    currentEndTime = null;

    // Stop the interval
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    updateButtonState();
    updateDisplay();
    saveState(); // Persist the accumulated time

    console.log(`⏹️ Stopwatch stopped - Session: ${formatTime(sessionTime)}, Total today: ${formatTime(accumulatedTime)}`);
}

/**
 * Reset the stopwatch completely
 * Change this to reset the last session or something. We don't want to lose the
 * accumulated time across days
 * or reset for our purposes means make sure the display shows the correct accumulated time
 * for the current date.
 */
function resetStopwatch() {
    // Stop any running timer
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    // Reset all state
    isRunning = false;
    currentStartTime = null;
    accumulatedTime = 0;

    updateButtonState();
    updateDisplay();
    saveState();

    statusDisplay.textContent = 'Reset - Ready to start';
    console.log('🔄 Stopwatch reset');
}

/**
* Handle start/stop button clicks
*/
function handleStartStop() {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
}

/**
 * Handle page visibility changes to prevent timer drift
 */
function handleVisibilityChange() {
    if (document.hidden) {
        // Page hidden - save state but keep timer running
        if (isRunning) {
            saveState();
            console.log('📱 Page hidden - state saved');
        }
    } else {
        // Page visible - update display immediately
        if (isRunning) {
            updateDisplay();
            console.log('📱 Page visible - display updated');
        }
    }
}


// Set up event listeners
startStopBtn.addEventListener("click", handleStartStop);
resetBtn.addEventListener('click', resetStopwatch);

// Optional: Add mobile touch event listeners?

// Handle page visibility changes (mobile apps, tab switching)
document.addEventListener('visibilitychange', handleVisibilityChange);

// Save state when page is about to unload
window.addEventListener('beforeunload', () => {
    if (isRunning) {
        saveState();
        console.log('💾 Saving state before page unload');
    }
});

// Optional: Keyboard support
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault();
        handleStartStop();
    } else if (event.code === 'KeyR') {
        event.preventDefault();
        resetStopwatch();
    }
});

// Initialize the app
console.log('🚀 Persistent Stopwatch loading...');
loadState();
updateButtonState();
updateDisplay();
console.log('✅ Stopwatch ready! Space = start/stop, R = reset');

// Initialize the timer variable
// startTimer function - records the start time in unix time and updates the display each second. if something happens to the app we can use the saved start time to pick up where we left off start/stop event. How to handle crashes/missing stops?
// also continues to add on to the displayed time on subsequent starts.
// stopTimer function - stops the timer and saves the current time
// stopTimer or another saving function should also save the time if the 'app' is closed or refreshed to avoid losing data. Or we just keep counting until we get a stop event.
// have a widget that can be used to start/stop the timer and display the current time from the homescreen
// eventully have a create entry/past entry editor to help recover from missed start/stop events.
// have a stats display that shows metrics with an advanced view for more detailed stats
// have a message display that shows the last actions, scrollable, consider storing as message history later
// actions can be started at, stopped at, saved at, something like that
// Feature: Handle timezones in allRecords
// Prevent double click zoom
// Allow allRecords to persist across sessions and refreshes

