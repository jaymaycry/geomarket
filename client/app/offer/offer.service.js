'use strict';

angular.module('geomarketApp.offer', ['ngResource'])
  .factory('offer', function ($resource) {
    return $resource('api/offers/:id', {id: '@id'}, {
      query: {
        method:'GET',
        isArray: true
      }
    });
  });
