'use strict';
    /**
        * @description Represents The delete offer modal windows.
        * @constructor
        * @param {object} $scope - The $scope object.
        * @param {$uibModalInstance} $uibModalInstance - The $uibModalInstance is the modal instance.
        */
angular.module('geomarketApp')
  .controller('DeleteOfferController', function ($scope, $uibModalInstance) {

      /**
         * @description The deletion of the offer has been confirmed. 
         */
      $scope.ok = function () {
          $uibModalInstance.close(false);
      };

      /**
         * @description The deletion offer modal has been canceled. 
         */
      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };
  });
