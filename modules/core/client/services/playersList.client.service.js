'use strict';

angular.module('core').service('Players', [
  function() {

    var playerList = [];
    var teamA = [];
    var teamB = [];

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

    this.deletePlayers = function(index){
      console.log(this.getPlayer(index));
      playerList.splice(index, 1);
      console.log(playerList.length);

    };

    this.getPlayer = function(index){
      return playerList[index];
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
