// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['lineGraph.js', 'originDestination.js', 'tooltips.js'],
  // specs: ['tooltips.js'],
  onPrepare: function() {
    browser.driver.manage().window().maximize();
  }
}
