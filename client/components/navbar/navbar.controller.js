'use strict';

class NavbarController {

  constructor(Auth, $scope, $localStorage) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.localStorage = $localStorage.$default({
      cart: new Array()
    });

  }
}

angular.module('sebaWebappApp')
  .controller('NavbarController', NavbarController);
