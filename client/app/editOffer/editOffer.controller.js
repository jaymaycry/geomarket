'use strict';
(function () {

    class EditOfferComponent {
        /**
         * @description Represents an offer to edit.
         * @constructor
         * @param {object} $state - The $state service.
         * @param {object} $stateParams - Contains information about the url.
         * @param {Offer} Offer - The offer service.
         * @param {Auth) Auth - The authentication service.
         * @param {Upload} Upload - The service to Upload files.
         * @param {$geolocation} $geolocation - The service to get the geolocation.
         */
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
            this.invalidStartDate = false;
            this.invalidEndDate = false;
            this.invalidPrice = false;
            this.invalidName = false;
        }

        /**
         * @description Initialize the offer, loads the map.
         */
        $onInit() {
            this.offer = this.Offer.get({ id: this.$stateParams.id }, (offer) => {
                this.offer.startDate = new Date(offer.startDate);
                this.offer.endDate = new Date(offer.endDate);
                this.loadMap(offer);
            });
        }

        /**
         * @description Loads the map with the offers geolocation.
         * @param (object) The current offer.
         */
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

        /**
         * @description Updates the offer object in the database with the new data.
         */
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

        /**
         * @description Updates the geoLocation from the current offer to the current position.
         */
        updateGeolocation() {
            this.$geolocation.getCurrentPosition({
                timeout: 6000
            }).then(position => {
                this.offer.loc = [position.coords.longitude, position.coords.latitude];
                this.loadMap(this.offer);
            });
        }

        /**
        * @description Uploads the file to the database.
        * @param (file) File to be uploaded.
        */
        upload(file) {
            return this.Upload.upload({
                url: '/uploads/',
                data: { photo: file }
            });
        }

        /**
        * @description Check if file is a picture.
        * @param (file) File to be uploaded.
        */
        uploadPicture(file) {
            if (file) {
                this.file = file;
            }
        }

        /**
        * @description Check if the offer datas are valid.
        * @param (object) The offer object.
        */
        controlOffering(offer) {
            var message = " ";
            try {
                var today = new Date();

                if (offer.startDate != null) {
                    if (offer.startDate.getYear() < today.getYear() || offer.startDate.getMonth() < today.getMonth() || offer.startDate.getDate() < today.getDate()) {
                        this.invalidStartDate = true;
                    }
                    else {
                        this.invalidStartDate = false;
                    }
                }

                if (offer.endDate != null) {
                    if (offer.endDate.getYear() < offer.startDate.getYear() || offer.endDate.getMonth() < offer.startDate.getMonth() || offer.endDate.getDate() < offer.startDate.getDate()) {
                        this.invalidEndDate = true;
                    }
                    else {
                        this.invalidEndDate = false;
                    }
                }

                if (typeof (offer.name) == 'undefined' || !offer.name.trim()) {
                    this.invalidName = true;        
                }
                else {
                    this.invalidName = false;
                }

                if (isNaN(offer.price) || offer.price < 0) {
                    this.invalidPrice = true;
                }
                else {
                    this.invalidPrice = false;
                }

                if (this.invalidStartDate || this.invalidEndDate || this.invalidName || this.invalidPrice) {
                    throw ("Invalid values in offer form.");
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
