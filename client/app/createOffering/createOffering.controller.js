'use strict';
(function(){

    class CreateOfferingComponent {
        constructor(Offer, $geolocation, Upload, $state) {
            this.Upload = Upload;
            this.Offer = Offer;
            this.position;
            this.$state = $state;
            this.$geolocation = $geolocation;
        }
        $onInit(){

            this.$geolocation.getCurrentPosition({
                timeout: 60000
            }).then(position => {
                this.offer = new this.Offer();
                this.offer.loc = [position.coords.longitude, position.coords.latitude];
                this.file = this.$state.params.obj;
            });  
        }

        submit(){
            if(this.file){
                this.upload(this.file);
            }
            else{
                console.log("nope");
            }
        }
        reset(){
            console.log("reset");
            this.$state.go("main");
        }

        upload(file){
            this.Upload.upload({
                url: '/uploads/',
                data: {photo: file}
            }).then(resp => {
                //console.log('success: '+ resp);
                this.offer.picture = resp.data;
                this.offer.$save();
                //this.$state.go("main");

            });
        }
        uploadPicture(file){
            if(file){
                this.file = file;
            }


        }

    }

    angular.module('geomarketApp')
        .component('createOffering', {
            templateUrl: 'app/createOffering/createOffering.html',
            controller: CreateOfferingComponent
        });

})();
