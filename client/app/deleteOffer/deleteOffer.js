'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('deleteOffer', {
        url: '/deleteOffer',
        template: '<delete-offer></delete-offer>'
      });
  });
