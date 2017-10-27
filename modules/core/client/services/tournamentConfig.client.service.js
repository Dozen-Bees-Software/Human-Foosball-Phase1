'use strict';

angular.module('core').service('tournConfig', [
  function() {

    var tournamentInfo = [];

    this.addTournamentInfo = function(tournInformation) {
      tournamentInfo = tournInformation;
      console.log(tournamentInfo[0]);
    };

    this.getTournamentInfo = function() {
      return tournamentInfo;
    };




  }
]);
