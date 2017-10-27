'use strict';


angular.module('core').controller('BracketsController', ['$scope', 'Authentication','Players', 'tournConfig',
  function ($scope, Authentication, Players, tournConfig) {

    // This provides Authentication context.
    $scope.authentication = Authentication;

    //initialize playerlist, tournamentInfo, and team arrays
    $scope.playerList = Players.getPlayerList();
    console.log($scope.playerList[0]);
    $scope.tournamentInfo = tournConfig.getTournamentInfo();
    console.log($scope.tournamentInfo[1]);
    $scope.team1 = [];
    $scope.team2 = [];

  }

]);
