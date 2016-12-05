'use strict';

angular.module('sebaWebappApp')
  .directive('footer', function() {
    return {
      templateUrl: 'components/footer/footer.html',
      controller: 'FooterController', 
      controllerAs: 'Foota',
      restrict: 'E',
    };
  });
