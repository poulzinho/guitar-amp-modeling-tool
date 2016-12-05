'use strict';

describe('Controller: SndfxFilterCtrl', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var SndfxFilterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SndfxFilterCtrl = $controller('SndfxFilterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
