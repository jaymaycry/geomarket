'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myOffers', {
        url: '/myOffers',
        template: '<my-offers></my-offers>'
      });
  });
