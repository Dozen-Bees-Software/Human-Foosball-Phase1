'use strict';


angular.module('core').controller('PlayerListController', ['$scope', 'Authentication','Players', 'tournyService',
  function ($scope, Authentication, Players, tournyService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.players = Players.getPlayerList();
    $scope.playerCounter = 0;

    //Adds player to the current playerlist. References the player service. 
    $scope.addPlayer = function() {
      // console.log(Players.getPlayerList());
      //Players.helloWorld($scope.newPlayer);
      $scope.newPlayer.points = 0;
      $scope.newPlayer.elo = 0;
      $scope.newPlayer.wins = 0;
      $scope.newPlayer.losses= 0;
      $scope.newPlayer.Draws = 0;
      $scope.newPlayer.differential = 0;
      $scope.newPlayer.gamesPlayed = 0;
      //$scope.players.push($scope.newPlayer);
      Players.addPlayers($scope.newPlayer);
      $scope.playerCounter ++;
      //console.log(Players.getPlayer($scope.playerCounter - 1));
      $scope.newPlayer = {};
    };

    //Uses tourny service to store the current players. (Its easier to keep players with the tourney, so long term storage, players are located in the tourney storage).
    $scope.storePlayers = function(){
      tournyService.setPlayers(Players.getPlayerList());
    };

    //Deletes players from the game permanently. 
    $scope.deletePlayer = function(index) {
      Players.deletePlayers(index);
      //console.log();
      $scope.playerCounter --;
    };
  }
]);
