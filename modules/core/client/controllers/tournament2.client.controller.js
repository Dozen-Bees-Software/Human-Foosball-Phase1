'use strict';
//this file is unused and serves no purposes
angular.module('core').controller('Tournament2Controller', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);
