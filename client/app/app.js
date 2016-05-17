'use strict';

angular.module('geomarketApp', [
  'geomarketApp.auth',
  'geomarketApp.admin',
  'geomarketApp.constants',
  'geomarketApp.offer',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngGeolocation',
  'ngFileUpload',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'uiGmapgoogle-maps',
  'vcRecaptcha',
  'angularMoment',
  'angularSpinner'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
