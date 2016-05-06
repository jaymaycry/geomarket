'use strict';

describe('Component: SellOfferComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var SellOfferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SellOfferComponent = $componentController('SellOfferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
