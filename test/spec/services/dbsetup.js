'use strict';

describe('Service: Dbsetup', function () {

  // load the service's module
  beforeEach(module('crossFitAppApp'));

  // instantiate service
  var Dbsetup;
  beforeEach(inject(function (_Dbsetup_) {
    Dbsetup = _Dbsetup_;
  }));

  it('should do something', function () {
    expect(!!Dbsetup).toBe(true);
  });

});
