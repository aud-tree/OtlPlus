describe('TableCtrl', function() {
  var scope, $rootScope, controllerFactory;
  var fakeTimesheet = {
    inProgress: function() {
      return {then: sinon.stub().yields(['test'])};
    },
    blankRow: function() {
      return 'new row';
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

  beforeEach(createController);

  it('initializes a timesheet', function() {
    expect(scope.timesheet).toEqual(['test']);
  });

  describe('.addRow', function() {
    it('adds a row', function() {
      scope.addRow();

      expect(scope.timesheet.length).toEqual(2);
    });
  });
});
