'use strict';
(function(){

class SellOfferComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('geomarketApp')
  .component('sellOffer', {
    templateUrl: 'app/sellOffer/sellOffer.html',
    controller: SellOfferComponent
  });

})();
