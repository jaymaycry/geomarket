'use strict';

angular.module('geomarketApp.offer', ['ngResource'])
  .factory('Offer', function ($resource) {
    return $resource('api/offers/:id/:controller', null, {
      query: {
        method:'GET',
        isArray: true
      },
      addComment: {
        method: 'PUT',
        params: {
          controller: 'comment'
        }
        
      },
      my: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'my'
        }
      }
    });
  });
