'use strict';
(function(){

class DetailOfferComponent {
    constructor($state, $http) {
        this.offer;
        this.options = {};
        this.$state = $state;
        this.userMap;
        this.$http = $http;
        this.Offer;
        this.user;
        this.owner;
  }
    $onInit() {
        this.owner = false;
        this.Offer = this.$state.params.obj.offerObj;
        var _this = this;
        
        this.$http.get('/api/offers/' + this.$state.params.obj.id).then(response => {
            _this.offer = response.data;

            _this.options.zoom = 13;
            _this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
            _this.userMap = new google.maps.Map(map, _this.options);
            _this.setMarker(_this.offer);
            _this.offer.endDate = new Date(_this.offer.endDate);
            _this.getUser(_this.isOwner,_this);
            
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

    getUser(callback, thisElement) {
        var _this = this;
        if (typeof this.user == 'undefined') {
            this.$http.get('/api/users/me').then(response => {
                _this.user = response.data;

                if (typeof callback === "function") {
                    if (response.data != null) {
                        callback(true, thisElement);
                    }
                    else {
                        callback(false, thisElement);
                    }
                }
            });
        }
        else {
            if (typeof callback === "function") {
                callback(true, thisElement);
            }
        }
        
    }

    isOwner(hasUser,thisElement) {
        var _this = this;
        if (typeof hasUser == 'undefined' && typeof _this.user == 'undefined') {
            _this.getUser(_this.isOwner, _this);
        }
        else {
            var _this = thisElement;
            if (!hasUser) {
                return false;
            }
            else if (!typeof hasUser == 'undefined' && _this.owner) {
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
    }

    createComment(hasUser, thisElement) {
        var _this = this;
        if (typeof hasUser == 'undefined') {
            _this.getUser(_this.createComment, _this);
        }
        else {
            var _this = thisElement;
            if (!hasUser) {
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
    }

    deleteOffer() {
        if (this.owner) {
            _this.$state.go("deleteOffer", {
                obj: {
                    id: _this.offer._id,
                    offerObj: _this.Offer
                }
            });
        }
        else {
            alert("Delete offer failed: You are not the owner of this offer!")
        }
    }

    editOffer() {
        if (this.owner) {
            _this.$state.go("editOffer", {
                obj: {
                    id: _this.offer._id,
                    offerObj: _this.Offer
                }
            });
        }
        else {
            alert("Edit offer failed: You are not the owner of this offer!")
        }
    }

    sellOffer() {
        if (this.owner) {
            _this.$state.go("sellOffer", {
                obj: {
                    id: _this.offer._id,
                    offerObj: _this.Offer
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
