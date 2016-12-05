'use strict';

angular.module('sebaWebappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('publish', {
        url: '/publish',
        template: '<publish></publish>',
        authenticate: 'creator'
      });
  });
