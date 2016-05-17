'use strict';

class SignupController {
/**
 * @description Controuctor of the SignupController
 * @constructor
 * @param {Auth} Auth -The authentication service
 * @param {$state} $state -The sate service
 */
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  submittedAnonymous = false;
  captchaResponse = null;
  SignUpIsHidden = false;
  
  //end-non-standard
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
    
  }
  /**
   * @description Method to register an user 
   * @param {object} form -the form object from the input form
   */
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
  /**
   *@description Method to register an user anonymously
   @param{form} form -the form object of the anonymously input form
  */
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
  showSignUpStrong(){
      this.SignUpIsHidden = !this.SignUpIsHidden;
  }
}

angular.module('geomarketApp')
  .controller('SignupController', SignupController);
