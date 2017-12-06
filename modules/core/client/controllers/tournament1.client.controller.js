'use strict';
//this file is unused and does not serve a purpose
angular.module('core').controller('Tournament1Controller', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);
