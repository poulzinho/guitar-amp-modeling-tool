'use strict';

describe('Controller: SndfxPreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var SndfxPreviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SndfxPreviewCtrl = $controller('SndfxPreviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
