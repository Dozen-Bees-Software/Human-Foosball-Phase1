'use strict';

angular.module('core').controller('ResultsController', ['$scope', 'Authentication','Players', 'tournyService',
  function ($scope, Authentication, Players, tournyService) {

    // This provides Authentication context.
    $scope.authentication = Authentication;

    //Initialization function used to initialize data on page load. Referencs TournyService and Playerlist service. These services hold the current tournaments information and players respectively.
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
    };

    //Results function is reponsible for retreiving, setting, and sorting the playerlist. This sorts the players in to winning order and displays their names. 
    $scope.results = function(){
      var players = angular.copy($scope.playerList);
      $scope.bubbleSort2(players);
      var sortedPlayas = Players.getSortedPlayerList();
      Players.setResultsPlayerList(sortedPlayas);

      $scope.playerList = Players.getResultsPlayerList();
    };

    //BubbleSort2 is a copy from the algorithm used to generate rounds. It sorts players by overall score. 
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
