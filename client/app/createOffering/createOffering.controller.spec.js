'use strict';

describe('Component: CreateOfferingComponent', function () {

    // load the controller's module
    beforeEach(module('geomarketApp'));
    beforeEach(module('stateMock'));

    var CreateOfferingComponent, scope, state, file, Offer;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($componentController, $rootScope, $state, Offer) {
        scope = $rootScope.$new();
        state = $state;
        Offer = {};

        CreateOfferingComponent = $componentController('createOffering', {
            $scope: scope,
            Offer: Offer
        });
    }));

    it('should throw an Error when offering has no name', function () {

        var testOffer = {
            name: "",
            price: 15.0
        };
        var controlOfferingFunc = CreateOfferingComponent.controlOffering;
        (function(){
            controlOfferingFunc(testOffer)
        }).should.throw("no name defined");
        //expect(controlOfferingFunc(testOffer)).to.throw();
    });

    it('should throw an Error when offering price is not a number', function () {

        var testOffer = {
            name: "hola",
            price: "im not a number"
        };
        var controlOfferingFunc = CreateOfferingComponent.controlOffering;
        (function (){

            controlOfferingFunc(testOffer);
        }).should.throw("Price is not a number");
    });

});
