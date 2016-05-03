'use strict';
(function(){

class DetailOfferComponent {
  constructor(Offer, Comment, $state) {
      this.Offer = Offer;
      this.Comment = Comment;
      this.$state = $state;
  }
    $onInit() {
        this.offer = this.$state.params.obj;
    }
    reset() {
        console.log("reset");
        this.$state.go("main");
    }
    createComment() {
        this.Comment
    }
}

angular.module('geomarketApp')
  .component('detailOffer', {
    templateUrl: 'app/detailOffer/detailOffer.html',
    controller: DetailOfferComponent
  });

})();
