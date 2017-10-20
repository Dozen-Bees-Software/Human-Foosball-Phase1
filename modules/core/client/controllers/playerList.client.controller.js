'use strict';

angular.module('core').controller('PlayerListController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.players = {};

    $scope.addPlayer = function() {
        $scope.players.push($scope)
    }
  }
]);