'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var offerCtrlStub = {
  index: 'offerCtrl.index',
  show: 'offerCtrl.show',
  create: 'offerCtrl.create',
  update: 'offerCtrl.update',
  destroy: 'offerCtrl.destroy',
  commentController: 'offerCtrl.commentController'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var offerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './offer.controller': offerCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Offer API Router:', function() {

  it('should return an express router instance', function() {
    expect(offerIndex).to.equal(routerStub);
  });

  describe('GET /api/offers', function() {

    it('should route to offer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'offerCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/offers/:id', function() {

    it('should route to offer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'offerCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/offers', function() {

    it('should be authenticated and route to offer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'offerCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/offers/:id', function() {

    it('should be authenticated and route to offer.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'authService.isAuthenticated', 'offerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/offers/:id', function() {

    it('should be authenticated and route to offer.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'authService.isAuthenticated', 'offerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/offers/:id', function() {

    it('should be authenticated and route to offer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.isAuthenticated', 'offerCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });
  
  describe('PUT /api/offers/:id/comment', function() {

    it('should be authenticated and route to offer.controller.commentController', function() {
      expect(routerStub.put
        .withArgs('/:id/comment', 'authService.isAuthenticated', 'offerCtrl.commentController')
        ).to.have.been.calledOnce;
    });

  });

});
