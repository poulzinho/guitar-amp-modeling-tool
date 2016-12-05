'use strict';

angular.module('sebaWebappApp')
  .controller('SndfxPreviewCtrl', ['$scope', '$timeout', '$rootScope', '$uibModalInstance', '$controller', 'sndfx',
    function ($scope, $timeout, $rootScope, $uibModalInstance, $controller, sndfx) {
      $scope.sndfxData = sndfx;
      $scope.webAudioSndfxFiltersMap = new Map();
      
      $scope.gridsterOptions = {
        margins: [20, 20],
        draggable: {
          enabled: false 
        },
        resizable: {
          enabled: false
        },
        minSizeX: 1,
        minSizeY: 1
      };

      $scope.knobOptions = {
        size: 75,
        skin: {
          type: 'tron',
          width: 0, color: '#ff0000', spaceWidth: 2
        },
        scale: {
          enabled: true,
          color: '#000000',
          type: 'lines',
          width: 1,
          quantity: 9,
          spaceWidth: 3
        },
        startAngle: -180,
        endAngle: 180,
        trackColor: "#111",
        barColor: '#BB0000',
        bgColor: '#222',
        trackWidth: 7,
        barWidth: 5,
        min: 0,
        max: 100,
        textColor: "#BBBBBB",
      };
      
      $scope.$watch('sndfxData.filters',
        function (newValue, oldValue) {
          var diffSndfxFilter = _.differenceBy(newValue, oldValue, 'value');
          if (diffSndfxFilter.length == 1) {
            $scope.updateWebAudioSndfx(diffSndfxFilter[0]);
          } else {
            $scope.prepareWebAudioSndfx();
          }
        },
        true);
      
      $scope.dismiss = function () {
        $uibModalInstance.dismiss();
      };
      
      $scope.$on("$destroy", function () {
        $scope.turnOffWebAudioSndfx();
      });
      
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!navigator.getUserMedia)
        return (alert("Error: getUserMedia not supported!"));
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      
      angular.extend(this, $controller('WebAudioSndfxsCtrl', {$scope: $scope}));
    }
  ]);
