'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sellOffer', {
        url: '/sellOffer',
        template: '<sell-offer></sell-offer>'
      });
  });
