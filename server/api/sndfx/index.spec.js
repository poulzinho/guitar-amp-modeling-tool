'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sndfxCtrlStub = {
  index: 'sndfxCtrl.index',
  show: 'sndfxCtrl.show',
  create: 'sndfxCtrl.create',
  update: 'sndfxCtrl.update',
  destroy: 'sndfxCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sndfxIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sndfx.controller': sndfxCtrlStub
});

describe('Sndfx API Router:', function() {

  it('should return an express router instance', function() {
    expect(sndfxIndex).to.equal(routerStub);
  });

  describe('GET /api/sndfxs', function() {

    it('should route to sndfx.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sndfxCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/sndfxs/:id', function() {

    it('should route to sndfx.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sndfxCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/sndfxs', function() {

    it('should route to sndfx.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sndfxCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/sndfxs/:id', function() {

    it('should route to sndfx.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sndfxCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sndfxs/:id', function() {

    it('should route to sndfx.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sndfxCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sndfxs/:id', function() {

    it('should route to sndfx.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sndfxCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
