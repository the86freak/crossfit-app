'use strict';

describe('Directive: workout', function () {

  // load the directive's module
  beforeEach(module('crossFitAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<workout></workout>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the workout directive');
  }));
});
