'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sndfxConfigurator', {
        url: '/sndfxConfigurator',
        template: '<sndfx></sndfx>',
        authenticate: 'creator, player'
      });
  })
;
