'use strict';

angular.module('core').controller('PlayerListController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.players = [];

    $scope.addPlayer = function() {
      $scope.newPlayer.elo = 0;
      $scope.newPlayer.wins = 0;
      $scope.newPlayer.losses= 0;
      $scope.newPlayer.ties = 0;
      $scope.newPlayer.differential = 0;
      $scope.newPlayer.gamesPlayed = 0;
      $scope.players.push($scope.newPlayer);
      $scope.newPlayer = {};
    };
  }
]);