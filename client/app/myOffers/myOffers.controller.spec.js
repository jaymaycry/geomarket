'use strict';

describe('Component: MyOffersComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var MyOffersComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MyOffersComponent = $componentController('MyOffersComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
