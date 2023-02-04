describe('Bookmark stops', function() {
    beforeEach(function() {
      localStorage.clear();
    });
  
    it('bookmarks a stop', function() {
      var stopId = '900000550002';
      $('.bookmark-btn').data('stop', stopId).click();
      var bookmarkedStops = JSON.parse(localStorage.getItem('bookmarkedStops'));
      expect(bookmarkedStops).toEqual([stopId]);
    });
  
    it('does not allow duplicates', function() {
      var stopId = '900000550002';
      $('.bookmark-btn').data('stop', stopId).click();
      $('.bookmark-btn').data('stop', stopId).click();
      var bookmarkedStops = JSON.parse(localStorage.getItem('bookmarkedStops'));
      expect(bookmarkedStops).toEqual([stopId]);
    });
  });
  