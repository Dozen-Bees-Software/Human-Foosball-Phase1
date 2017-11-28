'use strict';

angular.module('core').controller('ResultsController', ['$scope', 'Authentication','Players',
  function ($scope, Authentication, Players) {

    // This provides Authentication context.
    $scope.authentication = Authentication;

    //initialize playerlist, tournamentInfo, and team arrays
    $scope.playerList = Players.getPlayerList();


  }

]);
