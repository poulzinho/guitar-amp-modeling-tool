'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sndfxs', {
        url: '/sndfxs',
        template: '<sndfxs></sndfxs>',
        authenticate: 'creator, player'
      });
  });
