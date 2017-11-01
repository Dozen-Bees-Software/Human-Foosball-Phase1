'use strict';


angular.module('core').controller('BracketsController', ['$scope', 'Authentication','Players', 'tournConfig',
  function ($scope, Authentication, Players, tournConfig) {

    // This provides Authentication context.
    $scope.authentication = Authentication;

    //initialize playerlist, tournamentInfo, and team arrays
    $scope.playerList = Players.getPlayerList();
    //console.log($scope.playerList[0]);
    $scope.tournamentInfo = tournConfig.getTournamentInfo();
    $scope.tournamentInfo[4] = 0;
    $scope.teamSize = $scope.tournamentInfo[1];
    console.log('THis is rounds on brackets page %i', $scope.tournamentInfo[4]);

    //var round = $scope.tournamentInfo[4];

    $scope.teamSize = $scope.tournamentInfo[1];
    console.log($scope.tournamentInfo[1]);

    var rounds = 0;

    $scope.teamOne = [];
    $scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);

    //console.log(round);
    $scope.splitTeams = function (){
      console.log('Made it to split teams');
      //console.log()
      if($scope.tournamentInfo[4] === 0){


        console.log(rounds);



        if(rounds === 0){

          if($scope.teamOne.length === 0 && $scope.teamTwo.length === 0){

            $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
            $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);

            Players.setTeams($scope.teamOne, $scope.teamTwo);

            tournConfig.updateRounds();
            console.log($scope.tournamentInfo[4]);

            rounds += 1;
            console.log(rounds);


          }


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
      console.log($scope.teamBScore);
      if($scope.teamAScore > $scope.teamBScore){
        console.log('team A won');
        for(var i = 0; i < Players.getTeamOne().length; i++){
          console.log('In the for loop');
          $scope.teamOne[i].elo = $scope.tournamentInfo[2];
          $scope.teamOne[i].wins += 1;
          $scope.teamTwo[i].losses += 1;
          $scope.teamOne[i].differential += ($scope.teamAScore - $scope.teamBScore);
          $scope.teamTwo[i].differential += ($scope.teamBScore - $scope.teamAScore);
          $scope.teamOne[i].gamesPlayed += 1;
          $scope.teamTwo[i].gamesPlayed += 1;

          console.log($scope.teamOne);
          //$scope.teamOne.elo[i] += $scope.tournamentInfo[2];

        }
      }
      else if($scope.teamBScore > $scope.teamAScore){
        console.log('team B won');
        for(var j = 0; j< Players.getTeamTwo().length; j++){
          console.log('In the for loop');
          $scope.teamTwo[j].elo = $scope.tournamentInfo[2];
          $scope.teamTwo[j].wins += 1;
          $scope.teamOne[j].losses += 1;
          $scope.teamOne[j].differential += ($scope.teamAScore - $scope.teamBScore);
          $scope.teamTwo[j].differential += ($scope.teamBScore - $scope.teamAScore);
          $scope.teamOne[j].gamesPlayed += 1;
          $scope.teamTwo[j].gamesPlayed += 1;


          console.log($scope.teamTwo);
        }
      }
      console.log($scope.teamTwo);

      Players.updatePlayerStats($scope.teamOne, $scope.teamTwo);
      console.log(Players.getPlayerList());
    };

    $scope.calcElo = function(){
      var tempList = Players.getPlayerList();
      for(var i = 0; i < tempList.length; i++){
        var n = Math.floor(Math.log10());
      }
    };

  }

]);
