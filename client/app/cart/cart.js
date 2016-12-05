'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cart', {
        url: '/cart',
        template: '<cart></cart>',
        authenticate: 'creator, player'
      });
  });
