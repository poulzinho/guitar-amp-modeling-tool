'use strict';

describe('Directive: sndfxPreview', function () {

  // load the directive's module and view
  beforeEach(module('sebaWebappApp'));
  beforeEach(module('app/sndfxPreview/sndfxPreview.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sndfx-preview></sndfx-preview>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the sndfxPreview directive');
  }));
});
