'use strict';

class FooterController {

  constructor($location) {
    this.$location = $location;
    this.hola = 'hola';
  }

  isActive (viewLocation) {
    return viewLocation === this.$location.path();
  };

}

angular.module('sebaWebappApp')
  .controller('FooterController', FooterController);
