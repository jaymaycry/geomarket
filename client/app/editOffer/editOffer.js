'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editOffer', {
        url: '/editOffer',
        template: '<edit-offer></edit-offer>',
        params: {
            obj: null
        }
      });
  });
