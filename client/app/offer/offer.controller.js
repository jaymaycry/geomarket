'use strict';
(function(){

class OfferComponent {
  constructor(offer, $geolocation) {
    this.offerService = offer;
    this.offers = [];
    this.position;
    this.$geolocation = $geolocation;
  }
  
  $onInit() {
    this.$geolocation.getCurrentPosition({
      timeout: 60000
    }).then(position => {
      this.offers = this.offerService.query({longitude:position.coords.longitude,latitude:position.coords.latitude});
    });
  }
}

angular.module('geomarketApp')
  .component('offer', {
    templateUrl: 'app/offer/offer.html',
    controller: OfferComponent
  });

})();
