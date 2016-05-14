'use strict';
(function(){

class EditOfferComponent {
    constructor(Offer, $state, $stateParams) {
      this.Offer = Offer;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.offer;
    }
    $onInit() {
        this.owner = false;
        this.offer = this.Offer.get({id: this.$stateParams.id});
    }

    submit() {
        this.controlOffering(this.offer);
        if (this.file) {
            this.upload(this.file)
            .then(resp => {
                this.offer.picture = resp.data;
                this.offer.$update();
                this.$state.go('myOffers');
            });
        }
        else {
            this.offer.$update();
            this.$state.go('myOffers');
        }
    }
    reset() {
        console.log('reset');
        this.$state.go('myOffers');
    }

    upload(file) {
        return this.Upload.upload({
            url: '/uploads/',
            data: { photo: file }
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
                throw ("No name defined");
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
