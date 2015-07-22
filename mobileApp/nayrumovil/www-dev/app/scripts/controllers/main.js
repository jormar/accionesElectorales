'use strict';

/**
 * @ngdoc function
 * @name wwwDevApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wwwDevApp
 */
angular.module('wwwDevApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.action = "Puerta a Puerta 2";
    $scope.author = "Ferran Rodríguez";

    $scope.generarCoor = function() {
      // abajo izquierda  38.447571, -5.855102
      // arriba derecha   42.668709, -0.911254
      $scope.latitude = Math.random() * 4.221137999999996 + 38.447571;
      $scope.longitude = Math.random() * 4.943847999999999 + -5.855102;
    };
    $scope.generarCoor();

    $scope.resetBox = function() {
      $scope.$apply(function () {
        $scope.success = '';
        $scope.error = '';
      });
    };

    $scope.success = '';
    $scope.error = '';

    $scope.sendAction = function() {

      $scope.action = angular.element('#action').val();
      $scope.author = angular.element('#author').val();
      console.log($scope.action,$scope.author,$scope.latitude,$scope.longitude);

      $http.post(
        // 'http://localhost:3000/actions',
        // 'http://jormararellano.com:8080/actions',
        // 'http://192.168.1.9:8080/actions',
        'http://52.28.211.117:8080/actions',
        {
          author: $scope.author,
          action: $scope.action,
          latitude: $scope.latitude,
          longitude: $scope.longitude,
        })
        .success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
          $scope.success = 'Se ha guardado la accion';
          $scope.generarCoor();
          setTimeout($scope.resetBox, 1000);
        })
        .error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.error = 'Hubo en error con la red';
          setTimeout($scope.resetBox, 1500);
        });
    };
  });
