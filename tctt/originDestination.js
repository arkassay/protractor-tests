describe('TwG Category Trends Tool origin destination', function() {

  var scrollToModule = function(moduleElement) {
    browser.driver.executeScript(
      'arguments[0].scrollIntoView(true);', moduleElement.getWebElement());
  }

  // line graph module tests.
  describe('A legend for an interactive line graph',
      function() {
    var originDestModules = element.all(by.css('div[twg-origin-dest]'));

    beforeEach(function() {
      browser.get('https://travel-tool-test-dot-twg-ae-dev.appspot.com/' +
          'category-trends/travel-hotel-q2-2015.html');
    });

    it('should show 10 results on page load.', function() {
      originDestModules.each(function(odModule, index) {
        scrollToModule(odModule);
        var resultElements = odModule.all(by.repeater(
            'result in originDestCtrl.results'));
        expect(resultElements.count()).toEqual(10);
      });
    });

    it('should order the results descending by index query.', function() {
      originDestModules.each(function(odModule, index) {
        var resultElements = odModule.all(by.repeater(
            'result in originDestCtrl.results'));
        var indexQueries = resultElements.all(by.css('.index-query'));
        var indexQueryLast = 0;
        var isOrdered = 0;

        indexQueries.each(function(indexQuery, index) {
          indexQuery.getText().then(function(indexValue) {
            if (index > 0 && indexQueryLast < parseInt(indexValue)) {
              isOrdered += 1;
            }
            indexQueryLast = parseInt(indexValue);

            indexQueries.count().then(function(length) {
              if (index == length - 1) {
                expect(isOrdered).toEqual(0);
              }
            });
          });
        });
      });
    });

    it('should order the results by YoY when sort selection changed to YoY',
        function() {
      originDestModules.each(function(odModule, index) {
        var sortSelector = odModule.element(by.css('select[name=sorting]'));
        sortSelector.click();
        sortSelector.element(by.cssContainingText('option', 'YoY')).click();

        var resultElements = odModule.all(by.repeater(
            'result in originDestCtrl.results'));
        var yoyValues = resultElements.all(by.css('.yoy-perc'));
        var yoyLast = 0;
        var isOrdered = 0;

        yoyValues.each(function(yoyValue, index) {
          yoyValue.getText().then(function(yoyString) {
            var yoy = parseInt(yoyString.replace(/[%\+\-]/g, ''));
            if (index > 0 && yoyLast < yoy) {
              isOrdered += 1;
            }
            yoyLast = yoy;

            yoyValues.count().then(function(length) {
              if (index == length - 1) {
                expect(isOrdered).toEqual(0);
              }
            });
          });
        });
      });
    });

    it('should show 10 results when a new city is selected.', function() {
      originDestModules.each(function(odModule, index) {
        var randomSelectIndex = Math.floor(Math.random() * 24) + 1;
        var sortSelector = odModule.element(by.css('select[name=cities]'));
        sortSelector.click();
        var sortOption = sortSelector.element(by.css('option[value="' +
            randomSelectIndex + '"]'));
        sortOption.click();

        var resultElements = odModule.all(by.repeater(
            'result in originDestCtrl.results'));
        expect(resultElements.count()).toEqual(10);
      });
    });
  });
});
