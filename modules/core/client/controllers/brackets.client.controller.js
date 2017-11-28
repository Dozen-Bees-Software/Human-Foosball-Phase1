'use strict';

//GET BYRON'S CODE OFF GIT, AND START TRYING TO INTEGRATE...FUUUUUUUUCK
angular.module('core').controller('BracketsController', ['$scope', '$window', 'Authentication','Players', 'tournyService',
  function ($scope, $window, Authentication, Players, tournyService) {
    //So now I need to update everything to tournyService's notation. This probably won't solve the refresh problem but...one step at a time...
    // This provides Authentication context.
    $scope.authentication = Authentication;
    //initialize playerlist, tournamentInfo, and team arrays
<<<<<<< HEAD
    $scope.playerList = Players.getPlayerList();
    //console.log($scope.playerList[0]);
    $scope.tournamentInfo = tournConfig.getTournamentInfo();
    $scope.tournamentInfo[4] = 0;
    $scope.teamSize = $scope.tournamentInfo[1];
    console.log('This is rounds on brackets page %i', $scope.tournamentInfo[4]);

    //var round = $scope.tournamentInfo[4];

    $scope.teamSize = $scope.tournamentInfo[1];
    console.log($scope.tournamentInfo[4]);
=======
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
      console.log(Players.getPlayerList());
      window.alert($scope.tournament.matches.length);
    };

    //console.log($scope.playerList[0]);


    // $scope.tournamentInfo[4] = 0;

    // console.log('THis is rounds on brackets page %i', $scope.tournamentInfo[4]);

    //var round = $scope.tournamentInfo[4];

    // $scope.teamSize = $scope.tournamentInfo[1];
    // console.log($scope.tournamentInfo[4]);

    //console.log($scope.playerList[0]);
    // $scope.tournamentInfo = tournyService.getTournamentInfo();
    // $scope.tournamentInfo[4] = 0;
    // $scope.teamSize = $scope.tournamentInfo[1];
    // console.log('THis is rounds on brackets page %i', $scope.tournamentInfo[4]);

    //var round = $scope.tournamentInfo[4];

    // $scope.teamSize = $scope.tournamentInfo[1];
    // console.log($scope.tournamentInfo[4]);

>>>>>>> refs/remotes/origin/theo_master_child

    //var round = $scope.tournamentInfo[4];

    //$scope.teamOne = [];
    //$scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);

    //console.log(round);
    $scope.splitTeams = function (){
      console.log('Made it to split teams');
      //console.log()
<<<<<<< HEAD
      $scope.disabled = true;
      console.log('generate button should disappear');
=======
>>>>>>> refs/remotes/origin/theo_master_child

      $scope.disabled = true;
      console.log('generate button should disappear');

<<<<<<< HEAD
        $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
        $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);
        Players.setTeams($scope.teamOne, $scope.teamTwo);



        tournConfig.updateRounds();
        console.log($scope.tournamentInfo[4]);






        if($scope.tournamentInfo === 0){

          if($scope.teamOne.length === 0 && $scope.teamTwo.length === 0){

            $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
            $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);

            Players.setTeams($scope.teamOne, $scope.teamTwo);

            tournConfig.updateRounds();
            console.log($scope.tournamentInfo[4]);

            //rounds += 1;
            //console.log(rounds);


          }


        }
=======
      if($scope.tournament.matches.length === 0){

        $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
        $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);
        Players.setTeams($scope.teamOne, $scope.teamTwo);


        $scope.match = new Object();
        $scope.match.teamOne = $scope.teamOne;
        $scope.match.teamOnePoints = 0;
        $scope.match.teamTwo = $scope.teamTwo;
        $scope.match.teamTwoPoints = 0;



        $scope.tournament.matches.push($scope.match);

        tournyService.updateTournaments($scope.tournament);
        //This code seems redundant...
        // if($scope.tournamentInfo === 0){
        //   if($scope.teamOne.length === 0 && $scope.teamTwo.length === 0){
        //     $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
        //     $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);
        //     Players.setTeams($scope.teamOne, $scope.teamTwo);
        //     tournConfig.updateRounds();
        //     console.log($scope.tournamentInfo[4]);
        //     //rounds += 1;
        //     //console.log(rounds);
        //   }
        // }
      //$scope.disabled = true;
      //console.log('generate button should disappear');
>>>>>>> refs/remotes/origin/theo_master_child
      }
      else {
        var temp = $scope.playerList;
        var matchLength = $scope.tournament.matches.length - 1;

        console.log('This is temp');
        console.log(temp);

        console.log($scope.tournament.matches[0].teamOne);
        console.log($scope.tournament.matches[0].teamTwo);
        //console.log('THis is the the temp variable for the rounds 1 and up')
        //console.log(temp);
        //console.log(temp);
        //console.log("(else)round number is");
        //console.log($scope.tournamentInfo[4]);
        //console.log(Players.getPlayerList());
        //$scope.bubbleSort(temp);
        $scope.newTeam();


        //console.log(Players.getSortedPlayerList());

        //console.log(temp);
        //console.log("above is sorted players");
        //while(temp.length !== 0){



          // $scope.teamOne.push(temp.pop());
          // $scope.teamOne.push(temp.shift());
          // $scope.teamTwo.push(temp.pop());
          // $scope.teamTwo.push(temp.shift());
        //}
      }

      Players.setTeams($scope.teamOne, $scope.teamTwo);
    //  console.log(Players.getPlayerList());
      tournyService.updateRounds();
      console.log('round number is');


        //$scope.teamOne=[];
        //$scope.teamTwo=[];

    };



    //$scope.teamAScore = 0;
    //$scope.teamBScore = 0;

    $scope.show = false;
    $scope.openResults = function(){
      $scope.show = true;
    };

    $scope.hide = false;
    $scope.hideGenCreator = function(){
      $scope.hide = true;
    };

