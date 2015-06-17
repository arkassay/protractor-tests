describe('TwG Category Trends Tool tooltips', function() {
  var isShowing = function(styles) {
    return styles.indexOf('display: block;') > -1 ? true : false;
  }

  // line graph module tests.
  describe('A tooltip for a chart column', function() {
    var tooltips = element.all(by.css('div[twg-tooltip]'));

    beforeEach(function() {
      browser.get('https://travel-tool-test-dot-twg-ae-dev.appspot.com/' +
          'category-trends/travel-hotel-q2-2015.html');
    });

    it('should show tooltip description on hover.', function() {
      var tooltipText;
      var tooltipBox;
      tooltips.each(function(tooltip) {
        browser.actions().mouseMove(tooltip).perform();

        browser.wait(function() {
          tooltipText = tooltip.element(by.css('.tooltip-text'));
          return tooltipText.getAttribute('style').then(function(styles) {
            expect(isShowing(styles)).toBe(true);
            return styles;
          });
        }, 50);

        browser.wait(function() {
          tooltipBox = tooltip.element(by.css('.tooltip-top'));
          return tooltipBox.getAttribute('style').then(function(styles) {
            expect(isShowing(styles)).toBe(true);
            return styles;
          });
        }, 50);
      });
    });
  });
});
