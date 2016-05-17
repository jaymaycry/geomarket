'use strict';
/**
        * @description Represents The sell offer modal windows.
        * @constructor
        * @param {object} $scope - The $scope object.
        * @param {$uibModalInstance} $uibModalInstance - The $uibModalInstance is the modal instance.
        */
angular.module('geomarketApp')
  .controller('SellOfferController', function ($scope, $uibModalInstance) {

      /**
         * @description The sale of the offer has been confirmed. 
         */
      $scope.ok = function () {
          $uibModalInstance.close('selled');
      };

      /**
         * @description The sale of the offer has been canceled. 
         */
      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };
  });
