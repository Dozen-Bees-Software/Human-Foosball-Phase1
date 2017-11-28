'use strict';

angular.module('core').service('Players', [
  function() {

    var playerList = [];
    var teamA = [];
    var teamB = [];
    var sortedPlayers = [];

    this.helloWorld = function (playername){
      return (console.log(playername));
    };

    this.players = function() {
      return playerList;
    };

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

    this.setPlayerList = function(pList){
      playerList = pList;
    };

    this.deletePlayers = function(index){
      //console.log(this.getPlayer(index));
      playerList.splice(index, 1);
      console.log(playerList.length);

    };

    this.getPlayerIndex = function(name){
      var index;
      for(var i = 0; i < playerList.length;i++){
        if(playerList[i].name === name){
          index = i;
        }
      }
      return index;
    };

    this.playerIndexArray = function(playersPld){
      var arr = [];
      var pIndex;
      for(var i = 0; i < playersPld.length; i++){
        pIndex = this.getPlayerIndex(playersPld[i].name);
        if(typeof pIndex != 'undefined'){
          arr.push(this.getPlayerIndex(playersPld[i].name));
        }

      }
      console.log('This is arrrrrr');
      console.log(arr);
      return arr;

    };


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

    this.updatePlayerStatsTie = function(playerIndexes, winPoints, tiePoints){
      for(var i = 0; i < playerIndexes.length; i++){
        playerList[playerIndexes[i]].Draws += 1;
        playerList[playerIndexes[i]].points = winPoints * playerList[playerIndexes[i]].wins + (tiePoints * playerList[playerIndexes[i]].Draws);
        playerList[playerIndexes[i]].gamesPlayed += 1;
      }
    };

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

    this.getPlayerList = function(){
      return playerList;
    };

    this.setTeams = function(team1, team2){
      teamA = team1;
      teamB = team2;
    };

    this.getTeamOne = function(){
      return teamA;
    };

    this.getTeamTwo = function(){
      return teamB;
    };

    this.setSortedPlayerList = function(sorted){
      sortedPlayers = sorted;
    };

    this.getSortedPlayerList = function(){
      return sortedPlayers;
    };

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
