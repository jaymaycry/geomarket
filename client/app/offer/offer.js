'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('offer', {
        url: '/offer',
        template: '<offer></offer>'
      });
  });
