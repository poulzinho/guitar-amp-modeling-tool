'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orderViewer', {
        url: '/orderViewer',
        template: '<order-viewer></order-viewer>',
        authenticate: 'creator, player'
      });
  });
