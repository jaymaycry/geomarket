'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('detailOffer', {
        url: '/detailOffer/:id',
        template: '<detail-offer></detail-offer>'
        
      });
  });
