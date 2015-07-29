import maps from './google-map';

angular.module('goBike', [maps])
  .factory('place', place)
  .controller('appCtrl', controller);

function controller($scope, place) {
  var vm = this;

  vm.send = () => {
    if ($scope.markers.length === 0) {
      return toast("Selecione pelo menos um local")
    }

    function coordinates(markers) {
      return markers.map(marker => ({
        latitude: marker.position.G,
        longitude: marker.position.K
      }))
    }

    place.save(coordinates($scope.markers))
      .then(() => {
        $scope.clearAll();
        toast('Seus locais foram enviados. Obrigado por participar =)')
      }).catch(data => {
        toast('Desculpe, seus dados não foram enviados.=(')
      })

  };

  function toast(msg) {
    Materialize.toast(msg, 4000)
  }
}

function place($http) {
  return {
    save(markers) {
      return $http({
        method: 'POST',
        url: '/api/places',
        data: markers
      });
    }
  };
}