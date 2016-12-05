'use strict';

angular.module('sebaWebappApp')
  .directive('sndfxPreview', function () {
    return {
      templateUrl: 'app/sndfxPreview/sndfxPreview.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
