'use strict';
//this file is unused and is useless
angular.module('core').controller('Tournament3Controller', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);
