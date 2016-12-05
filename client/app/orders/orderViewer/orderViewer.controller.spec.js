'use strict';

describe('Component: OrderViewerComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var OrderViewerComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    OrderViewerComponent = $componentController('OrderViewerComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
