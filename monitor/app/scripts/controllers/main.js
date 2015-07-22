'use strict';

/**
 * @ngdoc function
 * @name monitorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monitorApp
 */
angular.module('monitorApp')
  .controller('MainCtrl', function ($scope, $http, uiGmapGoogleMapApi) {

    $scope.socket = io.connect('http://52.28.211.117:8080');

    $scope.socket.on('reloadAll', function(data){
      $scope.actions = data;
      $scope.$apply();
    });

    $scope.resetAll = function(){
      $http.delete('http://52.28.211.117:8080/actions/all')
        .success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.success = 'Se han vaciado las acciones';
        })
        .error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.error = 'Hubo en error con la red';
        });
    };

    $scope.actions = [];

    // Valores por defecto para los mapas
    $scope.defaultMapPosition = {
        latitude: "40.533175",
        longitude: "-3.760661"
    };
    $scope.defaultMapZoom = 6;

    /** Mapa de Google Maps */
    $scope.map = {
        control: {},
        center: {
            type: 'Point',
            coordinates: [ $scope.defaultMapPosition.longitude, $scope.defaultMapPosition.latitude ]
        },
        options: {
            streetViewControl: true,
            panControl: true,
            maxZoom: 20,
            minZoom: 3
        },
        zoom: $scope.defaultMapZoom,
        clickedMarker: {
            id: 0,
            title: 'Posición actual',
            geometry: {
                type: 'Point',
                coordinates: [ $scope.defaultMapPosition.longitude, $scope.defaultMapPosition.latitude ]
            }
        },
        events: {
            click: function (mapModel, eventName, originalEventArgs) {
                // 'this' is the directive's scope
                var e = originalEventArgs[0];
                $scope.map.clickedMarker = {
                    id: 0,
                    title: 'You clicked here ' + 'lat: ' + e.latLng.lat() + ' lon: ' + e.latLng.lng(),
                    geometry: {
                        type: 'Point',
                        coordinates: [ e.latLng.lng(), e.latLng.lat() ]
                    }
                };

                // Actualizamos el modelo de datos
                $scope.long = '' + $scope.map.clickedMarker.geometry.coordinates[0];
                $scope.lat = '' + $scope.map.clickedMarker.geometry.coordinates[1];

                //scope apply required because this event handler is outside of the angular domain
                $scope.$apply();
            }
        },
    };

    $http.get('http://52.28.211.117:8080/actions')
      .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.success = 'Se ha guardado la accion';
        $scope.actions = data;
      })
      .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $scope.error = 'Hubo en error con la red';
      });
  });
