'use strict';

describe('Component: SndfxComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var SndfxComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SndfxComponent = $componentController('SndfxComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
