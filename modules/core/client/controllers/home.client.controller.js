'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
'tournyService', 'Players',
  function ($scope, Authentication, tournyService, Players) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.tournaments = [];

    //Force refresh is called to force the page to reset once its being revisited from inside the app. This is necessary to allow local storage to update the html view. (bypass browser cache).
    $scope.forceRefresh = function() {
      document.getElementById('homePageContainer').style.visibility = 'hidden';
      if(window.sessionStorage)
      {
        if(sessionStorage.getItem('secondLoad'))
        {
          sessionStorage.removeItem('secondLoad');
          window.location.reload();
        }
        else{
          sessionStorage.secondLoad = true;
          document.getElementById('homePageContainer').style.visibility = 'visible';
        }
      }
    };

    //Holds the string literal for the I in team tourny style. 
    $scope.showInfo=function(){

      $scope.info = 'I in Team is where every player is out for themselves and ranked individually. Teams are shuffled and balanced to provide all players the fairest game possible.';


    };

    $scope.tourneySummary = false;
    //Simple toggle function. 
    $scope.revealInfo= function() {
      $scope.tourneySummary=true;
    };

    var rounds = 0;
    $scope.playersPerTeam= 0;
    $scope.numPoints= 0;
    $scope.tie= 0;

    //Stores the tournament in local storage, allowing reference at any point in time later. 
    $scope.saveTourney = function(){
      // $scope.tourney.name = $scope.tournamentName;
      tournyService.setCurrentTourny($scope.tourney.name);
      $scope.tourney.PPT = $scope.playersPerTeam;
      $scope.tourney.matches = [];
      $scope.tourney.players = [];
      $scope.tourney.winPoints = $scope.numPoints;
      $scope.tourney.tiePoints = $scope.tie;

      // console.log('tourney info was saved');
      tournyService.addTournament($scope.tourney);
    };

    //Adds tournament info and saves to local storage. 
    $scope.saveTourneyInfo = function(){
      $scope.tourneyInfos.push($scope.tournamentName);
      $scope.tourneyInfos.push($scope.playersPerTeam);

      $scope.tourneyInfos.push($scope.numPoints);
      $scope.tourneyInfos.push($scope.tie);
      $scope.tourneyInfos.push(rounds);
      // console.log('This is the rounds being pushed %i', rounds);
      // console.log('tourney info was saved');
      tournyService.addTournamentInfo($scope.tourneyInfos);

    };

    //References tournyService to create the local cache. See tourny service for full functionality. Stores tournaments in the tournaments variable.
    $scope.initLocalCache = function(){
      tournyService.initTournaments();
      $scope.tournaments = tournyService.getTournaments();
      // window.alert("initializing local cache");
      // window.alert(JSON.stringify($scope.tournaments));
    };

    $scope.previousTournyVisible = false;
    //Simple visibility toggle
    $scope.checkVisible = function(){
      if($scope.tournaments[0] !== null){
        $scope.previousTournyVisible = true;
      }
    };

    $scope.IsVisible= false;
    //Simple visibility toggle
    $scope.ShowHide = function () {
  //If DIV is visible it will be hidden and vice versa.
      $scope.IsVisible = true;

    };

    $scope.IsVisible2 = false;
    //Simple visibility toggle
    $scope.ShowHide2 = function () {
      $scope.IsVisible2 = true;

    };

    //Allows a tournament to be resumed at any time by switching tourny services focused tourney, see tourney service for more info. 
    $scope.resumeTourney = function(index) {
      tournyService.setCurrentTourny($scope.tournaments[index].name);
      Players.setPlayerList(tournyService.getCurrentTournament().players);
    };

    //Permanently deletes a tournament from local storage
    $scope.deleteTournament = function(index) {
      tournyService.deleteTournament(index);
    };

    //Takes the current scope.tournaments variable and saves it to local storage. 
    $scope.updateTournaments = function(){
      $scope.tournaments = tournyService.getTournaments();
    };

  }
]);
