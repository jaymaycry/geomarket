'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var uploadCtrlStub = {
  uploadFile: 'uploadCtrl.uploadFile',
  getFile: 'uploadCtrl.getFile'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return 'authService.hasRole.' + role;
  }
};

var multerStub = function() {
  return {
    single: function(type) {
      return 'upload.single.' + type;
    }
  }
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy()
};

// require the index with our stubbed out modules
var uploadIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './upload.controller': uploadCtrlStub,
  '../../auth/auth.service': authServiceStub,
  'multer': multerStub
});

describe('Upload API Router:', function() {

  it('should return an express router instance', function() {
    expect(uploadIndex).to.equal(routerStub);
  });

  describe('GET /uploads/:id', function() {
    
    it('should route to upload.controller.getFile', function() {
      expect(routerStub.get
        .withArgs('/:id', 'uploadCtrl.getFile')
        ).to.have.been.calledOnce;
    });
    
  });

  describe('POST /uploads', function() {
    
    it('should be authenticated and route to upload.controller.uploadFile', function() {
      expect(routerStub.post
        .withArgs('/', ['authService.isAuthenticated', 'upload.single.photo'], 'uploadCtrl.uploadFile')
        ).to.have.been.calledOnce;
    });
    
  });
});