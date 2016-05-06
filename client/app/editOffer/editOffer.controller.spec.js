'use strict';

describe('Component: EditOfferComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var EditOfferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EditOfferComponent = $componentController('EditOfferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
