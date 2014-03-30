describe('TableCtrl', function() {
  var scope, $rootScope, controllerFactory;
  var fakeTimesheet = {
    inProgress: function() {
      return {then: sinon.stub().yields('test')};
    }
  };

  function createController() {
    return controllerFactory('TableCtrl', {$scope: scope, Timesheet: fakeTimesheet});
  }

  beforeEach(module('OtlPlusControllers'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controllerFactory = $controller;
  }));

  it('initializes a timesheet', function() {
    createController();

    expect(scope.timesheet).toEqual('test');
  });
});
