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
      tournaments[tournaments.findIndex(i => i.name === currentTourny)].players = playerList;
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

    this.setCurrentTourny = function(tournyName){
      currentTourny = tournyName;
      sessionStorage.setItem("currentTourny", currentTourny);
    };

    this.getCurrentTournament = function() {
      return tournaments[tournaments.findIndex(i => i.name === currentTourny)];
    };

    this.restoreCurrentTournament = function(){
      currentTourny = sessionStorage.getItem("currentTourny");
    };

    this.updateTournaments = function(tournament){
      tournaments[tournaments.findIndex(i => i.name === tournament.name)] = tournament;
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

    this.deleteTournament = function(index){
      tournaments.splice(index,1);
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    }

  }
]);
