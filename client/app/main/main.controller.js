'use strict';

(function() {

    class MainController {
       /**
        * @description Constructor of the Mainconroller
        * @constructor
        * @param {Upload} Upload - Service to upload
        * @param {Offer} Offer - Service to get offerings
        * @param {$geolocation} $geolocation - The service to get location
        * @param {$state} $state - State service.
        */
        constructor(Offer, Auth, $geolocation, $state) {
            this.position;
            this.$geolocation = $geolocation;
            this.$state=$state;
            this.Offer = Offer;
            this.offers = [];
            this.options = {};
            this.userMap;
            this.marker;
            this.isLoggedIn = Auth.isLoggedIn;
            this.position;
            this.showSpinner = true;
            this.showInfo = false;
        }
        /**
         *@description initialisation method
         */
        $onInit() {
            this.$geolocation.getCurrentPosition({
                timeout: 6000
                    
            }).then(position => {
                this.showSpinner = false;
                this.position = position;
                this.options.zoom = 13;
                this.options.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.options.mapTypeId= google.maps.MapTypeId.ROADMAP;
                this.userMap = new google.maps.Map(map,this.options);
                this.offers = this.Offer.query({longitude:position.coords.longitude,latitude:position.coords.latitude});

            })
            .catch(() => {
                this.showSpinner = false;
                this.showInfo = true;
            });

        }
        /**
         * @description Method to redirect a file to the createOffering controller
         * @param {file} file -a file in this case a picture.
         */
        uploadPicture(file){
            if(file && this.isLoggedIn()){
                this.$state.go("createOffering",{obj: file});
            }
        
        }
        /**
         * @description Method to set a google marker for the Offer
         * @param {offer} Offer object to set the marker.
         */
        setMarker(offer){
				var marker = new google.maps.Marker({
					map: this.userMap,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng(offer.loc[1],offer.loc[0]),
                    visible: true,
                    icon: '/assets/icons/icon.png'
				});
        }
        
    }

    angular.module('geomarketApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController
        });

})();
