'use strict';

describe('Component: SndfxsComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var SndfxsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    SndfxsComponent = $componentController('SndfxsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
