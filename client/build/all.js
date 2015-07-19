define('app', ['exports', 'google-map'], function (exports, _googleMap) {
  'use strict';

  angular.module('goBike', [_googleMap.module]).factory('place', place).controller('appCtrl', controller);

  function controller($scope, place) {
    var vm = this;

    vm.send = function () {
      console.log(coordinates($scope.markers));
      if ($scope.markers.length === 0) {
        return Materialize.toast('Selecione pelo menos um local =)', 4000);
      }

      function coordinates(markers) {
        return markers.map(function (marker) {
          return {
            latitude: marker.position.A,
            longitude: marker.position.F
          };
        });
      }

      place.save(coordinates($scope.markers)).then(function () {
        $scope.clearAll();
        Materialize.toast('Seus locais foram enviados. Obrigado por participar =)', 6000);
      })['catch'](function (data) {
        console.log(data);
        Materialize.toast('Desculpe, seus dados não foram enviados.=(', 4000);
      });
    };
  }

  function place($http) {
    return {
      save: function save(markers) {
        return $http({
          method: 'POST',
          url: '/api/places',
          data: markers
        });
      }
    };
  }
});
define('google-map', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var _module = 'maps';

  exports.module = _module;
  angular.module(_module, []).directive('map', directive);

  function directive() {
    return {
      restrict: 'E',
      template: '<div id="map"></div>',
      link: link
    };
  }

  function link(scope, element, attrs) {
    function initialize() {
      var mapOptions = {
        center: { lat: -23.42022, lng: -51.9433462 },
        zoom: 13
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var markers = [];
      scope.markers = markers;

      var removeMarker = function removeMarker(marker) {
        return function () {
          marker.setMap(null);
          markers.splice(markers.indexOf(marker), 1);
        };
      };

      scope.clearAll = function () {
        markers.forEach(function (marker) {
          return marker.setMap(null);
        });
        markers = [];
        scope.markers = markers;
      };

      var addMarker = function addMarker(location) {
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
});
//# sourceMappingURL=all.js.map