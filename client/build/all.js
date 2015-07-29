(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _googleMap = require('./google-map');

var _googleMap2 = _interopRequireDefault(_googleMap);

angular.module('goBike', [_googleMap2['default']]).factory('place', place).controller('appCtrl', controller);

function controller($scope, place) {
  var vm = this;

  vm.send = function () {
    if ($scope.markers.length === 0) {
      return toast("Selecione pelo menos um local");
    }

    function coordinates(markers) {
      return markers.map(function (marker) {
        return {
          latitude: marker.position.G,
          longitude: marker.position.K
        };
      });
    }

    place.save(coordinates($scope.markers)).then(function () {
      $scope.clearAll();
      toast('Seus locais foram enviados. Obrigado por participar =)');
    })['catch'](function (data) {
      toast('Desculpe, seus dados não foram enviados.=(');
    });
  };

  function toast(msg) {
    Materialize.toast(msg, 4000);
  }
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

},{"./google-map":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _module = 'maps';

exports['default'] = _module;

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
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvQ2F0YWJyaWdhL1Byb2pldG9zL2dvQmlrZS9jbGllbnQvc3JjL2FwcC5qcyIsIi9Vc2Vycy9DYXRhYnJpZ2EvUHJvamV0b3MvZ29CaWtlL2NsaWVudC9zcmMvZ29vZ2xlLW1hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7eUJDQWlCLGNBQWM7Ozs7QUFFL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsd0JBQU0sQ0FBQyxDQUM3QixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUN2QixVQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUVyQyxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ2pDLE1BQUksRUFBRSxHQUFHLElBQUksQ0FBQzs7QUFFZCxJQUFFLENBQUMsSUFBSSxHQUFHLFlBQU07QUFDZCxRQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMvQixhQUFPLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0tBQzlDOztBQUVELGFBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUM1QixhQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNO2VBQUs7QUFDNUIsa0JBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDM0IsbUJBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7T0FBQyxDQUFDLENBQUE7S0FDSjs7QUFFRCxTQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDcEMsSUFBSSxDQUFDLFlBQU07QUFDVixZQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEIsV0FBSyxDQUFDLHdEQUF3RCxDQUFDLENB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QU0sQ0FBQyxDQUFDO0tBQ3pCLENBQUMsQ0FBQztHQUNKOztBQUdELFFBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0NBQzlEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBtYXBzIGZyb20gJy4vZ29vZ2xlLW1hcCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdnb0Jpa2UnLCBbbWFwc10pXG4gIC5mYWN0b3J5KCdwbGFjZScsIHBsYWNlKVxuICAuY29udHJvbGxlcignYXBwQ3RybCcsIGNvbnRyb2xsZXIpO1xuXG5mdW5jdGlvbiBjb250cm9sbGVyKCRzY29wZSwgcGxhY2UpIHtcbiAgdmFyIHZtID0gdGhpcztcblxuICB2bS5zZW5kID0gKCkgPT4ge1xuICAgIGlmICgkc2NvcGUubWFya2Vycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0b2FzdChcIlNlbGVjaW9uZSBwZWxvIG1lbm9zIHVtIGxvY2FsXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29vcmRpbmF0ZXMobWFya2Vycykge1xuICAgICAgcmV0dXJuIG1hcmtlcnMubWFwKG1hcmtlciA9PiAoe1xuICAgICAgICBsYXRpdHVkZTogbWFya2VyLnBvc2l0aW9uLkcsXG4gICAgICAgIGxvbmdpdHVkZTogbWFya2VyLnBvc2l0aW9uLktcbiAgICAgIH0pKVxuICAgIH1cblxuICAgIHBsYWNlLnNhdmUoY29vcmRpbmF0ZXMoJHNjb3BlLm1hcmtlcnMpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAkc2NvcGUuY2xlYXJBbGwoKTtcbiAgICAgICAgdG9hc3QoJ1NldXMgbG9jYWlzIGZvcmFtIGVudmlhZG9zLiBPYnJpZ2FkbyBwb3IgcGFydGljaXBhciA9KScpXG4gICAgICB9KS5jYXRjaChkYXRhID0+IHtcbiAgICAgICAgdG9hc3QoJ0Rlc2N1bHBlLCBzZXVzIGRhZG9zIG7Do28gZm9yYW0gZW52aWFkb3MuPSgnKVxuICAgICAgfSlcblxuICB9O1xuXG4gIGZ1bmN0aW9uIHRvYXN0KG1zZykge1xuICAgIE1hdGVyaWFsaXplLnRvYXN0KG1zZywgNDAwMClcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGFjZSgkaHR0cCkge1xuICByZXR1cm4ge1xuICAgIHNhdmUobWFya2Vycykge1xuICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9hcGkvcGxhY2VzJyxcbiAgICAgICAgZGF0YTogbWFya2Vyc1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSIsInZhciBtb2R1bGUgPSAnbWFwcyc7XG5cbmV4cG9ydCBkZWZhdWx0IG1vZHVsZTtcblxuYW5ndWxhci5tb2R1bGUobW9kdWxlLCBbXSlcbiAgLmRpcmVjdGl2ZSgnbWFwJywgZGlyZWN0aXZlKTtcblxuZnVuY3Rpb24gZGlyZWN0aXZlKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGlkPVwibWFwXCI+PC9kaXY+JyxcbiAgICBsaW5rXG4gIH1cbn1cblxuZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgIGNlbnRlcjogeyBsYXQ6IC0yMy40MjAyMiwgbG5nOiAtNTEuOTQzMzQ2Mn0sXG4gICAgICB6b29tOiAxM1xuICAgIH07XG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCBtYXBPcHRpb25zKTtcblxuICAgIHZhciBtYXJrZXJzID0gW107XG4gICAgc2NvcGUubWFya2VycyA9IG1hcmtlcnM7XG5cbiAgICB2YXIgcmVtb3ZlTWFya2VyID0gbWFya2VyID0+IHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgICAgIG1hcmtlcnMuc3BsaWNlKG1hcmtlcnMuaW5kZXhPZihtYXJrZXIpLCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2NvcGUuY2xlYXJBbGwgPSAoKSA9PiB7XG4gICAgICBtYXJrZXJzLmZvckVhY2gobWFya2VyID0+IG1hcmtlci5zZXRNYXAobnVsbCkpO1xuICAgICAgbWFya2VycyA9IFtdO1xuICAgICAgc2NvcGUubWFya2VycyA9IG1hcmtlcnM7XG4gICAgfTtcblxuICAgIHZhciBhZGRNYXJrZXIgID0gbG9jYXRpb24gPT4ge1xuICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogbG9jYXRpb24sXG4gICAgICAgIG1hcDogbWFwXG4gICAgICB9KTtcbiAgICAgIG1hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCByZW1vdmVNYXJrZXIobWFya2VyKSk7XG4gICAgfTtcblxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBhZGRNYXJrZXIoZXZlbnQubGF0TG5nKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXRpYWxpemUpO1xufSJdfQ==
