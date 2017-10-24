'use strict';

angular.module('core').service('Players', [
  function() {

    var playerList = [];

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
    }

  }
]);
