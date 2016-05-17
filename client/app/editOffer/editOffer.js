'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('editOffer', {
        url: '/editOffer/:id',
        template: '<edit-offer></edit-offer>'
      });
  });
