$(document).ready(function () {
  // initialize the map
  var map;
  var myOptions = {
    zoom: 4,
    center: new google.maps.LatLng(39.809734, -98.555620)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
  var counter = 1
  // grab data points from the API
  $.getJSON("http://localhost:5000/api/v1/locations", function (json) {
    var markersArray = []
    var titleArray = []
    var descriptionArray = []
    var location;
    $.each(json, function (i, item) {
      location = item.coordinates.lat + ',' + item.coordinates.lng
      markersArray.push(location)
      titleArray.push(item.title)
      descriptionArray.push(item.description)
    });
    // loop through the array, add new marker
    for (var x=0; x < markersArray.length; x++) {
      $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+markersArray[x]+'&sensor=false', null, function (data) {
        var p = data.results[0].geometry.location
        var latlng = new google.maps.LatLng(p.lat, p.lng);
        // create new marker
        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title: titleArray[counter-1]
        });
        // create info window
        var infowindow = new google.maps.InfoWindow({
          content: "<h4>"+titleArray[counter-1]+"</h4><p>"+descriptionArray[counter-1]+"</p>"
        });
        // click to zoom
        google.maps.event.addListener(marker, 'click', function() {
          map.setZoom(8);
          map.setCenter(marker.getPosition());
          infowindow.open(map, marker)
        });
        // add list of markers
        $("<li />")
          .html(marker.title)
          .click(function(){
            map.panTo(marker.getPosition());
          })
          .appendTo("#list");
        counter++
      });
    }
  });
});