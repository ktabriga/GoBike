var module = 'maps';

export default module;

angular.module(module, [])
  .directive('map', directive);

function directive() {
  return {
    restrict: 'E',
    template: '<div id="map"></div>',
    link
  }
}

function link(scope, element, attrs) {
  function initialize() {
    var mapOptions = {
      center: { lat: -23.42022, lng: -51.9433462},
      zoom: 13
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var markers = [];
    scope.markers = markers;

    var removeMarker = marker => {
      return function () {
        marker.setMap(null);
        markers.splice(markers.indexOf(marker), 1);
      }
    };

    scope.clearAll = () => {
      markers.forEach(marker => marker.setMap(null));
      markers = [];
      scope.markers = markers;
    };

    var addMarker  = location => {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      markers.push(marker);
      google.maps.event.addListener(marker, 'click', removeMarker(marker));
    };

    google.maps.event.addListener(map, 'click', function (event) {
      addMarker(event.latLng);
    });
  }


  google.maps.event.addDomListener(window, 'load', initialize);
}