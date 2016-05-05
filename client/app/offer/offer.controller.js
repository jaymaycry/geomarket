'use strict';
(function(){

class OfferComponent {
  constructor(Offer) {
    this.Offer = Offer;
    this.offers = [];
    this.position;
  }
  
  $onInit() {
    this.offers = this.Offer.my();
  }
}

angular.module('geomarketApp')
  .component('offer', {
    templateUrl: 'app/offer/offer.html',
    controller: OfferComponent
  });
})();
