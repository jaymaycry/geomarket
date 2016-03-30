'use strict';
(function(){

class CreateComponent {
  constructor(Offer, $geolocation, Upload) {
    this.Upload = Upload;
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
  
  submit() {
    if (this.file) {
      this.upload(this.file);
    }
  }
  
  upload(file) {
    this.Upload.upload({
      url: '/uploads/',
      data: {photo: file}
    }).then(resp => {
      console.log('Success: ' + resp);
      this.offer.picture = resp.data;
      this.offer.$save();
    });
  }
}

angular.module('geomarketApp')
  .component('create', {
    templateUrl: 'app/offer/create/create.html',
    controller: CreateComponent
  });
})();
