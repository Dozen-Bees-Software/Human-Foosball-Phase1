'use strict';


angular.module('core').controller('BracketController', ['$scope', 'Authentication','Players',
  function ($scope, Authentication, Players) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.players = Players.getPlayerList();
    $scope.rounds = 0;

    //Where do we get teamsize from?
    var teamSize = floor($scope.players.length);

    $scope.generateElo = function(){
      var maxDifferential = 0;
      for(var player in $scope.players)
      {
        if(abs(player.differential)>maxDifferential)
        {
          maxDifferential = player.differential;
        }
      }

      var n = floor(Math.log10(maxDifferential))+1

      for(var player in $scope.players)
      {
        player.elo = player.wins + (5*pow(10,n)+player.differential)/(10*pow(10,n))
      }
    }

    $scope.sortTeams = function(){
      function compareGamesPlayed(a,b){
        let comparison = 0;
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
    }

    $scope.generateTeams = function(){
      var lineup = $scope.players.slice(0,teamSize*2-1);
      $scope.team1;
      $scope.team2;
      //Need to get number of players playing and sort them based on compareElo


      function compareElo(a,b){
        let comparison = 0;
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



    }
}
]);
