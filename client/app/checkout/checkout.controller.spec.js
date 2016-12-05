'use strict';

describe('Component: CheckoutComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var CheckoutComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CheckoutComponent = $componentController('CheckoutComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
