'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stage', {
        url: '/stage',
        template: '<stage></stage>',
        authenticate: 'creator, player'
      });
  });
