'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  submittedAnonymous = false;
  captchaResponse = null;
  
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        'g-recaptcha-response': this.captchaResponse
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
  
  registerAnonymous(form) {
    this.submittedAnonymous = true;
    
    if (form.$valid) {
      this.Auth.createAnonymousUser({'g-recaptcha-response': this.captchaResponse})
      .then(() => {
        this.$state.go('main');
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}

angular.module('geomarketApp')
  .controller('SignupController', SignupController);
