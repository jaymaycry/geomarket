'use strict';

class SettingsController {
    /**
     * @description constructor for the settingscontroller
     * @constructor
     * @param {Auth} Auth -Object form the authorisation service
     */
  constructor(Auth) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  }
/**
 * @description Method to change the password
 * @param {object} form -The formobject of the input form
 */
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
}

angular.module('geomarketApp')
  .controller('SettingsController', SettingsController);
