'use strict';
(function(){

class CreateOfferingComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('geomarketApp')
  .component('createOffering', {
    templateUrl: 'app/createOffering/createOffering.html',
    controller: CreateOfferingComponent
  });

})();
