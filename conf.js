// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['lineGraph.js', 'originDestination.js'],
  onPrepare: function() {
    browser.driver.manage().window().maximize();
  }
}
