'use strict';

angular.module('sebaWebappApp', ['sebaWebappApp.auth', 'sebaWebappApp.admin',
  'sebaWebappApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io',
  'ui.router', 'ui.bootstrap', 'validation.match', 'gridster', 'ang-drag-drop', 'ui.knob',
  'ngParallax', 'ngStorage', 'dialogs.main', 'xeditable', 'FBAngular', 'angular-carousel-3d'
])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(['dialogsProvider', '$translateProvider', function (dialogsProvider, $translateProvider) {
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);

    $translateProvider.translations('en-US', {
      DIALOGS_ERROR: "Error",
      DIALOGS_ERROR_MSG: "An unknown error has occurred.",
      DIALOGS_CLOSE: "Close",
      DIALOGS_PLEASE_WAIT: "Please Wait",
      DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
      DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
      DIALOGS_PERCENT_COMPLETE: "% Complete",
      DIALOGS_NOTIFICATION: "Notification",
      DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
      DIALOGS_CONFIRMATION: "Confirmation",
      DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
      DIALOGS_OK: "OK",
      DIALOGS_YES: "Yes",
      DIALOGS_NO: "No"
    });

    $translateProvider.preferredLanguage('en-US');
  }])
  .run(function (editableOptions) {
    editableOptions.theme = 'bs3';
  });
