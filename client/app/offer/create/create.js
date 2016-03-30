'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/offer/create',
        template: '<create></create>'
      });
  });
