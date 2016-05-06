'use strict';
(function(){

class EditOfferComponent {
    constructor($state, $http) {
      this.offer;
      this.$state = $state;
    }
    $onInit() {
        this.owner = false;
        this.Offer = this.$state.params.obj.offerObj;
        var _this = this;

        this.$http.get('/api/offers/' + this.$state.params.obj.id).then(response => {
            _this.offer = response.data;
        });
    }

    submit() {
        this.controlOffering(this.offer);
        if (this.file) {
            this.upload(this.file);
        }
        else {
            console.log("nope");
        }
    }
    reset() {
        console.log("reset");
        this.$state.go("main");
    }

    upload(file) {
        this.Upload.upload({
            url: '/uploads/',
            data: { photo: file }
        }).then(resp => {
            
            this.offer.picture = resp.data;
            this.offer.$save();
            this.$state.go("main");

        });
    }
    uploadPicture(file) {
        if (file) {
            this.file = file;
        }


    }

    controlOffering(offer) {
        var message = " ";
        try {
            if (!offer.name.trim()) {
                throw ("no name defined");
            }

            if (isNaN(offer.price)) {
                throw "Price is not a number";
            }
        }
        catch (e) {
            console.error(e);
            throw new Error(e);

        }
    }
}

angular.module('geomarketApp')
  .component('editOffer', {
    templateUrl: 'app/editOffer/editOffer.html',
    controller: EditOfferComponent
  });

})();
