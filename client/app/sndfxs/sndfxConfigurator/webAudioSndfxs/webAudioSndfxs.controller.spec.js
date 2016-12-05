'use strict';

describe('Controller: WebAudioSndfxsCtrl', function () {

  // load the controller's module
  beforeEach(module('sebaWebappApp'));

  var WebAudioSndfxsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebAudioSndfxsCtrl = $controller('WebAudioSndfxsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
