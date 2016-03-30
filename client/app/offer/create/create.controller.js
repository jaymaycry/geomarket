'use strict';
(function(){

class CreateComponent {
  constructor(Offer, $geolocation) {
    this.Offer = Offer;
    this.position;
    this.$geolocation = $geolocation;
  }
  
  $onInit() {
    this.$geolocation.getCurrentPosition({
      timeout: 60000
    }).then(position => {
      this.offer = new this.Offer();
      this.offer.loc = [position.coords.longitude, position.coords.latitude];
    });
  }
}

angular.module('geomarketApp')
  .component('create', {
    templateUrl: 'app/offer/create/create.html',
    controller: CreateComponent
  });
})();
