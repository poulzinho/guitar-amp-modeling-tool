'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders',
        template: '<orders></orders>',
        authenticate: 'creator, player'
      });
  });
