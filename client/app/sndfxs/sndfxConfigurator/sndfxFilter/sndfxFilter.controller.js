'use strict';

angular.module('sebaWebappApp')
  .controller('SndfxFilterCtrl', ['$scope', '$timeout', '$rootScope', '$uibModalInstance', 'sndfxFilter',
    function ($scope, $timeout, $rootScope, $uibModalInstance, sndfxFilter) {

      $scope.sndfxFilter = sndfxFilter;

      $scope.form = {
        name: sndfxFilter.name,
        filter: sndfxFilter.filter,
        value: sndfxFilter.value
      };

      $scope.dismiss = function () {
        $uibModalInstance.dismiss();
      };

      $scope.submit = function () {
        angular.extend(sndfxFilter, $scope.form);
        $uibModalInstance.close(sndfxFilter);
      };
    }
  ]);

