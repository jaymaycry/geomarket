'use strict';
(function () {

    class DetailOfferComponent {
        constructor($state, $http, Offer, $stateParams, Auth) {
            this.offer;
            this.options = {};
            this.$state = $state;
            this.userMap;
            this.$http = $http;
            this.Offer = Offer;
            this.user;
            this.Auth = Auth;
            this.isLoggedIn = Auth.isLoggedIn;
            this.getCurrentUser = Auth.getCurrentUser;
            this.owner;
            this.$stateParams = $stateParams;
        }
        $onInit() {
            this.owner = false;
            //this.Offer = this.$state.params.obj.offerObj;
            var _this = this;

            _this.offer = this.Offer.get({ id: this.$stateParams.id }, function (e) {
                _this.options.zoom = 13;
                _this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
                _this.userMap = new google.maps.Map(map, _this.options);
                _this.setMarker(_this.offer);
                _this.offer.endDate = new Date(_this.offer.endDate);
                _this.isOwner();
            });

        }


        setMarker(offer) {
            var marker = new google.maps.Marker({
                map: this.userMap,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(offer.loc[1], offer.loc[0]),
                visible: true
            });
            var bounds = new google.maps.LatLngBounds(marker.position);
            this.userMap.fitBounds(bounds);
        }
        goBack() {
            this.$state.go("main");
        }


        isOwner() {
            var _this = this;
            _this.user = _this.getCurrentUser();
            if (_this.user == 'undefined') {
                return false;
            }
            else if (_this.owner) {
                return true;
            }
            else {
                if (_this.offer._creator == _this.user._id) {
                    _this.owner = true;
                    return true;
                }
                else {
                    _this.owner = false;
                    return false;
                }
            }

        }

        createComment() {
            var _this = this;
            _this.user = _this.getCurrentUser();
            if (_this.user == 'undefined') {
                _this.$state.go("login");
            }
            else {
                _this.$state.go("createComment", {
                    obj: {
                        id: _this.offer._id,
                        offerObj: _this.Offer
                    }
                });
            }

        }

        deleteOffer() {
            if (this.owner) {
                this.$state.go("deleteOffer", {
                    obj: {
                        id: this.offer._id,
                        offerObj: this.Offer
                    }
                });
            }
            else {
                alert("Delete offer failed: You are not the owner of this offer!")
            }
        }

        editOffer() {
            if (this.owner) {
                this.$state.go("editOffer", {
                    obj: {
                        id: this.offer._id,
                        offerObj: this.Offer
                    }
                });
            }
            else {
                alert("Edit offer failed: You are not the owner of this offer!")
            }
        }

        sellOffer() {
            if (this.owner) {
                this.$state.go("sellOffer", {
                    obj: {
                        id: this.offer._id,
                        offerObj: this.Offer
                    }
                });
            }
            else {
                alert("Sell offer failed: You are not the owner of this offer!")
            }
        }
    }

    angular.module('geomarketApp').component('detailOffer', {
        templateUrl: 'app/detailOffer/detailOffer.html',
        controller: DetailOfferComponent
    });

})();
