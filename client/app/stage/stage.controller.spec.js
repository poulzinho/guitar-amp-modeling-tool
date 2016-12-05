'use strict';

describe('Component: StageComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var StageComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    StageComponent = $componentController('StageComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
