'use strict';


angular.module('core').controller('BracketsController', ['$scope', 'Authentication','Players', 'tournConfig',
  function ($scope, Authentication, Players, tournConfig) {

    // This provides Authentication context.
    $scope.authentication = Authentication;

    //initialize playerlist, tournamentInfo, and team arrays
    $scope.playerList = Players.getPlayerList();
    //console.log($scope.playerList[0]);
    $scope.tournamentInfo = tournConfig.getTournamentInfo();
    $scope.rounds = $scope.tournamentInfo[4];
    $scope.round = [];
    $scope.teamSize = $scope.tournamentInfo[1];
    console.log('THis is rounds on brackets page %i', $scope.tournamentInfo[4].length);

    $scope.teamOne = [];
    $scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);

    //console.log(round);
    $scope.splitTeams = function (){
      console.log('Made it to split teams');
      //console.log()
      //$scope.disabled = true;
      //console.log('generate button should disappear');

      if($scope.tournamentInfo[4].length === 0){

        console.log("(if)round number is");
        console.log($scope.tournamentInfo[4].length);
        $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
        $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);
        $scope.round = [0,$scope.teamOne,0,$scope.teamTwo];
        $scope.rounds.push($scope.round);

      }
      else {
        var temp = Players.getPlayerList();

        $scope.gamesPlayedSort(temp);
        console.log(temp);
        console.log("above is sorted players");
        temp = temp.slice(0, $scope.teamSize * 2);
        while(temp.length !== 0){
          $scope.teamOne.push(temp.pop());
          $scope.teamOne.push(temp.shift());
          $scope.teamTwo.push(temp.pop());
          $scope.teamTwo.push(temp.shift());
        }

        $scope.round = [0,$scope.teamOne,0,$scope.teamTwo];
        $scope.rounds.push($scope.round);
      }
        Players.setTeams($scope.teamOne, $scope.teamTwo);
        console.log(Players.getPlayerList());
        //tournConfig.updateRounds();
        console.log("round number is");
        console.log($scope.tournamentInfo[4].length);

        //$scope.teamOne=[];
        //$scope.teamTwo=[];

    };



    $scope.teamAScore = 0;
    $scope.teamBScore = 0;

    $scope.show = false;
    $scope.openResults = function(){
      $scope.show = true;
    };

    $scope.hide = false;
    $scope.hideGenCreator = function(){
      $scope.hide = true;
    };

    $scope.results = function(){
      //console.log(Players.getTeamOne());
      //console.log(Players.getTeamTwo());

      // $scope.teamOne = Players.getTeamOne();
      // $scope.teamTwo = Players.getTeamTwo();
      // console.log($scope.teamOne);
      // console.log($scope.teamTwo);
      //
      // console.log($scope.teamAScore);
      // console.log($scope.teamBScore);
      // if($scope.teamAScore > $scope.teamBScore){
      //   console.log('team A won');
      //   for(var i = 0; i < Players.getTeamOne().length; i++){
      //     console.log('In the for loop');
      //     console.log($scope.teamOne[i]);
      //     //$scope.teamOne[i].points += $scope.tournamentInfo[2];
      //     $scope.teamOne[i].wins += 1;
      //     $scope.teamTwo[i].losses += 1;
      //     $scope.teamOne[i].differential += ($scope.teamAScore - $scope.teamBScore);
      //     $scope.teamTwo[i].differential += ($scope.teamBScore - $scope.teamAScore);
      //     $scope.teamOne[i].gamesPlayed += 1;
      //     $scope.teamTwo[i].gamesPlayed += 1;
      //
      //     console.log($scope.teamOne);
          //$scope.teamOne.elo[i] += $scope.tournamentInfo[2];

      //   }
      // }
      // else if($scope.teamBScore > $scope.teamAScore){
      //   console.log('team B won');
      //   for(var j = 0; j< Players.getTeamTwo().length; j++){
      //     console.log('In the for loop');
      //
      //     //$scope.teamTwo[j].elo = $scope.tournamentInfo[2];
      //
      //     $scope.teamTwo[j].wins += 1;
      //     $scope.teamOne[j].losses += 1;
      //     $scope.teamOne[j].differential += ($scope.teamAScore - $scope.teamBScore);
      //     $scope.teamTwo[j].differential += ($scope.teamBScore - $scope.teamAScore);
      //     $scope.teamOne[j].gamesPlayed += 1;
      //     $scope.teamTwo[j].gamesPlayed += 1;
      //
      //
      //     console.log($scope.teamTwo);
      //   }
      // }
      // else {
      //   console.log('there was a tie');
      //   for(var k = 0; k< Players.getPlayerList().length; k++){
      //     $scope.teamOne[k].gamesPlayed += 1;
      //     $scope.teamTwo[k].gamesPlayed += 1;
      //     $scope.teamOne[k].Draws += 1;
      //     $scope.teamTwo[k].Draws += 1;
      //   }
      // }
      //console.log($scope.teamTwo);
      for(var i = 0; i < $scope.playerList.length; i++)
      {
        $scope.playerList[i].points = 0;
        $scope.playerList[i].wins = 0;
        $scope.playerList[i].losses = 0;
        $scope.playerList[i].ties = 0;
        $scope.playerList[i].differential = 0;
        $scope.playerList[i].gamesPlayed = 0;
      }

      for(var i = 0; i < $scope.rounds.length; i++)
      {
        //Team 1 wins
        if($scope.rounds[i][0] > $scope.rounds[i][2])
        {
          //Team 1
          for(var j = 0; j < $scope.rounds[i][1].length; j++)
          {
            $scope.rounds[i][1][j].gamesPlayed += 1;
            $scope.rounds[i][1][j].points += $scope.tournamentInfo[2];
            $scope.rounds[i][1][j].wins += 1;
            $scope.rounds[i][1][j].differential +=
              ($scope.rounds[i][0] - $scope.rounds[i][2]);
          }
          //Team 2
          for(var j = 0; j < $scope.rounds[i][3].length; j++)
          {
            $scope.rounds[i][3][j].gamesPlayed += 1;
            $scope.rounds[i][3][j].losses += 1;
            $scope.rounds[i][3][j].differential +=
              ($scope.rounds[i][2] - $scope.rounds[i][0]);
          }
        }
        //Team 2 wins
        else if($scope.rounds[i][0] < $scope.rounds[i][2])
        {
          //Team 2
          for(var j = 0; j < $scope.rounds[i][3].length; j++)
          {
            $scope.rounds[i][3][j].gamesPlayed += 1;
            $scope.rounds[i][3][j].points += $scope.tournamentInfo[2];
            $scope.rounds[i][3][j].wins += 1;
            $scope.rounds[i][3][j].differential +=
              ($scope.rounds[i][2] - $scope.rounds[i][0]);
          }
          //Team 1
          for(var j = 0; j < $scope.rounds[i][1].length; j++)
          {
            $scope.rounds[i][1][j].gamesPlayed += 1;
            $scope.rounds[i][1][j].losses += 1;
            $scope.rounds[i][1][j].differential +=
              ($scope.rounds[i][0] - $scope.rounds[i][2]);
          }
        }
        //Tie game
        else
        {
          //Team 1
          for(var j = 0; j < $scope.rounds[i][1].length; j++)
          {
            $scope.rounds[i][1][j].gamesPlayed += 1;
              $scope.rounds[i][1][j].ties += 1;
            $scope.rounds[i][1][j].points += $scope.tournamentInfo[3];
          }
          //Team 2
          for(var j = 0; j < $scope.rounds[i][3].length; j++)
          {
            $scope.rounds[i][3][j].gamesPlayed += 1;
            $scope.rounds[i][3][j].ties += 1;
            $scope.rounds[i][3][j].points += $scope.tournamentInfo[3];
          }
        }
      }

      $scope.calcElo();


      console.log(Players.getPlayerList());
      $scope.teamOne=[];
      $scope.teamTwo=[];
      console.log("teams are empty and ready to be filled again");

    };

    $scope.calcElo = function(){
      for(var i = 0; i < $scope.playerList.length; i++)
      {

        var n = ($scope.playerList[i].differential/Math.abs($scope.playerList[i].differential))*(Math.floor(Math.log10(Math.abs($scope.playerList[i].differential)) + 1));

        $scope.playerList[i].elo = $scope.playerList[i].points + ((5*Math.pow(10,n) + $scope.playerList[i].differential)/(10*Math.pow(10,n)));

        console.log($scope.playerList[i].elo);
      }
    };

    $scope.gamesPlayedSort = function(playerList){
      var tempList = playerList;
      var key, j;
      for(var i = 0; i < playerList.length; i++){
        key = tempList[i].gamesPlayed;
        j = i - 1;
        while(j >= 0 && tempList[j].gamesPlayed > key)
        {
          tempList[j+1] = tempList[j];
          j = j - 1;
        }
        arr[j+1].gamesPlayed = key;
      }
      console.log(listOfPlayers);
      console.log("rearranged players");

      playerList= listOfPlayers;
       //$scope.teamOne = listOfPlayers.slice(0, $scope.teamSize);
       //$scope.teamTwo = listOfPlayers.slice($scope.teamSize, 2*$scope.teamSize);
       //Players.setTeams($scope.teamOne, $scope.teamTwo);

    };

    $scope.leadWrap = "leadHide";
    $scope.toggleLeaderboard = function(){
      if($scope.leadWrap === "leadHide"){
        $scope.leadWrap = "leadShow";
      } else {
        $scope.leadWrap = "leadHide";
      }
    };

    $scope.playerPopup = "popupHide";
    $scope.showAddPlayer = function(){
      if($scope.playerPopup ==="popupHide"){
        $scope.playerPopup = "popupShow";
      } else {
        $scope.playerPopup = "popupHide";
      }
    };
  }

]);
