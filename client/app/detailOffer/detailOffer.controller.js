'use strict';
(function () {

    class DetailOfferComponent {
        /**
         * @description Represents a DetailOffer.
         * @constructor
         * @param {object} $state - The $state service.
         * @param {object} $stateParams - Contains information about the url.
         * @param {Offer} Offer - The offer service.
         * @param {Auth) Auth - The authentication service.
         * @param {$uibModal} $uibModal - The service to create modal windows.
         */
        constructor($state, $stateParams, Offer, Auth, $uibModal) {
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.Offer = Offer;
            this.isLoggedIn = Auth.isLoggedIn;
            this.getCurrentUser = Auth.getCurrentUser;
            this.offer;
            this.offerMap;
            this.owner;
            this.options = {};
            this.map;
            this.comment = "";
            this.$uibModal = $uibModal;
            this.active = true;
        }

        /**
         * @description Initialize the offer, loads the map.
         */
        $onInit() {
            this.owner = false;

            this.offer = this.Offer.get({ id: this.$stateParams.id }, (offer) => {
                this.offer.endDate = new Date(this.offer.endDate);
                this.options.zoom = 13;
                this.options.center = new google.maps.LatLng(offer.loc[1], offer.loc[0]);
                this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
                this.options.draggable = ($(window).width() < 1025) == false;
                this.userMap = new google.maps.Map(map, this.options);
                var marker = new google.maps.Marker({
                    map: this.userMap,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(offer.loc[1], offer.loc[0]),
                    visible: true,
                    icon: '/assets/icons/icon.png'
                });
            }, (error) => {
                this.active = false;
            });

        }

        /**
         * @description Adds new comment to Offer
         */
        addComment() {
            var reloadedOffer = this.Offer.addComment({ id: this.offer._id }, { text: this.comment }, (reloadedOffer) => {
                this.offer.comments = reloadedOffer.comments;
            });
            this.comment = "";
        }

        /**
         * @description Check the comments creator
         * @returns {string} The CSS class for the comment.
         */
        commentClass(creatorId) {
            if (creatorId === this.offer._creator) {
                return "comment-creator";
            }
            if (creatorId === this.getCurrentUser._id) {
                return "comment-self";
            }
        }

        /**
         * @description Set the marker for this offer
         * @params {object} The current offer.
         */
        setMarker(offer) {
            var marker = new google.maps.Marker({
                map: this.userMap,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(offer.loc[1], offer.loc[0]),
                visible: true,
                icon: '/assets/icons/icon.png'
            });
            var bounds = new google.maps.LatLngBounds(marker.position);
            this.offerMap.fitBounds(bounds);
        }

        /**
         * @description Opens the delete modal for this offer
         */
        openDeleteOffer() {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: 'deleteOffer.html',
                controller: 'DeleteOfferController'
            });

            modalInstance.result.then((active) => {
                this.offer.active = active;
                this.deleteOffer();
            });
        }

        /**
         * @description Opens the sell modal for this offer
         */
        openSellOffer() {
            var modalInstance = this.$uibModal.open({
                animation: true,
                templateUrl: 'sellOffer.html',
                controller: 'SellOfferController'
            });
            modalInstance.result.then((status) => {
                this.offer.status = status;
                this.sellOffer();
            });
        }

        /**
         * @description Deletes this offer, redirects to myOffers.
         */
        deleteOffer() {
            this.offer.$update(() => {
                this.$state.go('myOffers');
            });
        }

        /**
         * @description Sells this offer, redirects to myOffers.
         */
        sellOffer() {
            this.offer.$update(() => {
                this.$state.go('myOffers');
            });
        }

        /**
         * @description Escapes the detailoffer, redirects to the main page.
         */
        quit() {
            this.$state.go('main');
        }
    }

    angular.module('geomarketApp').component('detailOffer', {
        templateUrl: 'app/detailOffer/detailOffer.html',
        controller: DetailOfferComponent
    });

})();
