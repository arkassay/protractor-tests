describe('TwG Category Trends Tool line graph', function() {
  var hasClass = function(elClasses, classname) {
    return elClasses.indexOf(classname) > -1 ? true : false;
  }

  var isShowing = function(styles) {
    return styles.indexOf('display: block;') > -1 ? true : false;
  }

  var scrollToModule = function(moduleElement) {
    browser.driver.executeScript(
      'arguments[0].scrollIntoView(true);', moduleElement.getWebElement());
  }

  // line graph module tests.
  describe('A legend for an interactive line graph',
      function() {
    var graphModule = element(by.css('.line-graph'));
    var legendElements = element.all(by.repeater('item in searchGraphCtrl.legendItems'));
    var graphLines = element(by.css('.group-lines'));

    beforeEach(function() {
      browser.get('https://travel-tool-test-dot-twg-ae-dev.appspot.com/' +
          'category-trends/travel-hotel-q2-2015.html');
      scrollToModule(graphModule);
    });

    it('should have all legend items.', function() {
      expect(legendElements.count()).toEqual(6);
    });

    it('should have the current category as the only active line',
        function() {
      var activeLines = graphLines.all(by.css('.active'));
      expect(activeLines.count()).toEqual(1);
    });

    it('should toggle itself and it\'s corresponding line on/off when clicked',
        function() {
      element(by.css('.category-content')).getAttribute(
          'data-travel-category').then(function(currentCategory) {
        legendElements.each(function(legendEl, index) {
          var elementToggle = legendEl.element(by.css('.color'));
          var isOff = true;
          var line = null;
          var offClass = 'off';

          elementToggle.getAttribute('data-line-id').then(
              function(lineId) {
            line = graphLines.element(by.id(lineId));
              elementToggle.getAttribute('class').then(function(elClasses) {
                isOff = hasClass(elClasses, offClass);
                legendEl.click();
                if (lineId != currentCategory) {
                  // Non-current categories should toggle on/off.
                  elementToggle.getAttribute('class').then(function(elClasses) {
                    expect(hasClass(elClasses, offClass)).toBe(!isOff);
                  });
                  line.getAttribute('class').then(function(elClasses) {
                    expect(hasClass(elClasses, offClass)).toBe(!isOff);
                  });
                } else {
                  // The current category should never turn off.
                  elementToggle.getAttribute('class').then(function(elClasses) {
                    expect(hasClass(elClasses, offClass)).toBe(false);
                  });
                  line.getAttribute('class').then(function(elClasses) {
                    expect(hasClass(elClasses, offClass)).toBe(false);
                  });
                }
              });

          });
        });
      });
    });
  });

  describe('Insight points on the current category line',
      function() {
    var insightPoints = element.all(by.css('.graph-insight'));

    beforeEach(function() {
      browser.get('https://travel-tool-test-dot-twg-ae-dev.appspot.com/' +
          'category-trends/travel-hotel-q2-2015.html');
    });

    it('should show an insight on page load.', function() {
      var insightBox = element(by.css('.insight-box'));
      insightBox.getAttribute('style').then(function(styles) {
        expect(isShowing(styles)).toBe(true);
      });
    });

    it('should hide an insight on click outside the insight.', function() {
      var graphEl = element(by.css('.svg-line-graph'));
      var insightBox = element(by.css('.insight-box'));
      graphEl.click();
      insightBox.getAttribute('style').then(function(styles) {
        expect(isShowing(styles)).toBe(false);
      });
    });

    it('should show an insight on hover.', function() {
      insightPoints.each(function(insightPoint, index) {
        // First turn off the insight box.
        var graphEl = element(by.css('.svg-line-graph'));
        graphEl.click();
        // Then hover over the next insight point.
        browser.actions().mouseMove(insightPoint).perform();
        var insightBox = element(by.css('.insight-box'));
        insightBox.getAttribute('style').then(function(styles) {
          expect(isShowing(styles)).toBe(true);
        });
      });
    });
  });
});
