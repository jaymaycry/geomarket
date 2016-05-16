'use strict';
(function () {

    class MyOffersComponent {
        /**
         * @description Represents the users offers.
         * @constructor
         * @param {object} $state - The $state service.
         * @param {Offer} Offer - The offer service.
         * @param {Auth) Auth - The authentication service.
         */
        constructor(Offer, $state, Auth) {
            this.Offer = Offer;
            this.$state = $state;
            this.offers;
            this.isLoggedIn = Auth.isLoggedIn;
            this.file;
        }
        /**
        * @description Loads all offers from the logged in user.
        */
        $onInit() {
            this.offers = this.Offer.my();
        }
        /**
        * @description Gives the status of a given offer object..
        * param (object) A offer object.
        * @returns {string} The status class.
        */
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

        /**
         * @description Check if a file is available and user is logged in, forwards to createOffering
         * @param {file} The uploaded file.
         */
        uploadPicture(file) {
            if (file && this.isLoggedIn()) {
                this.$state.go("createOffering", { obj: file });
            }

        }
    }

    angular.module('geomarketApp')
      .component('myOffers', {
          templateUrl: 'app/myOffers/myOffers.html',
          controller: MyOffersComponent
      });

})();
