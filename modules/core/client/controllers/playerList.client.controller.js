'use strict';


angular.module('core').controller('PlayerListController', ['$scope', 'Authentication','Players', 'tournyService',
  function ($scope, Authentication, Players, tournyService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.players = Players.getPlayerList();
    $scope.playerCounter = 0;

    //Adds player to the current playerlist. References the player service.
    $scope.addPlayer = function() {
      //Players.helloWorld($scope.newPlayer);
      $scope.newPlayer.points = 0;
      $scope.newPlayer.elo = 0;
      $scope.newPlayer.wins = 0;
      $scope.newPlayer.losses= 0;
      $scope.newPlayer.Draws = 0;
      $scope.newPlayer.differential = 0;
      $scope.newPlayer.gamesPlayed = 0;
      Players.addPlayers($scope.newPlayer);
      $scope.playerCounter ++;
      $scope.newPlayer = {};
    };

    $scope.sortedAddPlayer = function(){
      $scope.newPlayer.points = 0;
      $scope.newPlayer.elo = 0;
      $scope.newPlayer.wins = 0;
      $scope.newPlayer.losses= 0;
      $scope.newPlayer.Draws = 0;
      $scope.newPlayer.differential = 0;
      $scope.newPlayer.gamesPlayed = 0;
      Players.sortedAddPlayers($scope.newPlayer);
      Players.addPlayers($scope.newPlayer);
      //$scope.tournament.players.push($scope.newPlayer);
      $scope.playerCounter ++;
      $scope.newPlayer = {};

    };

    //Uses tourny service to store the current players. (Its easier to keep players with the tourney, so long term storage, players are located in the tourney storage).
    $scope.storePlayers = function(){
      tournyService.setPlayers(Players.getPlayerList());
    };

    //Deletes players from the game permanently.
    $scope.deletePlayer = function(index) {
      Players.deletePlayers(index);
      $scope.playerCounter --;
    };

    $scope.sortedDeletePlayer = function(index){
      var click = tournyService.getClick();
      
      if(click === false){
        window.alert('Please submit scores before removing a player!');
      }
      else{
        if(confirm('Are you sure you want to delete this player?')){
          var deletedPlayerName = angular.copy(Players.getSortedLeaderBoardList()[index].name);
          var tournPlayers = angular.copy($scope.tournament.players);
          var thatIndex;
          for(var i = 0; i < tournPlayers.length; i++){
            if(tournPlayers[i].name === deletedPlayerName){
              thatIndex = i;
            }
          }
          Players.deletePlayers(thatIndex);
          Players.sortedDeletePlayers(index);
          $scope.playerCounter --;
        }
        else{

        }
      }

    }
  }
]);
