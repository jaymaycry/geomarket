'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('detailOffer', {
        url: '/detailOffer',
        template: '<detail-offer></detail-offer>',
        params: {
            obj: null
        }
      });
  });
