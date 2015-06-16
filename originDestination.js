describe('TwG Category Trends Tool origin destination', function() {
  var hasClass = function(elClasses, classname) {
    return elClasses.indexOf(classname) > -1 ? true : false;
  }

  var isShowing = function(styles) {
    return styles.indexOf('display: block;') > -1 ? true : false;
  }

  // line graph module tests.
  describe('A legend for an interactive line graph',
      function() {
    var resultWrapper = element.all(by.css('.result-wrapper'));

    beforeEach(function() {
      browser.get('https://travel-tool-test-dot-twg-ae-dev.appspot.com/category-trends/travel-hotel-q2-2015.html');
    });

    it('should show 10 results on page load.', function() {
      resultWrapper.each(function(resultSet, index) {
        var resultElements = resultSet.all(by.repeater('result in originDestCtrl.results'));
        expect(resultElements.count()).toEqual(10);
      });
    });

    it('should order the results by index query.', function() {
      resultWrapper.each(function(resultSet, index) {
        var resultElements = resultSet.all(by.repeater('result in originDestCtrl.results'));
        var indexQueries = resultElements.all(by.css('.index-query'));
      });
    });
  });
});
