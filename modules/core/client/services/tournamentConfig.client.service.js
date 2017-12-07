'use strict';

angular.module('core').service('tournyService', [
  function() {

    var tournaments = [];
    var currentTourny = '';

    //Init tournaments is responsible for creating local storage if it does not exist, or pulling the data from it if it does.
    this.initTournaments = function(){
      if(localStorage.getItem("WFTournaments") === null){
        localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
      } else {
        tournaments = JSON.parse(localStorage.getItem("WFTournaments"));
      }
    };

    //Returns all tournaments in local storage as an array.
    this.getTournaments = function(){
      return tournaments;
    };

    //Pushes a tournament into the tournament array for later storage.
    this.addTournament = function(tournament) {
      tournaments.push(tournament);
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

    //References the current tournament (through the currenttourny variable) and sets the playerlist to the current playerlist from playerlistservice.
    this.setPlayers = function(playerList){
      tournaments[tournaments.findIndex(i => i.name === currentTourny)].players = playerList;
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

    //Sets the current tourny variable, allowing for switching between tournaments.
    this.setCurrentTourny = function(tournyName){
      currentTourny = tournyName;
      sessionStorage.setItem("currentTourny", currentTourny);
    };

    //Returns the current tournament object (CURRENTTOURNY VAR IS JUST A STRING, NOT THE TOURNEY OBJECT) this function returns the WHOLE object.
    this.getCurrentTournament = function() {
      return tournaments[tournaments.findIndex(i => i.name === currentTourny)];
    };

    //Session storage responsible for keeping track of what tournament the user is currently on across refreshes.
    this.restoreCurrentTournament = function(){
      currentTourny = sessionStorage.getItem("currentTourny");
    };

    //Takes in a tournament object and updates its counterpart in the tournaments array, then saves it to local storage.
    this.updateTournaments = function(tournament){
      tournaments[tournaments.findIndex(i => i.name === tournament.name)] = tournament;
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

    //Permanently deletes a tournament from local storage.
    this.deleteTournament = function(index){
      tournaments.splice(index,1);
      localStorage.setItem("WFTournaments", JSON.stringify(tournaments));
    };

  }
]);
