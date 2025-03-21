// Get DOM elements
const webview = document.getElementById('webview');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const reloadBtn = document.getElementById('reloadBtn');
const homeBtn = document.getElementById('homeBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorOverlay = document.getElementById('errorOverlay');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');

const HOME_URL = 'https://ainprokash.com';

// Navigation button handlers
backBtn.addEventListener('click', () => {
    if (webview.canGoBack()) {
        webview.goBack();
    }
});

forwardBtn.addEventListener('click', () => {
    if (webview.canGoForward()) {
        webview.goForward();
    }
});

reloadBtn.addEventListener('click', () => {
    webview.reload();
});

homeBtn.addEventListener('click', () => {
    webview.loadURL(HOME_URL);
});

retryBtn.addEventListener('click', () => {
    errorOverlay.classList.add('hidden');
    webview.reload();
});

// Update navigation button states
webview.addEventListener('did-start-loading', () => {
    loadingSpinner.classList.remove('hidden');
    errorOverlay.classList.add('hidden');
});

webview.addEventListener('did-stop-loading', () => {
    loadingSpinner.classList.add('hidden');
    updateNavigationState();
});

webview.addEventListener('did-fail-load', (event) => {
    loadingSpinner.classList.add('hidden');
    
    // Show error overlay with appropriate message
    if (event.errorCode !== -3) { // Ignore user aborted requests
        errorMessage.textContent = `Failed to load the webpage. (Error: ${event.errorDescription})`;
        errorOverlay.classList.remove('hidden');
        
        // Log error if API is available
        if (window.api) {
            window.api.logError({
                code: event.errorCode,
                description: event.errorDescription,
                url: event.validatedURL
            });
        }
    }
});

// Update navigation buttons based on webview state
function updateNavigationState() {
    backBtn.disabled = !webview.canGoBack();
    forwardBtn.disabled = !webview.canGoForward();
}

// Initial state
updateNavigationState();