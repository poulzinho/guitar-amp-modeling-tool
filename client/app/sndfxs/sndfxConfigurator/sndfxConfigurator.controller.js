'use strict';
(function () {

  class SndfxConfiguratorComponent {

    constructor(Auth, $http, $scope, $controller, $location, $uibModal, socket) {
      this.isCreator = Auth.isCreator;
      this.$http = $http;
      this.$scope = $scope;
      this.$location = $location;
      this.$uibModal = $uibModal;
      this.socket = socket;
      this.alerts = [];
      $scope.sndfxData = [];
      $scope.webAudioSndfxFiltersMap = new Map();

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

      $scope.$on("$destroy", function () {
        $scope.turnOffWebAudioSndfx();
        socket.unsyncUpdates('sndfxData');
      });

      angular.extend(this, $controller('WebAudioSndfxsCtrl', {$scope: $scope}));

    }

    $onInit() {

      this.$http.get('/api/sndfxs/' + this.$location.search()._id)
        .then(response => {
          this.$scope.sndfxData = response.data;
          this.socket.syncUpdates('sndfxData', this.$scope.sndfxData);
        });

      this.$scope.gridsterOptions = {
        margins: [20, 20],
        draggable: {
          handle: '.box-header'
        },
        minSizeX: 1,
        minSizeY: 1
      };

      this.$scope.knobOptions = {
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

      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!navigator.getUserMedia)
        return (alert("Error: getUserMedia not supported!"));
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
    }

    saveSndfx() {
      if (this.$scope.sndfxData.name) {
        this.$http.put('/api/sndfxs/' + this.$scope.sndfxData._id, this.$scope.sndfxData);
        this.alerts.push({
          type: 'success',
          msg: ('"' + this.$scope.sndfxData.name + '"' + ' was saved')
        });
      }
    };

    publishSndfx(sndfx) {
      // go to snd conf editor page
      this.$location.path('publish').search({
        _id: sndfx._id
      })
    }

    removeSndfxFilter(sndFilter) {
      console.log("removing filter from ... " + this.$scope.sndfxData.name);
      this.$scope.sndfxData.filters.splice(this.$scope.sndfxData.filters.indexOf(sndFilter), 1);
    };

    dropSndfxFilter(target, source) {
      console.log(target);
      console.log(source);

      var filterType;
      var filterName;

      switch (source) {
        case 1:
          filterType = 'distortion';
          filterName = 'DISTORTION'
          break;
        case 2:
          filterType = 'gain';
          filterName = 'GAIN'
          break;
        case 3:
          filterType = 'delay';
          filterName = 'DELAY'
          break;
        case 4:
          filterType = 'reverb';
          filterName = 'REVERB'
          break;
        default:
          filterType = 'gain';
          filterName = 'GAIN'
      }

      this.$scope.sndfxData.filters.push({
        sizeX: 1,
        sizeY: 1,
        filter: filterType,
        value: 10,
        widget: 'knob',
        name: filterName,
        timestamp: String(new Date().getTime())
      });
    };

    configSndfxFilter(sndfxFilter) {
      this.$uibModal.open({
        scope: this.$scope,
        templateUrl: 'app/sndfxs/sndfxConfigurator/sndfxFilter/sndfxFilter.html',
        controller: 'SndfxFilterCtrl',
        resolve: {
          sndfxFilter: function () {
            return sndfxFilter;
          }
        }
      });
    };

    closeAlert(index) {
      this.alerts.splice(index, 1);
    };

  }

  angular.module('sebaWebappApp')
    .component('sndfx', {
      templateUrl: 'app/sndfxs/sndfxConfigurator/sndfxConfigurator.html',
      controller: SndfxConfiguratorComponent
    });

})();
