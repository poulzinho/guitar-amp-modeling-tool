'use strict';

(function() {

  class MainController {

    constructor(Auth, $http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;
      this.sndfxs = [];
      
      $scope.$on('$destroy', function() {
      });
     
    }

    $onInit() {
      this.$http.get('/api/sndfxs')
        .then(response => {
          this.sndfxs = response.data;
          this.socket.syncUpdates('sndfx', this.sndfxs);
        });
    }
    
  }

  angular.module('sebaWebappApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
