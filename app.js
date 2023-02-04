$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var stop = $('#stop-search').val();

    $.get('https://v5.vbb.transport.rest/locations?query=' + stop, function(data) {
      var html = '';
      console.log(data)
      $.each(data, function(index, value) {
        html += '<div class="result">';
        html += '<h3>' + value.name + '</h3>';
        html += '<p>Transport options: ';
        for (var prop in value.products) {
          if (value.products[prop]) {
            html += prop + ', ';
          }
        }
        html = html.substring(0, html.length - 2);
        html += '</p>';
        html += '<button class="detail-btn" data-stop="' + value.id + '">View Details</button>';
        html += '<button class="bookmark-btn" data-stop="' + value.id + '">Bookmark</button>';
        html += '</div>';
      });
      
      
      $('#results').html(html);
    });
  });
});

$(document).on('click', '.detail-btn', function() {
  var stopId = $(this).data('stop');
  console.log(stopId);
  $.get('https://v5.vbb.transport.rest/stops/' + stopId + '/departures', function(data) {
    console.log(data)
    var html = '<h2>Departures from ' + data.destination+ '</h2><ul>';
    $.each(data, function(index, value) {
      html += '<div class="result">';
      html += '<h3>Direction: ' + value.direction + '</h3>';
      html += '<p>Destination: ' + value.destination.name + '</p>';
      html += '<p>Line: ' + value.line.name + ' (' + value.line.fahrtNr + ')' + '</p>';
      html += '<p>Planned Platform: ' + value.plannedPlatform + '</p>';
      html += '<p>Planned Time: ' + value.plannedWhen + '</p>';
      html += '<p>Platform: ' + value.platform + '</p>';
      html += '<p>Stop: ' + value.stop.name + '</p>';
      html += '<p>Trip ID: ' + value.tripId + '</p>';
      html += '<p>Time: ' + value.when + '</p>';
      html += '</div>';
    });
    
    html += '</ul>';
    $('#results').html(html);
  });
});

$(document).on('click', '.bookmark-btn', function() {
  var stopId = $(this).data('stop');
  var stops = new Set(JSON.parse(localStorage.getItem('bookmarkedStops')) || []);
  stops.add(stopId);
  localStorage.setItem('bookmarkedStops', JSON.stringify(Array.from(stops)));
});

$(document).ready(function() {
  var bookmarkedStops = JSON.parse(localStorage.getItem('bookmarkedStops')) || [];
  console.log(bookmarkedStops)
  if (bookmarkedStops.length > 0) {
    var html = '<h2>Bookmarked Stops</h2><ul>';
    var requests = [];
    $.each(bookmarkedStops, function(index, value) {
      requests.push($.get('https://v5.vbb.transport.rest/stops/' + value));
    });
    $.when.apply($, requests).then(function() {
      for (var i = 0; i < arguments.length; i++) {
        html += '<li>' + arguments[i][0].name + '</li>';
      }
      html += '</ul>';
      $('#results').append(html);
    });
  }
});



