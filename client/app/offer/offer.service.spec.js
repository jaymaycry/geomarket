'use strict';

describe('Service: offer', function () {

  // load the service's module
  beforeEach(module('geomarketApp.offer'));

  // instantiate service
  var offer;
  beforeEach(inject(function (_offer_) {
    offer = _offer_;
  }));

  it('should do something', function () {
    expect(!!offer).to.be.true;
  });

});
