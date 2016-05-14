'use strict';

angular.module('geomarketApp')
  .controller('SellOfferController', function ($scope, $uibModalInstance) {
      $scope.ok = function () {
          $uibModalInstance.close('selled');
      };

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };
  });
