'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        template: '<checkout></checkout>',
        authenticate: 'creator, player'
      });
  });
