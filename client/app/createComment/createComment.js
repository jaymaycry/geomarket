'use strict';

angular.module('geomarketApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createComment', {
        url: '/createComment',
        template: '<create-comment></create-comment>',
        params: {
            obj: null
        }
      });
  });
