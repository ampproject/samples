// Detect the currently used 'backend'
let detectedBackend = location.pathname.match(/^\/([^\/]+)/);

// Create app singleton as global
window.shadowReader = new ShadowReader({
  backend: detectedBackend ? Backend.get(detectedBackend[1]) : TheGuardian
});

// Initialize fully when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

  // initialize the entire app
  shadowReader.init();

  // install the Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

});