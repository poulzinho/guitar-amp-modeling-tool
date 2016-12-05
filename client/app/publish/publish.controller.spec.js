'use strict';

describe('Component: PublishComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var PublishComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PublishComponent = $componentController('PublishComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
