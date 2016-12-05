'use strict';

describe('Component: CartComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var CartComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CartComponent = $componentController('CartComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
