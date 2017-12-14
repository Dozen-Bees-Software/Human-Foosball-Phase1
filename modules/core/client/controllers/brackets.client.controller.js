'use strict';


angular.module('core').controller('BracketsController', ['$scope', '$window', 'Authentication','Players', 'tournyService',
  function ($scope, $window, Authentication, Players, tournyService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    //initialize playerlist, tournamentInfo, and team arrays
    $scope.initialize = function(){
      tournyService.initTournaments(); //Generates the tournament
      tournyService.restoreCurrentTournament(); //The tournament stays upon refreshing the page
      $scope.playerList = Players.getPlayerList(); //gets the list of all players in an array
      $scope.sortedPlayerList = angular.copy(Players.getPlayerList()); //an array with the list of players, to be reorganized later
      $scope.tournament = tournyService.getCurrentTournament(); //gets the current tournament to access.

      if($scope.playerList.length === 0){
        $scope.playerList = $scope.tournament.players;
        $scope.sortedPlayerList = $scope.tournament.players;
        Players.setPlayerList($scope.playerList);
        Players.setToSortPList($scope.sortedPlayerList);


      }
      $scope.teamSize = $scope.tournament.PPT;
      // console.log(Players.getPlayerList());
      // window.alert($scope.tournament.matches.length);
    };


    //sepates the player list into two teams of equal size
    $scope.splitTeams = function (){

      $scope.disabled = true;
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

      }
      else {
        //var temp = $scope.playerList;
        var matchLength = $scope.tournament.matches.length - 1;

        //Function that creates the new Team based on the sorted playerlist
        if($scope.clicked === true){
          $scope.newTeam();
          $scope.clicked = false;
          tournyService.setClick(false);
        }
        else{
          window.alert('Please submit scores before generating a new round');
        }

      }

      //sets the two teams as team A and team B, respectively
      Players.setTeams($scope.teamOne, $scope.teamTwo);
      //tournyService.updateRounds();

    };

    //used to display buttons
    $scope.show = false;
    $scope.openResults = function(){
      $scope.show = true;
    };

    //used to display buttons
    $scope.hide = false;
    $scope.hideGenCreator = function(){
      $scope.hide = true;
    };

    //
    $scope.wipeStats = function(){

      //wipes the stats of all the players to recalculate again, when scores from previous
      Players.wipePlayerListStats(Players.getPlayerList());

      for(var i = 0; i < $scope.tournament.matches.length; i++){
        var match = $scope.tournament.matches[i];
        var teamOne = match.teamOne;
        var teamTwo = match.teamTwo;
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

    };

    // calculates the matches to be displayed
    $scope.calcAllMatches = function(){
      $scope.clicked = false;
      tournyService.setClick(false);
      var playersT = [];
      $scope.wipeStats();
      var matchLength = $scope.tournament.matches.length - 1;
      for(var i = 0; i < matchLength+1; i++){
        var match = $scope.tournament.matches[i];
        $scope.results(match);
      }

      $scope.calcElo();
      $scope.tournament.players = Players.getPlayerList();
      tournyService.updateTournaments($scope.tournament);
      playersT = angular.copy($scope.tournament.players);
      $scope.sortedLeaderBoard(playersT);
      $scope.clicked = true;
      tournyService.setClick(true);

    };

      $scope.sortedLeaderBoard = function(a){
      $scope.bubbleSort4(a);
      $scope.sortedPlayerList = Players.getSortedLeaderBoardList();
    };
    //when the summit button is clicked, the scores are taken in an the player stats are updated
    $scope.results = function(matches){

      var matchLength = $scope.tournament.matches.length - 1;
      var match = matches;
      var teamOne = match.teamOne;
      var teamTwo = match.teamTwo;
      var teamOnePoints = angular.copy(match.teamOnePoints);
      var teamTwoPoints = angular.copy(match.teamTwoPoints);
      var playersPlaying = teamOne.concat(teamTwo);
      var indexes = Players.playerIndexArray(playersPlaying);
      if(teamOnePoints > teamTwoPoints){
        Players.updatePlayerStatsTeamAWin(indexes, teamOnePoints, teamTwoPoints, $scope.tournament.winPoints, $scope.tournament.tiePoints);
      }
      else if(teamTwoPoints > teamOnePoints){
        Players.updatePlayerStatsTeamBWin(indexes, teamOnePoints, teamTwoPoints, $scope.tournament.winPoints, $scope.tournament.tiePoints);
      }
      else {
        Players.updatePlayerStatsTie(indexes, $scope.tournament.winPoints, $scope.tournament.tiePoints);

      }

    };
    //uses each player's stats to calcuate a special number for each to determine their standings in the leaderboard
    $scope.calcElo = function(){

      var tempList = Players.getPlayerList();

      for(var i = 0; i < tempList.length; i++){

        var points = tempList[i].wins * parseInt($scope.tournament.winPoints) + tempList[i].Draws * parseInt($scope.tournament.tiePoints);

        if(tempList[i].differential === 0 && tempList[i].gamesPlayed > 0){
          tempList[i].differential += 0.00001;
        }
        var n = (Math.floor(Math.log10(Math.abs(tempList[i].differential))) + 1);
        var elo = points + ((5*Math.pow(10,n) + tempList[i].differential)/(10*Math.pow(10,n)));
        tempList[i].elo = elo;
        if(tempList[i].differential === 0.00001){
          tempList[i].differential = 0;
        }

      }
    };


  //Function that creates the new Team based on the sorted playerlist
    $scope.newTeam = function(){

      var player1;
      var player2;
      var addTeamOne = true;
      var addTeamTwo = false;
      var matchLength = $scope.tournament.matches.length - 1;
      var listOfPlayers = angular.copy(Players.getPlayerList());
      var sortedList4;
      $scope.bubbleSort(listOfPlayers); // see declaration
      var sortedList1 = angular.copy(Players.getSortedPlayerList());
      Players.findPlayersWithNoGames(sortedList1, matchLength); //checks which players have not played a game
      $scope.bubbleSort2(sortedList1);
      var sortedList2 = angular.copy(Players.getSortedPlayerList());
      sortedList4 = sortedList2;
      $scope.teamOne = [];
      $scope.teamTwo = [];
      var needToPlay = Players.getNeedsToPlay(); //gets the players who will play in the next round

      var needToPlayLength = angular.copy(needToPlay.length/2);
      var needToPlayLength2 = angular.copy(needToPlay.length);
      var incrementer = 0;
      var incrementer2 = 0;
      //checks if there are any players who still need to play
      //runs through the list of players who need to play and puts them into separate teams
      //takes into account when players per team is either even or odd
      //makes sure each team has the same number of players
      //cases occured where if the players per team was odd, the teams would be unbalanced
      //additionally ensures that this does not happen and both teams are equal size if the players per team is odd
      if(needToPlay.length !== 0){

        while(needToPlay.length !== 0 || incrementer < $scope.tournament.PPT*2){
          incrementer += 1;
          if(needToPlay.length > 1){
            if(needToPlayLength >= $scope.tournament.PPT){
              player1 = needToPlay.shift();
              player2 = needToPlay.pop();
              if($scope.teamOne.length !== $scope.tournament.PPT && addTeamOne === true){
                if($scope.teamOne.length+1 === $scope.tournament.PPT){
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
                  $scope.teamOne.push(player1);
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
            else{

              player1 = needToPlay.shift();
              player2 = needToPlay.pop();



              if($scope.teamOne.length !== $scope.tournament.PPT && addTeamOne === true){
                if($scope.teamOne.length+1 === $scope.tournament.PPT){
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
        Players.removeUndefined($scope.teamOne);
        if($scope.teamOne.length > $scope.tournament.PPT){
          while($scope.teamOne.length > $scope.tournament.PPT){
            $scope.teamOne.pop();
          }
        }

        if(needToPlayLength2 >= $scope.tournament.PPT*2){

        }
        else{

          addTeamOne = true;
          addTeamTwo = false;
          var staticTeamOneLength = angular.copy($scope.teamOne.length);
          var staticTeamTwoLength = angular.copy($scope.teamTwo.length);
          var dummyTeamOne = [];
          var dummyTeamTwo = [];
          for(var k = 0; k < staticTeamOneLength; k++){
            if(typeof $scope.teamOne[k] !== 'undefined'){
              dummyTeamOne.push($scope.teamOne[k]);
            }
          }
          if(dummyTeamOne.length > 0){
            $scope.teamOne = dummyTeamOne;
          }

          while(sortedList4.length !== 0){

            player1 = sortedList4.shift();
            player2 = sortedList4.pop();

            if($scope.teamOne.length < $scope.tournament.PPT && addTeamOne === true){
              if($scope.teamOne.length+1 === $scope.tournament.PPT){
                $scope.teamTwo.push(player1);
                $scope.teamOne.push(player2);
              }
              else{
                $scope.teamOne.push(player1);
                $scope.teamOne.push(player2);
              }

              addTeamOne = false;
            }

            if($scope.teamTwo.length < $scope.tournament.PPT && addTeamTwo === true){
              if($scope.teamTwo.length + 1 === $scope.tournament.PPT){

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

        if($scope.teamOne.length === $scope.tournament.PPT || $scope.teamTwo.length === $scope.tournament.PPT){
          if($scope.teamTwo.length < $scope.tournament.PPT){
            if($scope.teamTwo.length + 1 === $scope.tournament.PPT){
              $scope.teamTwo.push(player1);
            }
            else{
              $scope.teamTwo.push(player1);
              $scope.teamTwo.push(player2);
            }
          }
          else if($scope.teamOne.length < $scope.tournament.PPT){
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

      Players.setSortedPlayerList(a);
    };
    $scope.bubbleSort2 = function(a){
      //sort by elo
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

      Players.setSortedPlayerList(a);
    };

    $scope.bubbleSort3 = function(a){
      //sorts by the score differential
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

      Players.setSortedPlayerList(a);
    };

    $scope.bubbleSort4 = function(a){
      //sorts by elo
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
      Players.setSortedLeaderBoardPlayerList(a);
    };

    //used to display certain fields on click
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

    //sorts througn the player list and sorts by best performing real time
    $scope.updateLeaderboard = function(){
      var updater = [];
      $scope.playerList = Players.getPlayerList();
      updater = angular.copy($scope.playerList);

      $scope.sortedLeaderBoard(updater);

      $scope.sortedPlayerList = Players.getSortedLeaderBoardList();
    };
  }

]);
