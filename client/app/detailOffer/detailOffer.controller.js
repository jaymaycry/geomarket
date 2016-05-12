'use strict';
(function () {

    class DetailOfferComponent {
        constructor($state, $stateParams, Offer, Auth) {
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
           
        }
        $onInit() {
            this.owner = false;

            this.offer = this.Offer.get({ id: this.$stateParams.id }, (offer) => {
                this.offer.endDate = new Date(this.offer.endDate);
                this.options.zoom = 13;
                this.options.center = new google.maps.LatLng(offer.loc[1],offer.loc[0]);
                this.options.mapTypeId= google.maps.MapTypeId.ROADMAP;
                this.userMap = new google.maps.Map(map,this.options);
                var marker = new google.maps.Marker({
                    map: this.userMap,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(offer.loc[1],offer.loc[0]),
                    visible: true,
                    icon: '/assets/icons/icon.png'
                });
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

        deleteOffer() {
            // should ask with modal
            this.offer.active = false;
            this.offer.$save(() => {
                //-> should go to myOffers
                this.$state.go('main');
            });
        }

        sellOffer() {
            // should ask with modal
            this.offer.status = 'selled';
            this.offer.$save(() => {
                //-> should go to myOffers
                this.$state.go('main');
            });
        }
    }

    angular.module('geomarketApp').component('detailOffer', {
        templateUrl: 'app/detailOffer/detailOffer.html',
        controller: DetailOfferComponent
    });

})();