<<<<<<< HEAD
=======
    $scope.wipeStats = function(team){
      for(var i = 0; i < team.length; i++){
        team[i].wins = 0;
        team[i].losses = 0;
        team[i].differential = 0;
        team[i].gamesPlayed = 0;
        team[i].Draws = 0;
        team[i].elo = 0;
        team[i].points = 0;
      }
    };

>>>>>>> refs/remotes/origin/theo_master_child
    $scope.results = function(){
      console.log(Players.getPlayerList());



      var matchLength = $scope.tournament.matches.length - 1;
      var teamOne = $scope.tournament.matches[matchLength].teamOne;
      var teamTwo = $scope.tournament.matches[matchLength].teamTwo;
      console.log(teamOne);
      console.log(teamTwo);

      console.log('Playerlist after wipeStats');
      //$scope.wipeStats(teamOne);
      //$scope.wipeStats(teamTwo);
      console.log(teamOne);
      //console.log(Players.getTeamOne());
      //console.log(Players.getTeamTwo());



      $scope.teamOne = Players.getTeamOne();
      $scope.teamTwo = Players.getTeamTwo();
      ///console.log($scope.teamOne);
      //console.log($scope.teamTwo);
      console.log('This is teama and taeamb scores');
      console.log($scope.tournament.matches[matchLength].teamOnePoints);
      //$scope.tournament.matches[$scope.tournament.matches.length - 1].teamOnePoints = $scope.teamAScore;
      console.log($scope.tournament.matches[matchLength].teamTwoPoints);
      //$scope.tournament.matches[$scope.tournament.matches.length - 1].teamTwoPoints = $scope.teamBScore;

      if($scope.tournament.matches[matchLength].teamOnePoints > $scope.tournament.matches[matchLength].teamTwoPoints){
        console.log('team A won');
        console.log(teamOne);
        for(var i = 0; i < teamOne.length; i++){
          console.log('In the for loop');

<<<<<<< HEAD
          $scope.teamOne[i].points += $scope.tournamentInfo[2];

          $scope.teamOne[i].wins += 1;
          $scope.teamTwo[i].losses += 1;
          $scope.teamOne[i].differential += ($scope.teamAScore - $scope.teamBScore);
          $scope.teamTwo[i].differential += ($scope.teamBScore - $scope.teamAScore);
          $scope.teamOne[i].gamesPlayed += 1;
          $scope.teamTwo[i].gamesPlayed += 1;

          console.log($scope.teamOne);
=======
          console.log('tie stuff');
          console.log($scope.tournament.tiePoints);
          console.log(teamOne[i].Draws);
          //console.log(teamOne)

          console.log('Wins are here and should be updated');
          //console.log(teamOne[i]);
          teamOne[i].wins += 1;
          teamOne[i].points = $scope.tournament.winPoints * teamOne[i].wins + ($scope.tournament.tiePoints * teamOne[i].Draws);
          console.log(teamOne[i]);
          teamTwo[i].losses += 1;
          teamOne[i].differential += ($scope.tournament.matches[matchLength].teamOnePoints - $scope.tournament.matches[matchLength].teamTwoPoints);
          teamTwo[i].differential += ($scope.tournament.matches[matchLength].teamTwoPoints - $scope.tournament.matches[matchLength].teamOnePoints);
          teamOne[i].gamesPlayed += 1;
          teamTwo[i].gamesPlayed += 1;

        //  console.log($scope.teamOne);
>>>>>>> refs/remotes/origin/theo_master_child
          //$scope.teamOne.elo[i] += $scope.tournamentInfo[2];

        }
      }
      else if($scope.tournament.matches[matchLength].teamTwoPoints > $scope.tournament.matches[matchLength].teamOnePoints){
        console.log('team B won');
        for(var j = 0; j< teamTwo.length; j++){
          console.log('In the for loop');
<<<<<<< HEAD

          //$scope.teamTwo[j].elo = $scope.tournamentInfo[2];

          $scope.teamTwo[j].wins += 1;
          $scope.teamOne[j].losses += 1;
          $scope.teamOne[j].differential += ($scope.teamAScore - $scope.teamBScore);
          $scope.teamTwo[j].differential += ($scope.teamBScore - $scope.teamAScore);
          $scope.teamOne[j].gamesPlayed += 1;
          $scope.teamTwo[j].gamesPlayed += 1;
=======
>>>>>>> refs/remotes/origin/theo_master_child


          teamTwo[j].wins += 1;
          teamTwo[j].points = $scope.tournament.winPoints * teamTwo[j].wins + ($scope.tournament.tiePoints * teamTwo[j].Draws);
          teamOne[j].losses += 1;
          teamOne[j].differential += ($scope.tournament.matches[matchLength].teamOnePoints - $scope.tournament.matches[matchLength].teamTwoPoints);
          teamTwo[j].differential += ($scope.tournament.matches[matchLength].teamTwoPoints - $scope.tournament.matches[matchLength].teamOnePoints);
          teamOne[j].gamesPlayed += 1;
          teamTwo[j].gamesPlayed += 1;
        }
      }
      else {
        console.log('there was a tie');

        for(var k = 0; k< teamOne.length; k++){

          teamOne[k].gamesPlayed += 1;
          teamTwo[k].gamesPlayed += 1;
          teamOne[k].Draws += 1;
          teamTwo[k].Draws += 1;
          teamOne[k].points = $scope.tournament.winPoints * teamOne[k].wins + ($scope.tournament.tiePoints * teamOne[k].Draws);
          teamTwo[k].points = $scope.tournament.winPoints * teamTwo[k].wins + ($scope.tournament.tiePoints * teamTwo[k].Draws);
        }
      }
      else {
        console.log('there was a tie');
        for(var k = 0; k< Players.getTeamTwo().length; k++){
          $scope.teamOne[k].gamesPlayed += 1;
          $scope.teamTwo[k].gamesPlayed += 1;
        }
      }
      console.log($scope.teamTwo);

<<<<<<< HEAD
      Players.updatePlayerStats($scope.teamOne, $scope.teamTwo);
=======

      Players.updatePlayerStats(teamOne, teamTwo);
>>>>>>> refs/remotes/origin/theo_master_child

      $scope.calcElo();


<<<<<<< HEAD
=======
      $scope.tournament.players = Players.getPlayerList();
      tournyService.updateTournaments($scope.tournament);
      console.log('this is tournament match scoes');
      console.log($scope.tournament.matches[0].teamOnePoints);
      console.log($scope.tournament.matches[0].teamTwoPoints);

>>>>>>> refs/remotes/origin/theo_master_child
      console.log(Players.getPlayerList());


    };

    $scope.calcElo = function(){
      console.log('Quick maths');
      console.log($scope.tournament.winPoints * 2);
      var tempList = Players.getPlayerList();
      console.log('Calculating Elo');
      console.log($scope.tournament.winPoints);
      for(var i = 0; i < tempList.length; i++){
<<<<<<< HEAD

        var points = tempList[i].wins * $scope.tournamentInfo[3] + tempList[i].ties * $scope.tournamentInfo[4];
=======
        console.log('this is templist wins');
        console.log(tempList);
        var points = tempList[i].wins * parseInt($scope.tournament.winPoints) + tempList[i].Draws * parseInt($scope.tournament.tiePoints);
        console.log('this is points');
        console.log(points);
>>>>>>> refs/remotes/origin/theo_master_child
        var n = (tempList[i].differential/Math.abs(tempList[i].differential))*(Math.floor(Math.log10(Math.abs(tempList[i].differential)) + 1));
        var elo = points + ((5*Math.pow(10,n) + tempList[i].differential)/(10*Math.pow(10,n)));
        tempList[i].elo = elo;
        tempList[i].points = points;
        console.log(elo);


      }
    };

