'use strict';
(function(){

class EditOfferComponent {
    constructor($state, $stateParams, $geolocation, Offer, Auth, Upload) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.Offer = Offer;
        this.Upload = Upload;
        this.isLoggedIn = Auth.isLoggedIn;
        this.getCurrentUser = Auth.getCurrentUser;
        this.offer;
        this.file;
        this.offerMap;
        this.options = {};
        this.map;
        this.comment = "";
        this.$geolocation = $geolocation;
    }
    $onInit() {
        this.offer = this.Offer.get({ id: this.$stateParams.id }, (offer) => {
            this.offer.startDate = new Date(offer.startDate);
            this.offer.endDate = new Date(offer.endDate);
            this.loadMap(offer);
        });
    }

    loadMap(offer) {
        this.options.zoom = 13;
        this.options.center = new google.maps.LatLng(offer.loc[1], offer.loc[0]);
        this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.userMap = new google.maps.Map(map, this.options);
        var marker = new google.maps.Marker({
            map: this.userMap,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(offer.loc[1], offer.loc[0]),
            visible: true,
            icon: '/assets/icons/icon.png'
        });
    }

    submit() {
        this.controlOffering(this.offer);
        if (this.file && this.file != this.offer.picture) {
            this.upload(this.file)
            .then(resp => {
                this.offer.picture = resp.data;
                this.offer.$update();
                this.$state.go('myOffers');
            });
        }
        else {
            this.offer.$update();
            this.$state.go('myOffers');
        }
    }

    updateGeolocation() {
        this.$geolocation.getCurrentPosition({
            timeout: 6000
        }).then(position => {
            this.offer.loc = [position.coords.longitude, position.coords.latitude];
            this.loadMap(this.offer);
        });
    }

    upload(file) {
        return this.Upload.upload({
            url: '/uploads/',
            data: { photo: file }
        });
    }
    
    uploadPicture(file) {
        if (file) {
            this.file = file;
        }
    }

    controlOffering(offer) {
        var message = " ";
        try {
            if (!offer.name.trim()) {
                throw ("No name defined");
            }

            if (isNaN(offer.price)) {
                throw "Price is not a number";
            }
        }
        catch (e) {
            console.error(e);
            throw new Error(e);

        }
    }
}

angular.module('geomarketApp')
  .component('editOffer', {
    templateUrl: 'app/editOffer/editOffer.html',
    controller: EditOfferComponent
  });

})();
