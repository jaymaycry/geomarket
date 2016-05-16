'use strict';

angular.module('geomarketApp.offer', ['ngResource'])
  .factory('Offer', function ($resource) {
      return $resource('api/offers/:id/:controller', { id: '@_id' }, {
          /**
          * @description Get all offers or a given offer by id from the database.
          */
          query: {
              method: 'GET',
              isArray: true
          },
          /**
          * @description Updates a given offer to the database.
          */
          update: {
              method: 'PATCH'
          },
          /**
          * @description Adds a comment to a given offer..
          */
          addComment: {
              method: 'PUT',
              params: {
                  controller: 'comment'
              }
          },
          /**
          * @description Get all offers of a specific user.
          */
          my: {
              method: 'GET',
              isArray: true,
              params: {
                  controller: 'my'
              }
          }
      });
  });
