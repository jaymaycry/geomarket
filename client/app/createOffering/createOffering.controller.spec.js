'use strict';

describe('Component: CreateOfferingComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var CreateOfferingComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CreateOfferingComponent = $componentController('CreateOfferingComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
