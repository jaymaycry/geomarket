'use strict';

describe('Component: DeleteOfferComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var DeleteOfferComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DeleteOfferComponent = $componentController('DeleteOfferComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
