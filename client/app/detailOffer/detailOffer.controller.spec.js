'use strict';

describe('Component: DetailOfferComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var DetailOfferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DetailOfferComponent = $componentController('DetailOfferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
