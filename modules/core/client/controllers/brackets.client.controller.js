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

    $scope.teamOne = [];
    $scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);

    $scope.splitTeams = function (){
      if($scope.teamOne.length === 0 && $scope.teamTwo.length === 0){

        /*for(var i = 0; i < $scope.teamSize; i++){
          $scope.teamOne.push($scope.playerList[i]);
        }*/
        $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
        $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);

        /*for(var j = $scope.teamSize; j < 2*$scope.teamSize; j++){
          $scope.teamTwo.push($scope.playerList[j]);
        }*/
      }


      //$scope.playerList = Players.getPlayerList();
      //$scope.teamTwo = $scope.playerList.splice($scope.teamSize,(2*$scope.teamSize));

      console.log("hello");
      console.log($scope.teamSize);
      console.log($scope.teamTwo);
      //console.log(team1[0]);
      //console.log(team2[0]);
    };

  }

]);
