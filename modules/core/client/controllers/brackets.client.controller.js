'use strict';

//GET BYRON'S CODE OFF GIT, AND START TRYING TO INTEGRATE...FUUUUUUUUCK
angular.module('core').controller('BracketsController', ['$scope', '$window', 'Authentication','Players', 'tournyService',
  function ($scope, $window, Authentication, Players, tournyService) {
    //So now I need to update everything to tournyService's notation. This probably won't solve the refresh problem but...one step at a time...
    // This provides Authentication context.
    $scope.authentication = Authentication;
    //initialize playerlist, tournamentInfo, and team arrays
    $scope.playerList = Players.getPlayerList();

    $scope.tournament = tournyService.getCurrentTournament();
    //console.log($scope.playerList[0]);


    // $scope.tournamentInfo[4] = 0;
    $scope.teamSize = $scope.tournament.PPT;
    // console.log('THis is rounds on brackets page %i', $scope.tournamentInfo[4]);

    //var round = $scope.tournamentInfo[4];

    // $scope.teamSize = $scope.tournamentInfo[1];
    // console.log($scope.tournamentInfo[4]);

    //console.log($scope.playerList[0]);
    $scope.tournamentInfo = tournyService.getTournamentInfo();
    $scope.tournamentInfo[4] = 0;
    $scope.teamSize = $scope.tournamentInfo[1];
    console.log('THis is rounds on brackets page %i', $scope.tournamentInfo[4]);

    //var round = $scope.tournamentInfo[4];

    $scope.teamSize = $scope.tournamentInfo[1];
    console.log($scope.tournamentInfo[4]);


    //var round = $scope.tournamentInfo[4];

    //$scope.teamOne = [];
    //$scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);

    //console.log(round);
    $scope.splitTeams = function (){
      console.log('Made it to split teams');
      //console.log()

      $scope.disabled = true;
      console.log('generate button should disappear');

      if($scope.tournament.matches.length === 0){

        $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
        $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);
        Players.setTeams($scope.teamOne, $scope.teamTwo);

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
      }
      else {
        var temp = $scope.playerList;
        console.log('This is temp');
        console.log(temp);
        //console.log('THis is the the temp variable for the rounds 1 and up')
        //console.log(temp);
        //console.log(temp);
        //console.log("(else)round number is");
        //console.log($scope.tournamentInfo[4]);
        //console.log(Players.getPlayerList());
        //$scope.bubbleSort(temp);
        $scope.newTeam();
        console.log(Players.getSortedPlayerList());

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
      console.log($scope.tournamentInfo[4]);

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
      console.log('Playerlist at beginning of results');
      console.log(Players.getPlayerList());
      //console.log(Players.getTeamOne());
      //console.log(Players.getTeamTwo());

      $scope.teamOne = Players.getTeamOne();
      $scope.teamTwo = Players.getTeamTwo();
      ///console.log($scope.teamOne);
      //console.log($scope.teamTwo);

      console.log($scope.teamAScore);
      $scope.tournament.matches[$scope.tournament.matches.length - 1].teamOnePoints = $scope.teamAScore;
      console.log($scope.teamBScore);
      $scope.tournament.matches[$scope.tournament.matches.length - 1].teamTwoPoints = $scope.teamBScore;

      if($scope.teamAScore > $scope.teamBScore){
        console.log('team A won');
        for(var i = 0; i < Players.getTeamOne().length; i++){
          console.log('In the for loop');

          $scope.teamOne[i].points += $scope.tournament.winPoints;

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


          $scope.teamTwo[j].points += $scope.tournament.winPoints;



          $scope.teamTwo[j].wins += 1;
          $scope.teamOne[j].losses += 1;
          $scope.teamOne[j].differential += ($scope.teamAScore - $scope.teamBScore);
          $scope.teamTwo[j].differential += ($scope.teamBScore - $scope.teamAScore);
          $scope.teamOne[j].gamesPlayed += 1;
          $scope.teamTwo[j].gamesPlayed += 1;


          console.log($scope.teamTwo);
        }
      }
      else {
        console.log('there was a tie');

        for(var k = 0; k< Players.getTeamTwo().length; k++){
          $scope.teamOne[k].points += $scope.tournament.tiePoints;
          $scope.teamTwo[k].points += $scope.tournament.tiePoints;
          $scope.teamOne[k].gamesPlayed += 1;
          $scope.teamTwo[k].gamesPlayed += 1;
        }
      }
      console.log($scope.teamTwo);


      Players.updatePlayerStats($scope.teamOne, $scope.teamTwo);

      $scope.calcElo();


      $scope.tournament.players = Players.getPlayerList();
      tournyService.updateTournaments($scope.tournament);

      console.log(Players.getPlayerList());


    };

    $scope.calcElo = function(){
      var tempList = Players.getPlayerList();
      for(var i = 0; i < tempList.length; i++){

        var points = tempList[i].wins * $scope.tournamentInfo[3] + tempList[i].ties * $scope.tournamentInfo[4];
        var n = (tempList[i].differential/Math.abs(tempList[i].differential))*(Math.floor(Math.log10(Math.abs(tempList[i].differential)) + 1));
        var elo = points + ((5*Math.pow(10,n) + tempList[i].differential)/(10*Math.pow(10,n)));
        tempList[i].elo = elo;
        tempList[i].points = points;
        console.log(elo);


      }
    };


  //Function that creates the new Team based on the sorted playerlist
    $scope.newTeam = function(){
      var player1;
      var player2;
      var addTeamOne = true;
      var addTeamTwo = false;

      var listOfPlayers = Players.getPlayerList();
      $scope.bubbleSort(listOfPlayers);
      //console.log('list of players after sort');
      //console.log(listOfPlayers);
      var sortedList = Players.getSortedPlayerList();
      Players.setPlayerList(sortedList);

      $scope.teamOne = [];
      $scope.teamTwo = [];

      while(sortedList.length !== 0){
        player1 = sortedList.shift();
        player2 = sortedList.pop();

        if($scope.teamOne.length !== $scope.tournamentInfo[1] && addTeamOne === true){
          $scope.teamOne.push(player1);
          $scope.teamOne.push(player2);
          addTeamOne = false;
        }

        if($scope.teamTwo.length !== $scope.tournamentInfo[1] && addTeamTwo === true){
          $scope.teamTwo.push(player1);
          $scope.teamTwo.push(player2);
          addTeamTwo = false;
          addTeamOne = true;
        }

        if(addTeamOne === false){
          addTeamTwo = true;
        }

      }

      console.log('This is the new team one');
      console.log($scope.teamOne);

    };
    $scope.bubbleSort = function(a){
      //Sort based on games played
      var swapped;
      do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
          if (a[i].gamesPlayed > a[i+1].gamesPlayed) {
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



  }

]);
