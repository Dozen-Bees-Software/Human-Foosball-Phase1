//Bracket controller, algorithm work goes in here (I think)
//Generates next match based on player standings

'use strict';

angular.module('core').controller('BracketController', ['$scope', 'Authentication','Players',
  function ($scope, Authentication,Players) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.players = Players.getPlayerList();
  }
]);