'use strict';


angular.module('core').controller('BracketsController', ['$scope', 'Authentication','Players', 'tournConfig',
  function ($scope, Authentication, Players, tournConfig) {

    // This provides Authentication context.
    $scope.authentication = Authentication;

    //initialize playerlist, tournamentInfo, and team arrays
    $scope.playerList = Players.getPlayerList();
    console.log($scope.playerList[0]);
    $scope.tournamentInfo = tournConfig.getTournamentInfo();
    $scope.teamSize = $scope.tournamentInfo[1];
    console.log($scope.tournamentInfo[1]);

    var rounds = 0;

    $scope.teamOne = [];
    $scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);
    console.log(rounds);
    $scope.splitTeams = function (){

      if(rounds === 0){

        if($scope.teamOne.length === 0 && $scope.teamTwo.length === 0){

          $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
          $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);

          rounds += 1;
          console.log(rounds);

        }

      }
      else {

      }

    };

    $scope.teamAScore = 0;
    $scope.teamBScore = 0;

    $scope.show = false;
    $scope.openResults = function(){
      $scope.show = true;
    };

  }

]);
