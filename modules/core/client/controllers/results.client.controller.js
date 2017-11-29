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

      $scope.results();
      // console.log(Players.getPlayerList());
      // window.alert($scope.tournament.matches.length);
    };

    $scope.results = function(){
      console.log('Made it inside results');
      var players = angular.copy($scope.playerList);
      console.log(Players.getPlayerList());
      $scope.bubbleSort2(players);
      var sortedPlayas = Players.getSortedPlayerList();
      console.log(sortedPlayas);
      Players.setResultsPlayerList(sortedPlayas);

      $scope.playerList = Players.getResultsPlayerList();
    };

    $scope.bubbleSort2 = function(a){

      var swapped2;
      do {
        swapped2 = false;
        for (var k=0; k < a.length-1; k++) {
          if (a[k].elo < a[k+1].elo) {
            var temp2 = a[k];
            a[k] = a[k+1];
            a[k+1] = temp2;
            swapped2 = true;
          }
        }
      } while (swapped2);


      //console.log(a);
      Players.setSortedPlayerList(a);
      //$scope.playerList = Players.getSortedPlayerList();
    };



  }

]);
