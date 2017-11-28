'use strict';

angular.module('core').controller('ResultsController', ['$scope', 'Authentication','Players', 'tournyService',
  function ($scope, Authentication, Players, tournyService) {

    // This provides Authentication context.
    $scope.authentication = Authentication;

    // $scope.initialize = function(){
    //   tournyService.initTournaments();
    //   tournyService.restoreCurrentTournament();
    //   $scope.playerList = Players.getPlayerList();
    //   $scope.tournament = tournyService.getCurrentTournament();
    //   if($scope.playerList.length === 0){
    //     $scope.playerList = $scope.tournament.players;
    //     Players.setPlayerList($scope.playerList);
    //   }
    //   $scope.teamSize = $scope.tournament.PPT;
    //   console.log(Players.getPlayerList());
    //   window.alert($scope.tournament.matches.length);
    // };

    //initialize playerlist, tournamentInfo, and team arrays

    $scope.initialize = function(){
      tournyService.initTournaments();
      tournyService.restoreCurrentTournament();
      $scope.playerList = Players.getPlayerList();
      $scope.tournament = tournyService.getCurrentTournament();
      if($scope.playerList.length === 0){
        $scope.playerList = $scope.tournament.players;
        Players.setPlayerList($scope.playerList);
      }
      $scope.teamSize = $scope.tournament.PPT;
      // console.log(Players.getPlayerList());
      // window.alert($scope.tournament.matches.length);
    };

    $scope.bubbleSort2 = function(a){

      var swapped2;
      do {
        swapped2 = false;
        for (var k=0; k < a.length-1; k++) {
          if (a[k].points > a[k+1].points) {
            var temp2 = a[k];
            a[k] = a[k+1];
            a[k+1] = temp2;
            swapped2 = true;
          }
          else if(a[k].points === a[k+1].points){
            if(a[k].elo > a[k+1].elo){
              var temp3 = a[k];
              a[k+1] = temp3;
              swapped2 = true;
            }
          }
        }
      } while (swapped2);


      //console.log(a);
      Players.setSortedPlayerList(a);
      $scope.playerList = Players.getSortedPlayerList();
    };



  }

]);
