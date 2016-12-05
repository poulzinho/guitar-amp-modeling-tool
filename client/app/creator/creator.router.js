'use strict';

angular.module('sebaWebappApp.admin')
  .config(function($stateProvider) {
    $stateProvider.state('creator', {
      url: '/creator',
      //templateUrl: 'app/sdfxs/sdfxs.html',
      controller: 'CreatorController',
      controllerAs: 'creator',
      authenticate: 'creator'
    });
  });
