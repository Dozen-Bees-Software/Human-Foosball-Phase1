'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
'tournConfig',
  function ($scope, Authentication, tournConfig) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.tourneyInfos = [];


    $scope.showInfo=function(){

      $scope.info = 'I in Team is where every player is out for themselves and ranked individually. Teams are shuffled and balanced to provide all players the fairest game possible.';

    };

    $scope.tourneySummary = false;
    $scope.revealInfo= function() {
      $scope.tourneySummary=true;
    };

    $scope.rounds = [];
    $scope.playersPerTeam= 0;
    $scope.numPoints= 0;
    $scope.tie= 0;



    $scope.saveTourneyInfo = function(){
      $scope.tourneyInfos.push($scope.tournamentName);
      $scope.tourneyInfos.push($scope.playersPerTeam);
      $scope.tourneyInfos.push($scope.rounds);
      console.log('This is the rounds being pushed %i', $scope.rounds.length);
      $scope.tourneyInfos.push($scope.numPoints);
      $scope.tourneyInfos.push($scope.tie);

      console.log('tourney info was saved');
      tournConfig.addTournamentInfo($scope.tourneyInfos);

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
  }
]);
