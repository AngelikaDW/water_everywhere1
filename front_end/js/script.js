// This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
  //global Variables to manage the map and the marker for the position of the search
  var map, userPosition;

  map = initMap(map);
  // Create the search box using autocomplete and link it to the UI element.
  var inputSearch = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(inputSearch);
  /*map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputSearch);*/
  autocomplete.bindTo('bounds', map)

  //Listen when the user type in the searcbox and select a address
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }
    //remove the old marker position if exist
    if(userPosition) {
      userPosition.setMap(null);
    }
    //Set marker position for the current address
    map.setCenter(place.geometry.location);
    map.setZoom(17);
    userPosition = addMarkerCurrentPosition(place, map);
  });
}

/**
* Function to add in the map a marker with the current position of the searc
*/
function addMarkerCurrentPosition (place, map){
  var marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map
  });
  marker.setIcon(/** @type {google.maps.Icon} */({
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(35, 35)
  }));
  marker.setVisible(true);
  return marker;
}

/**
* Function to initialize the map and add All the markers
*/
function initMap(map) {

  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: new google.maps.LatLng(52.37, 4.9),
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  AddMarkersToMap(map);
  return map;
}

function AddMarkersToMap(map) {
  var infowindow = new google.maps.InfoWindow({});

  var marker, i;

  for (i = 0; i < myData.length; i++) {
      marker = new google.maps.Marker({
          position: new google.maps.LatLng(myData[i][0], myData[i][1]),
          map: map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
              infowindow.setContent(myData[i][2]);
              infowindow.open(map, marker);
          }
      })(marker, i));
  }
}

document.getElementById('showMap').onclick = function() {
    document.getElementById('map').style.visibility = 'visible';
    // document.getElementById('intro').style.visibility = 'hidden';
}
