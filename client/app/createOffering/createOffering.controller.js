'use strict';
(function () {

    class CreateOfferingComponent {
        /**
         * @description Represents an offer to create.
         * @constructor
         * @param {object} $state - The $state service.
         * @param {Offer} Offer - The offer service.
         * @param {Upload} Upload - The service to Upload files.
         * @param {$geolocation} $geolocation - The service to get the geolocation.
         */
        constructor(Offer, $geolocation, Upload, $state) {
            this.Upload = Upload;
            this.Offer = Offer;
            this.position;
            this.$state = $state;
            this.$geolocation = $geolocation;
            this.invalidStartDate = false;
            this.invalidEndDate = false;
            this.invalidPrice = false;
            this.invalidName = false;
        }
        /**
         * @description Initialize the offer
         */
        $onInit() {

            this.$geolocation.getCurrentPosition({
                timeout: 6000
            }).then(position => {
                this.position = position;
                this.offer = new this.Offer();
                this.offer.loc = [position.coords.longitude, position.coords.latitude];
                this.offer.startDate = new Date();
                this.offer.endDate = new Date();
                this.offer.endDate.setDate(this.offer.endDate.getDate() + 1);
                this.file = this.$state.params.obj;
            });
        }
        /**
         * @description Creates the offer object in the database with the given data.
         */
        submit() {
            this.controlOffering(this.offer);
            if (this.file) {
                this.upload(this.file);
            }
            else {
                console.log("nope");
            }
        }

        /**
         * @description Escapes the create offer, redirects to the main page.
         */
        reset() {
            console.log("reset");
            this.$state.go("main");
        }

        /**
        * @description Uploads the file to the database.
        * @param (file) File to be uploaded.
        */
        upload(file) {
            this.Upload.upload({
                url: '/uploads/',
                data: { photo: file }
            }).then(resp => {
                //console.log('success: '+ resp);
                this.offer.picture = resp.data;
                this.offer.$save();
                this.$state.go("main");

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
        .component('createOffering', {
            templateUrl: 'app/createOffering/createOffering.html',
            controller: CreateOfferingComponent
        });

})();
