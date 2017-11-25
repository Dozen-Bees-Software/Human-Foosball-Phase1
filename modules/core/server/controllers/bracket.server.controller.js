'use strict';


angular.module('core').controller('BracketController', ['$scope', 'Authentication','Players',
  function ($scope, Authentication, Players) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.players = Players.getPlayerList();
    $scope.rounds = [];

    //Where do we get teamsize from?
    var teamSize = Math.floor($scope.players.length);

    $scope.generateElo = function(){
      var maxDifferential = 0;
      for(var i = 0; i<$scope.players.size; i++)
      {
        if(Math.abs($scope.players[i].differential)>maxDifferential)
        {
          maxDifferential = $scope.players[i].differential;
        }
      }

      var n = Math.floor(Math.log10(maxDifferential))+1;

      for(i = 0; i < $scope.players.size; i++)
      {
        $scope.players[i].elo = $scope.players[i].wins + (5*Math.pow(10,n)+$scope.players[i].differential)/(10*Math.pow(10,n));
      }
    };

    $scope.sortTeams = function(){
      function compareGamesPlayed(a,b){
        var comparison = 0;
        if(a.gamesPlayed > b.gamesPlayed)
        {
          comparison = 1;
        }
        else if (a.gamesPlayed<b.gamesPlayed)
        {
          comparison = -1;
        }
        return(comparison);
      }

      $scope.players.sort(compareGamesPlayed);
    };

    $scope.generateTeams = function(){
      var lineup = $scope.players.slice(0,teamSize*2-1);
      $scope.team1 = [];
      $scope.team2 = [];
      //Need to get number of players playing and sort them based on compareElo


      function compareElo(a,b){
        var comparison = 0;
        if(a.elo > b.elo)
        {
          comparison = 1;
        }
        else if (a.elo<b.elo)
        {
          comparison = -1;
        }
        return(comparison);
      }

      lineup.sort(compareElo);

      var chooseBestPlayer = true;

      while(lineup.size>0)
      {
        if(chooseBestPlayer)
        {
          $scope.team1.push(lineup.shift());
          $scope.team2.push(lineup.shift());
          chooseBestPlayer = !chooseBestPlayer;
        }
        else
        {
          $scope.team1.push(lineup.pop());
          $scope.team2.push(lineup.pop());
          chooseBestPlayer = !chooseBestPlayer;
        }
      }



    };
  }
]);
