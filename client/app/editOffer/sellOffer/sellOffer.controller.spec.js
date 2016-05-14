'use strict';

describe('Controller: SellOfferController', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var SellOfferController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SellOfferController = $controller('SellOfferController', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
