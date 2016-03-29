'use strict';

describe('Component: OfferComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var OfferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OfferComponent = $componentController('OfferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
