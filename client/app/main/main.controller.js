'use strict';

(function() {

    class MainController {
        
        constructor($http,Upload,$geolocation,Offer,$state) {
            this.$http = $http;
            this.Upload = Upload;
            this.position;
            this.$geolocation = $geolocation;
            this.$state=$state;
            this.Offer = Offer;
            this.offers = [];
            this.options={};
            this.userMap;
            this.marker;
            //this.awesomeThings = [];
        }

        $onInit() {
            /*this.$http.get('/api/things').then(response => {
              this.awesomeThings = response.data;
              });*/
            this.$geolocation.getCurrentPosition({
                timeout: 60000
                    
            }).then(position => {
                this.options.zoom = 13;
                this.options.center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                this.options.mapTypeId= google.maps.MapTypeId.ROADMAP;
                this.userMap = new google.maps.Map(map,this.options);
                this.offers = this.Offer.query({longitude:position.coords.longitude,latitude:position.coords.latitude});
                console.log("position");

            }).then(marker => {
                console.log("marker");
                console.log(this.offers.length);
            
            });

        }

        uploadPicture(file){
            if(file){
                this.$state.go("createOffering",{obj: file});
            }
        
        
        }
        
        setMarker(offer){
				var marker = new google.maps.Marker({
					map: this.userMap,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng(offer.loc[1],offer.loc[0]),
                    visible: true
				});
				

            //marker.setMap(this.userMap);
        };
        //angular.element('#input_camera').trigger('click');

        /*  addThing() {
            if (this.newThing) {
            this.$http.post('/api/things', { name: this.newThing });
            this.newThing = '';
            }
            }*/

        /*  deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
            }*/
    }

    angular.module('geomarketApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController
        });

})();
