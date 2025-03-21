const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// specific electron APIs without exposing the entire API
contextBridge.exposeInMainWorld(
  'api', {
    // We can expose functions and variables here if needed
    // For now, we'll just expose a version number
    version: '1.0.0',
    
    // Example of exposing a function that could be used later
    logError: (error) => {
      console.error('Webview Error:', error);
    }
  }
);