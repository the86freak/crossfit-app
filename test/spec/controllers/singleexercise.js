'use strict';

describe('Controller: SingleexerciseCtrl', function () {

  // load the controller's module
  beforeEach(module('crossFitAppApp'));

  var SingleexerciseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleexerciseCtrl = $controller('SingleexerciseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
