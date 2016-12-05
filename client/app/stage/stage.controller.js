'use strict';
(function () {

  class StageComponent {

    constructor(Auth, $scope, $http, socket, $document, $filter, $controller, $timeout) {
      this.getCurrentUser = Auth.getCurrentUser;
      this.$scope = $scope;
      this.$http = $http;
      this.socket = socket;
      this.$document = $document;
      this.$filter = $filter;
      this.$timeout = $timeout;
      this.isFullScreen = false;
      this.pedals = [];
      this.amplifiers = []
      $scope.sndfxData = [];
      $scope.webAudioSndfxFiltersMap = new Map();

      this.pedalOptions = {
        visible: 5,
        perspective: 5,
        startSlide: 0,
        border: 0,
        dir: 'ltr',
        width: 360,
        height: 550,
        space: 300,
        loop: true,
        controls: true,
        clicking: true
      };

      this.pedalColors = [
        {color: 'GhostWhite'},
        {color: 'DeepSkyBlue'},
        {color: 'Aqua'},
        {color: 'SpringGreen'},
        {color: 'Lime'},
        {color: 'GreenYellow'},
        {color: 'Gold'},
        {color: 'Silver'},
        {color: 'SandyBrown'},
        {color: 'FireBrick'},
        {color: 'DeepPink'},
        {color: 'SlateBlue'}
      ];

      $scope.$on("$destroy", function () {
        $scope.turnOffWebAudioSndfx();
      });

      angular.extend(this, $controller('WebAudioSndfxsCtrl', {$scope: $scope}));

    }

    $onInit() {
      this.pedalsIdGen = 0;
      this.getAllSndfx();
      this.$scope.fakeAmp = {_id: 0, name: 'No set', filters: []}
      this.$scope.sndfxData = this.$scope.fakeAmp;
      this.$document.on('keyup', this.keyupHandler);
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!navigator.getUserMedia)
        return (alert("Error: getUserMedia not supported!"));
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
    }

    getAllSndfx() {
      this.$http.get('/api/sndfxs', {params: {userId: this.getCurrentUser()._id}})
        .then(response => {
          var sndfxs = response.data;
          for (var i = 0; i < sndfxs.length; i++) {
            var sndfx = sndfxs[i];
            this.addAmplifier(sndfx)
          }
        });
    }

    addAmplifier(amplifier) {
      this.amplifiers.push(amplifier);
    }

    addPedal() {
      this.$scope.inserted = {
        bgColor: {color: 'Black'},
        amplifier: this.$scope.fakeAmp,
      };
      this.pedals.splice(0, 0, this.$scope.inserted);
      this.$scope.sndfxData = this.$scope.inserted.amplifier;
    };

    removePedal(index) {
      this.pedals.splice(index, 1);
      this.$timeout(function () {
        angular.element('.carousel-3d-next').trigger('click');
      });
      if(this.pedals.length < 1) {
        this.$scope.turnOffWebAudioSndfx();
        this.onOffSwitch = false;
      }
    };

    showAmplifier(pedal) {
      var selected = [];
      if (pedal.amplifier) {
        selected = this.$filter('filter')(this.amplifiers, {name: pedal.amplifier.name});
      }
      return selected.length ? selected[0].name : 'Not set';
    };

    showPedalColor(pedal) {
      var selected = [];
      if (pedal.bgColor) {
        selected = this.$filter('filter')(this.pedalColors, {color: pedal.bgColor.color});
      }
      return selected.length ? selected[0].color : 'Not set';
    };

    slideChanged(index) {
      console.log('Slide Changed callback triggered. \n == Slide index is: ' + index + ' ==');
      this.switchAmplifier(index);
    }

    lastSlide(index) {
      console.log('Last Slide Selected callback triggered. \n == Slide index is: ' + index + ' ==');
    }

    beforeChange(index) {
      console.log('Before Slide Change callback triggered. \n == Slide index is: ' + index + ' ==');
    }

    selectedClick(index) {
      console.log('Selected Slide Clicked callback triggered. \n == Slide index is: ' + index + ' ==');
    }

    newSlideStart(index) {
      console.log('empieza: ' + index);
      this.pedalOptions.startSlide = index;
    }

    switchAmplifier(index) {
      if (this.pedals.length > 0) {
        console.log(this.amplifiers);
        this.$scope.sndfxData = this.pedals[index].amplifier;
        console.log(this.$scope.sndfxData);
        this.$scope.prepareWebAudioSndfx();
      } else {
        console.log("no pedals assigned");
      }
    }

    turnOnOff() {
      this.$scope.onOffValue = this.onOffSwitch;
      this.$scope.turnOnOffWebAudioSndfx(this.$scope.sndfxData.filters)
    }

    keyupHandler(keyEvent) {
      var kcode = keyEvent.keyCode;
      if (kcode == 37) {
          angular.element('.carousel-3d-prev').trigger('click');
      } else if (kcode == 39 || kcode == 32) {
          angular.element('.carousel-3d-next').trigger('click');
      }
    }

    goFullScreenViaWatcher() {
      this.$timeout(function () {
        angular.element('.carousel-3d-next').trigger('click');
      });
      this.isFullScreen = !this.isFullScreen;
    };

  }

  angular.module('sebaWebappApp')
    .component('stage', {
      templateUrl: 'app/stage/stage.html',
      controller: StageComponent
    });

})();
