'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);

var myApp = angular.module('myApp', []);

myApp.controller('MyCtrl', function($scope) {
    
});
