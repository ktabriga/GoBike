import {module as maps} from 'google-map';


angular.module('goBike', [maps])
  .factory('place', place)
  .controller('appCtrl', controller);

function controller($scope, place) {
  var vm = this;

  vm.send = () => {
    console.log(coordinates($scope.markers));
    if ($scope.markers.length === 0) {
      return Materialize.toast("Selecione pelo menos um local =)", 4000)
    }

    function coordinates(markers) {
      return markers.map(marker => ({
        latitude: marker.position.A,
        longitude: marker.position.F
      }))
    }

    place.save(coordinates($scope.markers))
      .then(() => {
        $scope.clearAll();
        Materialize.toast('Seus locais foram enviados. Obrigado por participar =)', 6000)
      }).catch(data => {
        console.log(data);
        Materialize.toast('Desculpe, seus dados não foram enviados.=(', 4000)
      })

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