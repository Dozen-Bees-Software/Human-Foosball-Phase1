'use strict';

//this module is reponsible for holding the current playerlist. It retrieves its current playerlist from tourneyservice over refreshes. 
angular.module('core').service('Players', [
  function() {

    var playerList = [];
    var teamA = [];
    var teamB = [];
    var sortedPlayers = [];
    var resultsPlayers = [];
    var needsToPlay = [];
    var needsToPlayIndexes = [];
    var leaderBoardList = [];

    //testing function ignore.
    this.helloWorld = function (playername){
      return (console.log(playername));
    };

    //Returns current playerlist.
    this.players = function() {
      return playerList;
    };

    //Pushes a new player into the playerlist array. 
    this.addPlayers = function(playername){
      //console.log(playername);
      /*self.newPlayer = playername;
      self.newplayer.elo = 0;
      self.newPlayer.wins = 0;
      self.newPlayer.losses= 0;
      self.newPlayer.ties = 0;
      self.newPlayer.differential = 0;
      self.newPlayer.gamesPlayed = 0;*/
      playerList.push(playername);
      //console.log(playerList[0]);

    };

    //Sets leaderboard list for display (it prevents the original array from being sorted unnecessarily)
    this.setToSortPList = function(a){
      leaderBoardList = a;
    };

    //Sets the playerlist to the playerlist passed in. 
    this.setPlayerList = function(pList){
      playerList = pList;
    };

    //Permenently removes a player. 
    this.deletePlayers = function(index){
      playerList.splice(index,1);
    };

    //Permenently removes a player. 
    this.deletePlayersSpecific = function(index, arr){
      //console.log(this.getPlayer(index));
      arr.splice(index, 1);
      //console.log(playerList.length);

    };

    //Returns the index of the player's name passed in. If no player is found returns null;
    this.getPlayerIndex = function(name){
      var index;
      for(var i = 0; i < playerList.length;i++){
        if(playerList[i].name === name){
          index = i;
        }
      }
      return index;
    };

    //checks for a player, if the player is not found, adds the player to the playerlist. 
    this.playerIndexArray = function(playersPld){
      var arr = [];
      var pIndex;
      for(var i = 0; i < playersPld.length; i++){
        pIndex = this.getPlayerIndex(playersPld[i].name);
        if(typeof pIndex !== 'undefined'){
          arr.push(this.getPlayerIndex(playersPld[i].name));
        }

      }
      console.log('This is arrrrrr');
      console.log(arr);
      return arr;

    };

    //Sets the result player list. Sorted to show rank. 
    this.setResultsPlayerList = function(a){
      resultsPlayers = a;
    };

    //returns result playerlist. 
    this.getResultsPlayerList = function(){
      return resultsPlayers;
    };

    //Updates player stats to current stats on a team A win. (The team on the left of the match)
    this.updatePlayerStatsTeamAWin = function(playerIndexes, teamAPoints, teamBPoints, winPoints, tiePoints){
      var teamOnePoints = teamAPoints;
      var teamTwoPoints = teamBPoints;

      ///console.log('This is player indexes');
      //console.log(playerIndexes);

      for(var i = 0; i < playerIndexes.length; i++){
        console.log('this is the player being updated!');
        console.log(playerList[i]);
        if(i < playerIndexes.length/2){
          playerList[playerIndexes[i]].wins += 1;
          playerList[playerIndexes[i]].points = winPoints * playerList[playerIndexes[i]].wins + (tiePoints * playerList[playerIndexes[i]].Draws);
          playerList[playerIndexes[i]].differential += (teamOnePoints - teamTwoPoints);
          playerList[playerIndexes[i]].gamesPlayed += 1;

        }
        else{
          playerList[playerIndexes[i]].losses += 1;
          playerList[playerIndexes[i]].differential += (teamTwoPoints - teamOnePoints);
          playerList[playerIndexes[i]].gamesPlayed += 1;

        }
      }
    };

    //Responsible for updating the players in a tie. 
    this.updatePlayerStatsTie = function(playerIndexes, winPoints, tiePoints){
      for(var i = 0; i < playerIndexes.length; i++){
        playerList[playerIndexes[i]].Draws += 1;
        playerList[playerIndexes[i]].points = winPoints * playerList[playerIndexes[i]].wins + (tiePoints * playerList[playerIndexes[i]].Draws);
        playerList[playerIndexes[i]].gamesPlayed += 1;
      }
    };

    //Responsible for finding players with no games. This is used in the algorithm to ensure new players play immediately. Puts them in the needs to play array. 
    this.findPlayersWithNoGames = function(arr, rounds){
      var thatLength = arr.length;
      var maxGamesPlayed = arr[thatLength-1].gamesPlayed;

      for(var i = 0; i < thatLength; i++){

        if(arr[i].gamesPlayed === 0 || arr[i].gamesPlayed < maxGamesPlayed  || arr[i].gamesPlayed < (rounds+1) - 2){
          needsToPlay.push(arr[i]);
          needsToPlayIndexes.push(i);

        }
      }
      console.log('THEY NEED TO PLAY');
      console.log(angular.copy(needsToPlay));


      for(var j = 0; j < needsToPlayIndexes.length; j++){

        this.deletePlayersSpecific(0, arr);
      }

      needsToPlayIndexes = [];
      console.log('UPDATED LIST');
      console.log(arr);


    };

    //Returns the players who currently need to play. 
    this.getNeedsToPlay = function(){
      return needsToPlay;
    };

    //Sets the sorted leaderboard playerlist. 
    this.setSortedLeaderBoardPlayerList = function(arr){
      leaderBoardList = arr;
    };

    //Returns the sorted leaderboard playerlist. 
    this.getSortedLeaderBoardList = function(){
      return leaderBoardList;
    };


    //Updates the players win team B wins. (The team to the right on the match display)
    this.updatePlayerStatsTeamBWin = function(playerIndexes, teamAPoints, teamBPoints, winPoints, tiePoints){
      var teamOnePoints = teamAPoints;
      var teamTwoPoints = teamBPoints;

      ///console.log('This is player indexes');
      //console.log(playerIndexes);

      for(var i = 0; i < playerIndexes.length; i++){
        console.log('this is the player being updated!');
        console.log(playerList[i]);
        if(i >= playerIndexes.length/2){
          playerList[playerIndexes[i]].wins += 1;
          playerList[playerIndexes[i]].points = winPoints * playerList[playerIndexes[i]].wins + (tiePoints * playerList[playerIndexes[i]].Draws);

          playerList[playerIndexes[i]].differential += (teamTwoPoints - teamOnePoints);

          playerList[playerIndexes[i]].gamesPlayed += 1;

        }
        else{
          playerList[playerIndexes[i]].losses += 1;
          playerList[playerIndexes[i]].differential += (teamOnePoints - teamTwoPoints);
          playerList[playerIndexes[i]].gamesPlayed += 1;

        }
      }
    };

    //returns playerlist
    this.getPlayerList = function(){
      return playerList;
    };

    //Sets the teams for the current match (used in algorithm)
    this.setTeams = function(team1, team2){
      teamA = team1;
      teamB = team2;
    };

    //Returns Team A
    this.getTeamOne = function(){
      return teamA;
    };

    //Returns Team B
    this.getTeamTwo = function(){
      return teamB;
    };

    //Sets the sorted playerlist.
    this.setSortedPlayerList = function(sorted){
      sortedPlayers = sorted;
    };

    //Returns the sorted playerlist.
    this.getSortedPlayerList = function(){
      return sortedPlayers;
    };

    //Completely wipes players stats. For whatever reason values go NaN if we don't run this on new players. 
    this.wipePlayerListStats = function(plist){
      for(var i = 0; i < plist.length; i++)
      {
        plist[i].wins = 0;
        plist[i].losses = 0;
        plist[i].differential = 0;
        plist[i].gamesPlayed = 0;
        plist[i].Draws = 0;
        plist[i].elo = 0;
        plist[i].points = 0;
      }
    };


    //Updates all players stats in the current player list. 
    this.updatePlayerStats = function(team1, team2){
      for(var i = 0; i < team1.length; i++){
        for(var j = 0; j < playerList.length; j++){
          if(team1[i].name === playerList[j].name){

            playerList[j] = team1[i];

          }
          else if(team2[i].name === playerList[j].name){

            playerList[j] = team2[i];
          }
        }

      }
    };

  }
]);
