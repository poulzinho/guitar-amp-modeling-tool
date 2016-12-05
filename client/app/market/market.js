'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('market', {
        url: '/market',
        template: '<market></market>',
        authenticate: 'creator, player'
      });
  });
