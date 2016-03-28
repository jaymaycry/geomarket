'use strict';

angular.module('geomarketApp.auth', [
  'geomarketApp.constants',
  'geomarketApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
