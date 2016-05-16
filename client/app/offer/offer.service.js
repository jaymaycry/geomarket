'use strict';

angular.module('geomarketApp.offer', ['ngResource'])
  .factory('Offer', function ($resource) {
    return $resource('api/offers/:id/:controller', {id: '@_id'}, {
      query: {
        method:'GET',
        isArray: true
      },
      update: {
        method:'PATCH'
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
