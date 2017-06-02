// Create app singleton
var shadowReader = new ShadowReader({
  backend: TheGuardian
});

// Initialize fully when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

  // initialize the entire app
  shadowReader.init();

  // install the Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }

});