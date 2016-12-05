'use strict';

class SettingsController {

  constructor(Auth, $scope) {
    this.Auth = Auth;
    this.getCurrentUser = Auth.getCurrentUser;
    this.allowedRoles = ['creator', 'player'];
    this.userRole = this.getCurrentUser().role;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
  
  changeRole(form) {
    console.log(form);
    this.submitted = true;

    if (form.$valid) {
      console.log('valid!');
      this.Auth.changeRole(this.userRole)
        .then(() => {
          this.message = 'Role successfully changed. Refresh your Browser';
        })
        .catch(() => {
          this.errors.other = 'Incorrect user mode';
          this.message = '';
        });
    }
  }
}

angular.module('sebaWebappApp')
  .controller('SettingsController', SettingsController);
