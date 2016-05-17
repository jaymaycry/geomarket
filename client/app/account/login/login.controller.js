'use strict';

class LoginController {
    /**
     * @description Constructor for LoginController
     * @constructor
     * @param {Auth} Auth -Object form the authorisation service
     * @param {$state} $state -The state object 
     */
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  /**
   * @description method to log into geomarket
   * @param {object} form - the object from the input form
   */
  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('geomarketApp')
  .controller('LoginController', LoginController);
