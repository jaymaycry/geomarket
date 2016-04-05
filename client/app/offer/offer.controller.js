'use strict';
(function(){

class OfferComponent {
  constructor(Offer, $geolocation) {
    this.Offer = Offer;
    this.offers = [];
    this.position;
    this.$geolocation = $geolocation;
  }
  
  $onInit() {
    this.$geolocation.getCurrentPosition({
      timeout: 60000
    }).then(position => {
      this.offers = this.Offer.query({longitude:position.coords.longitude,latitude:position.coords.latitude});
    });
  }
}

angular.module('geomarketApp')
  .component('offer', {
    templateUrl: 'app/offer/offer.html',
    controller: OfferComponent
  });
})();