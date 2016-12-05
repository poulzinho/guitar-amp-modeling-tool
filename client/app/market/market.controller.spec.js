'use strict';

describe('Component: MarketComponent', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var MarketComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MarketComponent = $componentController('MarketComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
