'use strict';

angular.module('geomarketApp')
  .controller('DeleteOfferController', function ($scope, $uibModalInstance) {
      $scope.message = 'Hello';
      $scope.ok = function () {
          $uibModalInstance.close(false);
      };

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };
  });
