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
    console.log($scope.tournamentInfo[4]);

    //var round = $scope.tournamentInfo[4];

    $scope.teamOne = [];
    $scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);
    //console.log(round);
    $scope.splitTeams = function (){

      if($scope.tournamentInfo[4] === 0){

        if($scope.teamOne.length === 0 && $scope.teamTwo.length === 0){

          $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
          $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);
          Players.setTeams($scope.teamOne, $scope.teamTwo);



          tournConfig.updateRounds();
          console.log($scope.tournamentInfo[4]);

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

    $scope.results = function(){
      //console.log(Players.getTeamOne());
      //console.log(Players.getTeamTwo());
      $scope.teamOne = Players.getTeamOne();
      $scope.teamTwo = Players.getTeamTwo();
      console.log($scope.teamOne);
      console.log($scope.teamTwo);

      console.log($scope.teamAScore);
      if($scope.teamAScore > $scope.teamBScore){
        console.log('team A won');
        for(var i = 0; i < Players.getTeamOne().length; i++){
          console.log('In the for loop');
          $scope.teamOne[i].elo = $scope.tournamentInfo[2];
          $scope.teamOne[i].wins += 1;
          $scope.teamTwo[i].losses += 1;
          



          console.log($scope.teamOne);
          //$scope.teamOne.elo[i] += $scope.tournamentInfo[2];

        }
      }
    };

  }

]);
