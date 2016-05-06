'use strict';
(function(){

class CreateCommentComponent {
    constructor($state, $http) {
        this.$state = $state;
        this.$http = $http;
        this.Offer;
        this.offerId;
        this.comment;
        this.user;
    }

    $onInit() {
        var _this = this;
        this.Offer = this.$state.params.obj.offerObj;
        this.offerId = this.$state.params.obj.id;
        this.$http.get('/api/users/me').then(response => {
            _this.user = response.data;
        });
    }

    submit() {
        
        this.comment._creator = this.user.name;
        this.comment.date = new Date();
        this.Offer.addComment({id:this.offerId},this.comment);
        this.goBack();

    }

    goBack() {
        this.$state.go("detailOffer", {
            obj: {
                id: this.offerId,
                offerObj: this.Offer
            }
        });
    }
}

angular.module('geomarketApp')
  .component('createComment', {
    templateUrl: 'app/createComment/createComment.html',
    controller: CreateCommentComponent
  });

})();