<<<<<<< HEAD
    $scope.newTeam = function(){
      var listOfPlayers = Players.getPlayerList();
      
    };

    $scope.newRound = function(){

    };

=======

  //Function that creates the new Team based on the sorted playerlist
    $scope.newTeam = function(){
      var player1;
      var player2;
      var addTeamOne = true;
      var addTeamTwo = false;
      var matchLength = $scope.tournament.matches.length - 1;


      var listOfPlayers = angular.copy(Players.getPlayerList());
      $scope.bubbleSort(listOfPlayers);

      //console.log('list of players after sort');
      //console.log(listOfPlayers);
      var sortedList1 = angular.copy(Players.getSortedPlayerList());
      console.log('SOrted lsit 1');
      console.log(sortedList1);

      /*$scope.bubbleSort2(sortedList1);
      var sortedList2 = angular.copy(Players.getSortedPlayerList());
      console.log('SOrted lsit 2');
      console.log(sortedList2);*/

      $scope.bubbleSort3(sortedList1);
      var sortedList3 = angular.copy(Players.getSortedPlayerList());
      console.log('SOrted lsit 3');
      console.log(sortedList3);

      var sortedList4 = angular.copy(sortedList3);

      //Players.setPlayerList(sortedList);


      $scope.teamOne = [];
      $scope.teamTwo = [];

      while(sortedList4.length !== 0){
        player1 = sortedList4.shift();
        player2 = sortedList4.pop();

        if($scope.teamOne.length !== $scope.tournament.PPT && addTeamOne === true){
          $scope.teamOne.push(player1);
          $scope.teamOne.push(player2);
          addTeamOne = false;
        }

        if($scope.teamTwo.length !== $scope.tournament.PPT && addTeamTwo === true){
          $scope.teamTwo.push(player1);
          $scope.teamTwo.push(player2);
          addTeamTwo = false;
          addTeamOne = true;
        }

        if(addTeamOne === false){
          addTeamTwo = true;
        }

      }


      $scope.match = new Object();
      $scope.match.teamOne = $scope.teamOne;
      $scope.match.teamOnePoints = 0;
      $scope.match.teamTwo = $scope.teamTwo;
      $scope.match.teamTwoPoints = 0;



      $scope.tournament.matches.push($scope.match);

      tournyService.updateTournaments($scope.tournament);



      console.log('This is the new team one');
      //console.log($scope.teamOne);

    };
    $scope.bubbleSort = function(a){
      //Sort based on games played
      var swapped;
      do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
          if (a[i].elo > a[i+1].elo) {
            var temp = a[i];
            a[i] = a[i+1];
            a[i+1] = temp;
            swapped = true;
          }
        }
      } while (swapped);

      //Then sort based on Elo
      var swapped2;
      do {
        swapped2 = false;
        for (var k=0; k < a.length-1; k++) {
          if (a[k].gamesPlayed > a[k+1].gamesPlayed) {
            var temp2 = a[k];
            a[k] = a[k+1];
            a[k+1] = temp2;
            swapped2 = true;
          }
        }
      } while (swapped2);


      //console.log(a);
      Players.setSortedPlayerList(a);
    };

    $scope.bubbleSort2 = function(a){

      var swapped2;
      do {
        swapped2 = false;
        for (var k=0; k < a.length-1; k++) {
          if (a[k].gamesPlayed > a[k+1].gamesPlayed) {
            var temp2 = a[k];
            a[k] = a[k+1];
            a[k+1] = temp2;
            swapped2 = true;
          }
        }
      } while (swapped2);


      //console.log(a);
      Players.setSortedPlayerList(a);
    };

    $scope.bubbleSort3 = function(a){

      var swapped2;
      do {
        swapped2 = false;
        for (var k=0; k < a.length-1; k++) {
          if (a[k].elo > a[k+1].elo) {
            var temp2 = a[k];
            a[k] = a[k+1];
            a[k+1] = temp2;
            swapped2 = true;
          }
        }
      } while (swapped2);


      //console.log(a);
      Players.setSortedPlayerList(a);
    };


    $scope.leadWrap = "leadHide";
    $scope.tournWrap = "leadShow";
    $scope.toggleLeaderboard = function()
    {
      if($scope.leadWrap === "leadShow"){
        $scope.leadWrap = "leadHide";
        $scope.tournWrap = "leadShow";}
      else{
        $scope.leadWrap = "leadShow";
        $scope.tournWrap = "leadHide";}
    };

    $scope.playerPopup = "popupHide";
    $scope.showAddPlayer = function()
    {
      if($scope.playerPopup === "popupShow")
        $scope.playerPopup = "popupHide";
      else
        $scope.playerPopup = "popupShow";
    };

    $scope.updateLeaderboard = function(){
      $scope.playerList = Players.getPlayerList();
    };
>>>>>>> refs/remotes/origin/theo_master_child
  }

]);
