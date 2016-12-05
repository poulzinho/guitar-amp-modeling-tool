'use strict';

(function() {

  class CreatorController {
    constructor(User) {
      // Use the User $resource to fetch all users
      this.currentCreator = User.getCurrentUser();
    }

    showAmp(User){
      this.currentCreator = User.getCurrentUser();
      
    }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }
  }

  angular.module('sebaWebappApp.admin')
    .controller('CreatorController', CreatorController);
})();
