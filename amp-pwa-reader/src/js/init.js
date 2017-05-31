// Create app singleton
var shadowReader = new ShadowReader({
  backend: TheGuardian
});

// Initialize fully when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  shadowReader.init();
});