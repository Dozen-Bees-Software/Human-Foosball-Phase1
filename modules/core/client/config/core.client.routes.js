'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.tournament-maker.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('TournamentStyle1', {
      url: '/tournamentstyle1',
      templateUrl: 'modules/core/client/views/tourneyStyle1.client.view.html'
    })
    .state('TournamentStyle2', {
      url: '/tournamentstyle2',
      templateUrl: 'modules/core/client/views/tourneyStyle2.client.view.html'
    })
    .state('TournamentStyle3', {
      url: '/tournamentstyle3',
      templateUrl: 'modules/core/client/views/tourneyStyle3.client.view.html'
    })

    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
