'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createOffering', {
        url: '/createOffering',
        template: '<create-offering></create-offering>'
      });
  });
