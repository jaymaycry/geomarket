'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('geomarketApp'));
  beforeEach(module('stateMock'));

  var scope;
  var mainComponent;
  var state;
  var $httpBackend;
  var offerMock = {
  
    query: function(obj){
        var array = ['i', '2'];
        return array;
    }
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $http,
    $componentController,
    $rootScope,
    $state,
    $q) {
      //$httpBackend = _$httpBackend_;
      //$httpBackend.expectGET('/api/offer').respond(['offer','offer2'])
     /* $httpBackend.expectGET('/api/things')
        .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
*/
      scope = $rootScope.$new();
      state = $state;
      mainComponent = $componentController('main', {
        $http: $http,
        $scope: scope,
        Offer: offerMock

      });
  }));


  it('should attach a list of things to the controller', function() {
    mainComponent.$onInit();
    mainComponent.offers = offerMock;
    console.log(mainComponent.offers);
    //$httpBackend.flush();
    expect(mainComponent.offers.length).to.equal(2);
  });
});
