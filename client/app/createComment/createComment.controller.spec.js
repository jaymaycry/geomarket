'use strict';

describe('Component: CreateCommentComponent', function () {

  // load the controller's module
  beforeEach(module('geomarketApp'));

  var CreateCommentComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CreateCommentComponent = $componentController('CreateCommentComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
