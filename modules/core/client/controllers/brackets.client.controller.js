'use strict';


angular.module('core').controller('BracketsController', ['$scope', '$window', 'Authentication','Players', 'tournyService',
  function ($scope, $window, Authentication, Players, tournyService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    //initialize playerlist, tournamentInfo, and team arrays
    $scope.initialize = function(){
      tournyService.initTournaments();
      tournyService.restoreCurrentTournament();
      $scope.playerList = Players.getPlayerList();
      //$scope.sortedPlayerList = angular.copy(Players.getPlayerList());
      $scope.tournament = tournyService.getCurrentTournament();
      //console.log($scope.tournament.players);
      if($scope.playerList.length === 0){
        $scope.playerList = $scope.tournament.players;
        //$scope.sortedPlayerList = $scope.tournament.players;
        //console.log($scope.sortedPlayerList);

        Players.setPlayerList($scope.playerList);
        //Players.setToSortPList($scope.sortedPlayerList);
      }
      $scope.teamSize = $scope.tournament.PPT;
      // console.log(Players.getPlayerList());
      // window.alert($scope.tournament.matches.length);
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


    //var round = $scope.tournamentInfo[4];

    //$scope.teamOne = [];
    //$scope.teamTwo = [];

  //$scope.teamTwo = $scope.playerList.splice($scope.teamSize, (2*$scope.teamSize));
  //console.log($scope.teamTwo);

    //console.log(round);
    $scope.splitTeams = function (){
      // console.log('Made it to split teams');
      //console.log()


      $scope.disabled = true;
      // console.log('generate button should disappear');


      if($scope.tournament.matches.length === 0){


        $scope.teamOne = $scope.playerList.slice(0, $scope.teamSize);
        $scope.teamTwo = $scope.playerList.slice($scope.teamSize, 2*$scope.teamSize);
        Players.setTeams($scope.teamOne, $scope.teamTwo);


        $scope.match = {
          teamOne: '',
          teamTwo: '',
          teamOnePoints: 0,
          teamTwoPoints:0
        };

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
        var matchLength = $scope.tournament.matches.length - 1;

        // console.log('This is temp');
        // console.log(temp);

        // console.log($scope.tournament.matches[0].teamOne);
        // console.log($scope.tournament.matches[0].teamTwo);
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
      // console.log('round number is');


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



    $scope.wipeStats = function(){

      Players.wipePlayerListStats(Players.getPlayerList());

      for(var i = 0; i < $scope.tournament.matches.length; i++){
        var match = $scope.tournament.matches[i];
        var teamOne = match.teamOne;
        var teamTwo = match.teamTwo;
        // console.log('this is wipe stats)');
        // console.log(teamOne);
        // console.log(teamTwo);
        for(var j =0; j < teamOne.length; j++)
        {
          teamOne[j].wins = 0;
          teamOne[j].losses = 0;
          teamOne[j].differential = 0;
          teamOne[j].gamesPlayed = 0;
          teamOne[j].Draws = 0;
          teamOne[j].elo = 0;
          teamOne[j].points = 0;

          teamTwo[j].wins = 0;
          teamTwo[j].losses = 0;
          teamTwo[j].differential = 0;
          teamTwo[j].gamesPlayed = 0;
          teamTwo[j].Draws = 0;
          teamTwo[j].elo = 0;
          teamTwo[j].points = 0;
        }

      }
      // for(var t = 0; t < $scope.tournament.matches.length; t++){
      //   var match = $scope.tournament.matches[t];
      //   var teamOne = match.teamOne;
      //   var teamTwo = match.teamTwo;
      //   console.log('Gonzo Berry');
      //   console.log(match);
      //   console.log(teamOne);
      //   console.log(teamTwo);
      // }
    };

    $scope.calcAllMatches = function(){

      $scope.wipeStats();
      var matchLength = $scope.tournament.matches.length - 1;

      for(var i = 0; i < matchLength+1; i++){
        var match = $scope.tournament.matches[i];

        //console.log(match);

        $scope.results(match);


        //console.log('Spagett!');
        //console.log(match);

      }


      $scope.calcElo();
      //$scope.tournament.players = Players.getPlayerList();
      //$scope.bubbleSort4($scope.sortedPlayerList);
      //console.log($scope.sortedPlayerList);
      $scope.tournament.players = Players.getPlayerList();

      tournyService.updateTournaments($scope.tournament);

    };

    $scope.results = function(matches){

      var matchLength = $scope.tournament.matches.length - 1;

      //$scope.calcAllMatches();


      var match = matches;
      //console.log(match);
      var teamOne = match.teamOne;
      var teamTwo = match.teamTwo;
      var teamOnePoints = angular.copy(match.teamOnePoints);
      var teamTwoPoints = angular.copy(match.teamTwoPoints);

      var playersPlaying = teamOne.concat(teamTwo);
      var indexes = Players.playerIndexArray(playersPlaying);

      // console.log('REEEEEEE');
      // console.log(match);


      //var teamOne = $scope.tournament.matches[t].match;
      //var teamTwo = $scope.tournament.matches[t].match;
      //console.log(teamOne);
      //console.log(teamTwo);

      //console.log('Playerlist after wipeStats');
      //$scope.wipeStats(teamOne);
      //$scope.wipeStats(teamTwo);
      //console.log(teamOne);
      //console.log(Players.getTeamOne());
      //console.log(Players.getTeamTwo());





      ///console.log($scope.teamOne);
      //console.log($scope.teamTwo);
      // console.log('This is teama and taeamb scores');
      // console.log(teamOnePoints);
      //$scope.tournament.matches[$scope.tournament.matches.length - 1].teamOnePoints = $scope.teamAScore;
      // console.log(teamTwoPoints);
      //$scope.tournament.matches[$scope.tournament.matches.length - 1].teamTwoPoints = $scope.teamBScore;

      if(teamOnePoints > teamTwoPoints){
        // console.log('team A won');
        //console.log(teamOne);

          //teamOne[i].name;
        Players.updatePlayerStatsTeamAWin(indexes, teamOnePoints, teamTwoPoints, $scope.tournament.winPoints, $scope.tournament.tiePoints);
        // console.log(Players.getPlayerList());

          //console.log('Wins are here and should be updated');
          //console.log(teamOne[i]);
          // teamOne[i].wins += 1;
          // teamOne[i].points = $scope.tournament.winPoints * teamOne[i].wins + ($scope.tournament.tiePoints * teamOne[i].Draws);
          // //console.log(teamOne[i]);
          // teamTwo[i].losses += 1;
          // teamOne[i].differential += (teamOnePoints - teamTwoPoints);
          // teamTwo[i].differential += (teamTwoPoints - teamOnePoints);
          // teamOne[i].gamesPlayed += 1;
          // teamTwo[i].gamesPlayed += 1;

          //console.log($scope.teamOne);


          //$scope.teamOne.elo[i] += $scope.tournamentInfo[2];


      }

      else if(teamTwoPoints > teamOnePoints){
        // console.log('team B won');
        Players.updatePlayerStatsTeamBWin(indexes, teamOnePoints, teamTwoPoints, $scope.tournament.winPoints, $scope.tournament.tiePoints);
      }
      else {
        // console.log('there was a tie');

        Players.updatePlayerStatsTie(indexes, $scope.tournament.winPoints, $scope.tournament.tiePoints);

      }




      //console.log($scope.teamTwo);
      //Players.updatePlayerStats(teamOne, teamTwo);







      // $scope.tournament.players = Players.getPlayerList();
      // tournyService.updateTournaments($scope.tournament);


      //console.log(Players.getPlayerList());



    };

    $scope.calcElo = function(){
      // console.log('Quick maths');
      // console.log($scope.tournament.winPoints * 2);
      var tempList = Players.getPlayerList();
      // console.log('Calculating Elo');
      // console.log($scope.tournament.winPoints);
      for(var i = 0; i < tempList.length; i++){
        // console.log('this is templist wins');
        // console.log(tempList);
        var points = tempList[i].wins * parseInt($scope.tournament.winPoints) + tempList[i].Draws * parseInt($scope.tournament.tiePoints);
        // console.log('this is points');
        // console.log(points);

        if(tempList[i].differential === 0 && tempList[i].gamesPlayed > 0){
          tempList[i].differential += 0.00001;
        }
        var n = (Math.floor(Math.log10(Math.abs(tempList[i].differential))) + 1);
        var elo = points + ((5*Math.pow(10,n) + tempList[i].differential)/(10*Math.pow(10,n)));
        tempList[i].elo = elo;
        //Math.round(tempList[i].differential);
        if(tempList[i].differential === 0.00001){
          tempList[i].differential = 0;
        }
        //tempList[i].points = points;
        // console.log(elo);

      }
    };


  //Function that creates the new Team based on the sorted playerlist
    $scope.newTeam = function(){
      var player1;
      var player2;
      var addTeamOne = true;
      var addTeamTwo = false;
      var matchLength = $scope.tournament.matches.length - 1;


      // console.log('new team stuff!');
      var listOfPlayers = angular.copy(Players.getPlayerList());
      console.log(listOfPlayers);
      var sortedList4;

      $scope.bubbleSort(listOfPlayers);


      //console.log('list of players after sort');
      //console.log(listOfPlayers);
      var sortedList1 = angular.copy(Players.getSortedPlayerList());
      Players.findPlayersWithNoGames(sortedList1, matchLength);
      // console.log('SOrted lsit 1');
      // console.log(sortedList1);

      $scope.bubbleSort2(sortedList1);
      var sortedList2 = angular.copy(Players.getSortedPlayerList());
      console.log('sorted lsit 2');
      console.log(angular.copy(sortedList2));
      // console.log('SOrted lsit 2');
      // console.log(angular.copy(sortedList2));
      sortedList4 = sortedList2;

      /*if(matchLength % 3 === 0){
        $scope.bubbleSort3(sortedList2);
        var sortedList3 = angular.copy(Players.getSortedPlayerList());
        // console.log('SOrted lsit 3');
        // console.log(sortedList3);
        sortedList4 = sortedList3;

      }*/

      //Players.setPlayerList(sortedList);


      $scope.teamOne = [];
      $scope.teamTwo = [];
      var needToPlay = Players.getNeedsToPlay();
      var needToPlayLength = angular.copy(needToPlay.length/2);

      if(needToPlay.length !== 0){

        while(needToPlay.length !== 0){
          //console.log(angular.copy(needToPlay));
          if(needToPlay.length > 1){
            if(needToPlayLength === $scope.tournament.PPT){
              console.log('WE ARE HRERER FIXXXX');
              player1 = needToPlay.shift();
              player2 = needToPlay.pop();


              if($scope.teamOne.length !== $scope.tournament.PPT && addTeamOne === true){
                if($scope.teamOne.length+1 === $scope.tournament.PPT){
                  console.log('made it to our custom team one ');
                  $scope.teamOne.push(player1);
                  $scope.teamTwo.push(player2);
                }
                else{
                  console.log('team one add');
                  $scope.teamOne.push(player1);
                  $scope.teamOne.push(player2);
                }

                addTeamOne = false;
              }

              if($scope.teamTwo.length !== $scope.tournament.PPT && addTeamTwo === true){
                if($scope.teamTwo.length + 1 === $scope.tournament.PPT){
                  console.log('made it to our custom team two condition');
                  $scope.teamOne.push(player1);
                  $scope.teamTwo.push(player2);
                }
                else{
                  console.log('team2 add ');
                  $scope.teamTwo.push(player1);
                  $scope.teamTwo.push(player2);
                }

                addTeamTwo = false;
                addTeamOne = true;
              }

              if(addTeamOne === false){
                addTeamTwo = true;
              }

            }
            else{

              player1 = needToPlay.shift();
              player2 = needToPlay.pop();


              if($scope.teamOne.length !== $scope.tournament.PPT && addTeamOne === true){
                if($scope.teamOne.length+1 === $scope.tournament.PPT){
                  console.log('made it to our custom team one ');
                  $scope.teamOne.push(player1);
                  $scope.teamTwo.push(player2);
                }
                else{
                  $scope.teamOne.push(player1);
                  $scope.teamTwo.push(player2);
                }

                addTeamOne = false;
              }

              if($scope.teamTwo.length !== $scope.tournament.PPT && addTeamTwo === true){
                if($scope.teamTwo.length + 1 === $scope.tournament.PPT){
                  //console.log('made it to our custom team two condition');
                  $scope.teamOne.push(player2);
                  $scope.teamTwo.push(player2);
                }
                else{
                  $scope.teamOne.push(player1);
                  $scope.teamTwo.push(player2);
                }

                addTeamTwo = false;
                addTeamOne = true;
              }

              if(addTeamOne === false){
                addTeamTwo = true;
              }
            }
          }
          else{
            player1 = needToPlay.shift();

            $scope.teamOne.push(player1);
          }

        }

        addTeamOne = true;
        addTeamTwo = false;

        while(sortedList4.length !== 0){

          player1 = sortedList4.shift();
          player2 = sortedList4.pop();



          if($scope.teamOne.length !== $scope.tournament.PPT && addTeamOne === true){
            if($scope.teamOne.length+1 === $scope.tournament.PPT){
              console.log('made it to our custom team one ');
              $scope.teamTwo.push(player1);
              $scope.teamOne.push(player2);
            }
            else{
              console.log('adding both players to team one');
              $scope.teamOne.push(player1);
              $scope.teamOne.push(player2);
            }

            addTeamOne = false;
          }

          if($scope.teamTwo.length !== $scope.tournament.PPT && addTeamTwo === true){
            if($scope.teamTwo.length + 1 === $scope.tournament.PPT){
              console.log('made it to our custom team two condition');
              //$scope.teamOne.push(player1);
              $scope.teamTwo.push(player2);
            }
            else{
              console.log('adding both players to team two');
              $scope.teamTwo.push(player1);
              $scope.teamTwo.push(player2);
            }

            addTeamTwo = false;
            addTeamOne = true;
          }

          if(addTeamOne === false){
            addTeamTwo = true;
          }

        }

        if($scope.teamOne.length === $scope.tournament.PPT || $scope.teamTwo.length === $scope.tournament.PPT){
          if($scope.teamTwo.length !== $scope.tournament.PPT){
            if($scope.teamTwo.length + 1 === $scope.tournament.PPT){
              $scope.teamTwo.push(player1);
            }
            else{
              $scope.teamTwo.push(player1);
              $scope.teamTwo.push(player2);
            }
          }
          else if($scope.teamOne.length !== $scope.tournament.PPT){
            if($scope.teamOne.length + 1 === $scope.tournament.PPT){
              $scope.teamOne.push(player1);
            }
            else{
              $scope.teamOne.push(player1);
              $scope.teamOne.push(player2);
            }
          }
        }
      }
      else {

        while(sortedList4.length !== 0){
          player1 = sortedList4.shift();
          player2 = sortedList4.pop();



          if($scope.teamOne.length !== $scope.tournament.PPT && addTeamOne === true){
            if($scope.teamOne.length+1 === $scope.tournament.PPT){
              console.log('made it to our custom team one ');
              $scope.teamOne.push(player1);
              $scope.teamTwo.push(player2);
            }
            else{
              $scope.teamOne.push(player1);
              $scope.teamOne.push(player2);
            }

            addTeamOne = false;
          }

          if($scope.teamTwo.length !== $scope.tournament.PPT && addTeamTwo === true){
            if($scope.teamTwo.length + 1 === $scope.tournament.PPT){
              //console.log('made it to our custom team two condition');
              $scope.teamTwo.push(player2);
            }
            else{
              $scope.teamTwo.push(player1);
              $scope.teamTwo.push(player2);
            }

            addTeamTwo = false;
            addTeamOne = true;
          }

          if(addTeamOne === false){
            addTeamTwo = true;
          }

        }
      }



      $scope.match = {
        teamOne: '',
        teamTwo: '',
        teamOnePoints: 0,
        teamTwoPoints:0
      };
      $scope.match.teamOne = $scope.teamOne;
      $scope.match.teamOnePoints = 0;
      $scope.match.teamTwo = $scope.teamTwo;
      $scope.match.teamTwoPoints = 0;



      $scope.tournament.matches.push($scope.match);

      tournyService.updateTournaments($scope.tournament);



      // console.log('This is the new team one');
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

    $scope.bubbleSort3 = function(a){

      var swapped2;
      do {
        swapped2 = false;
        for (var k=0; k < a.length-1; k++) {
          if (a[k].differential > a[k+1].differential) {
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

    $scope.bubbleSort4 = function(a){

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
      Players.setSortedLeaderBoardPlayerList(a);
      //$scope.playerList = Players.getSortedPlayerList();
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
        $scope.yournWrap = "leadHide";}
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
      $scope.sortedPlayerList = Players.getSortedLeaderBoardList();
    };
  }

]);
