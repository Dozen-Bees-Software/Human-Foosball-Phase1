'use strict';

angular.module('core').service('tournyService', [
  function() {

    var tournaments = [];
    var currentTourny = '';

    this.initTournaments = function(){
      if(localStorage.getItem("WFTournaments") === null){
        localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
      } else {
        tournaments = JSON.parse(localStorage.getItem("WFTournaments"));
      }
    };

    this.getTournaments = function(){
      return tournaments;
    };


    this.addTournament = function(tournament) {
      tournaments.push(tournament);
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

    this.updateRounds = function(){
      //tournamentInfo[4]++;

    };

    this.setPlayers = function(playerList){
      var i;
      tournaments[tournaments.findIndex(i.name === currentTourny)].players = playerList;
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

    this.setCurrentTourny = function(tournyName){
      currentTourny = tournyName;
    };

    this.getCurrentTournament = function() {
      var i;
      return tournaments[tournaments.findIndex(i.name === currentTourny)];
    };

    this.updateTournaments = function(tournament){
      var i;
      tournaments[tournaments.findIndex(i.name === tournament.name)] = tournament;
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

  }
]);
