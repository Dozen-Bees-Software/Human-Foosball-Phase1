'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',

  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;


    $scope.showInfo=function(){
      $scope.info = "tourney info here";
    }

    $scope.tourneySummary = false;
    $scope.revealInfo= function() {
      $scope.tourneySummary=true;
    };


    $scope.playersPerTeam= 0;
    $scope.numPoints= 0;
    $scope.tie= 0;

    $scope.IsVisible= false;
    $scope.ShowHide = function () {
  //If DIV is visible it will be hidden and vice versa.
      $scope.IsVisible = true;

    };
  }
]);
