/* Custom JS for toggling details icons (for older browsers or extra control) */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('summary').forEach(function(summary) {
    summary.addEventListener('click', function() {
      // No-op: CSS handles the +/−, but this can be extended if needed
    });
  });
});
