'use strict';

describe('Component: CreateComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var CreateComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CreateComponent = $componentController('CreateComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
