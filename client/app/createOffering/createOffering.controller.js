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
                timeout: 6000
            }).then(position => {
                this.offer = new this.Offer();
                this.offer.loc = [position.coords.longitude, position.coords.latitude];
                this.offer.startDate = new Date();
                this.offer.endDate = new Date();
                this.offer.endDate.setDate(this.offer.endDate.getDate() + 1);
                this.file = this.$state.params.obj;
            });  
        }

        submit(){
            this.controlOffering(this.offer);
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
                this.$state.go("main");

            });
        }
        uploadPicture(file){
            if(file){
                this.file = file;
            }


        }

        controlOffering(offer){
            var message = " ";
            try{
                if (!offer.name.trim()){
                    throw ("No name defined");
                }
                
                if(isNaN(offer.price) ){
                    throw "Price is not a number" ;
                }
            }
            catch(e){
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
