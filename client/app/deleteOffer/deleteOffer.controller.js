'use strict';
(function(){

class DeleteOfferComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('geomarketApp')
  .component('deleteOffer', {
    templateUrl: 'app/deleteOffer/deleteOffer.html',
    controller: DeleteOfferComponent
  });

})();
