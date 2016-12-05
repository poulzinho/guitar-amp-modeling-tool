'use strict';

angular.module('sebaWebappApp.auth', ['sebaWebappApp.constants', 'sebaWebappApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
