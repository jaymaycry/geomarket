'use strict';
(function(){

class MyOffersComponent {
  constructor(Offer,$state, Auth) {
    this.Offer = Offer;
    this.$state = $state;
    this.offers;
    this.isLoggedIn = Auth.isLoggedIn;
    this.file;
  }
  
  $onInit() {
    this.offers = this.Offer.my();
  }
  
  status(offer) {
    if (offer.active === false) {
      return "deleted";
    }
    if (offer.status === "selled") {
      return "selled";
    }
    if (offer.status === "open") {
      if (Date.parse(offer.endDate) < Date.now()) {
        return "expired";
      }
      if (Date.parse(offer.startDate) > Date.now()) {
        return "scheduled";
      }
    }
    return "open";
  }
  
  uploadPicture(file){
    if(file && this.isLoggedIn()){
        this.$state.go("createOffering",{obj: file});
    }

  }
}

angular.module('geomarketApp')
  .component('myOffers', {
    templateUrl: 'app/myOffers/myOffers.html',
    controller: MyOffersComponent
  });

})();
