'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
'tournyService', 'Players',
  function ($scope, Authentication, tournyService, Players) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.tournaments = [];

    $scope.forceRefresh = function() {
      document.getElementById('homePageContainer').style.visibility = 'hidden';
      if( window.sessionStorage )
      {
        if( sessionStorage.getItem('secondLoad') )
        {
          sessionStorage.removeItem('secondLoad');
          window.location.reload();
        }  
        else{
          sessionStorage['secondLoad'] = true;
          document.getElementById('homePageContainer').style.visibility = 'visible';
        }
      }
    };

    $scope.showInfo=function(){

<<<<<<< HEAD
      $scope.info = 'tourney info here';
=======
      $scope.info = 'I in Team is where every player is out for themselves and ranked individually. Teams are shuffled and balanced to provide all players the fairest game possible.';
>>>>>>> refs/remotes/origin/theo_master_child

    };

    $scope.tourneySummary = false;
    $scope.revealInfo= function() {
      $scope.tourneySummary=true;
    };

    var rounds = 0;
    $scope.playersPerTeam= 0;
    $scope.numPoints= 0;
    $scope.tie= 0;


<<<<<<< HEAD
=======

    $scope.saveTourney = function(){
      // $scope.tourney.name = $scope.tournamentName;
      tournyService.setCurrentTourny($scope.tourney.name);
      $scope.tourney.PPT = $scope.playersPerTeam;
      $scope.tourney.matches = [];
      $scope.tourney.players = [];
      $scope.tourney.winPoints = $scope.numPoints;
      $scope.tourney.tiePoints = $scope.tie;

      console.log('tourney info was saved');
      tournyService.addTournament($scope.tourney);
    };


>>>>>>> refs/remotes/origin/theo_master_child

    $scope.saveTourneyInfo = function(){
      $scope.tourneyInfos.push($scope.tournamentName);
      $scope.tourneyInfos.push($scope.playersPerTeam);
<<<<<<< HEAD
      $scope.tourneyInfos.push(rounds);
      console.log('This is the rounds being pushed %i', rounds);
      $scope.tourneyInfos.push($scope.numPoints);
      $scope.tourneyInfos.push($scope.tie);
      $scope.tourneyInfos.push(rounds);

      console.log('tourney info was saved');
      tournConfig.addTournamentInfo($scope.tourneyInfos);
=======

      $scope.tourneyInfos.push($scope.numPoints);
      $scope.tourneyInfos.push($scope.tie);
      $scope.tourneyInfos.push(rounds);
      console.log('This is the rounds being pushed %i', rounds);
      console.log('tourney info was saved');
      tournyService.addTournamentInfo($scope.tourneyInfos);

>>>>>>> refs/remotes/origin/theo_master_child

    };

    $scope.initLocalCache = function(){
      tournyService.initTournaments();
      $scope.tournaments = tournyService.getTournaments();
      window.alert("initializing local cache")
      window.alert(JSON.stringify($scope.tournaments));
    };

    $scope.previousTournyVisible = false;
    $scope.checkVisible = function(){
      if($scope.tournaments[0] !== null){
        $scope.previousTournyVisible = true;
      }
    };

    $scope.IsVisible= false;
    $scope.ShowHide = function () {
  //If DIV is visible it will be hidden and vice versa.
      $scope.IsVisible = true;

    };

    $scope.IsVisible2 = false;
    $scope.ShowHide2 = function () {
      $scope.IsVisible2 = true;

    };

    $scope.resumeTourney = function(index) {
      tournyService.setCurrentTourny($scope.tournaments[index].name);
      Players.setPlayerList(tournyService.getCurrentTournament().players);
    };

    $scope.deleteTournament = function(index) {
      tournyService.deleteTournament(index);
    }

    $scope.updateTournaments = function(){
      $scope.tournaments = tournyService.getTournaments();
    };

  }
]);
