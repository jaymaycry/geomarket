'use strict';
(function () {

    class DetailOfferComponent {
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
            this.active = false;
        }
        $onInit() {
            this.owner = false;

            this.offer = this.Offer.get({ id: this.$stateParams.id }, (offer) => {
                this.offer.endDate = new Date(this.offer.endDate);
                this.options.zoom = 13;
                this.options.center = new google.maps.LatLng(offer.loc[1],offer.loc[0]);
                this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
                this.options.draggable = ($(window).width() < 1025) == false;
                this.userMap = new google.maps.Map(map,this.options);
                var marker = new google.maps.Marker({
                    map: this.userMap,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(offer.loc[1],offer.loc[0]),
                    visible: true,
                    icon: '/assets/icons/icon.png'
                });
                this.active = offer.status == "open" && (typeof (offer.active) == 'undefined' || offer.active) ? true : false;
            }, (error) => {
                this.active = false;
            });

        }
        
        addComment() {
            var reloadedOffer = this.Offer.addComment({id: this.offer._id}, {text: this.comment}, (reloadedOffer) => {
                this.offer.comments = reloadedOffer.comments;
            });
            this.comment = "";
        }

        setMarker(offer){
            var marker = new google.maps.Marker({
                map: this.userMap,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(offer.loc[1],offer.loc[0]),
                visible: true,
                icon: '/assets/icons/icon.png'
            });
            var bounds = new google.maps.LatLngBounds(marker.position);
            this.offerMap.fitBounds(bounds);
        }

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

        deleteOffer() {
            //this.offer.active = false;
            this.offer.$update(() => {
                this.$state.go('myOffers');
            });
        }

        sellOffer() {
            //this.offer.status = 'selled';
            this.offer.$update(() => {
                this.$state.go('myOffers');
            });
        }

        quit() {
            this.$state.go('main');
        }
    }

    angular.module('geomarketApp').component('detailOffer', {
        templateUrl: 'app/detailOffer/detailOffer.html',
        controller: DetailOfferComponent
    });

})();
