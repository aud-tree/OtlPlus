describe('TableCtrl', function() {
  var scope, $rootScope, controllerFactory;
  var fakeTimesheet = {
    inProgress: function() {
      return {then: sinon.stub().yields(['test'])};
    },
    blankRow: function() {
      return 'new row';
    },
    cache: function() {
    }
  };

  var fakeTypes = {
    projectNames: function() {},
    taskNames: function() {}
  };

  function createController() {
    return controllerFactory('TableCtrl', {$scope: scope, Timesheet: fakeTimesheet, Types: fakeTypes});
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

  describe('.removeRow', function() {
    it('removes a row', function() {
      scope.removeRow(0);

      expect(scope.timesheet.length).toEqual(0);
    });
  });

  describe('.cache', function() {
    it('caches the current timesheet', function() {
      cacheSpy = spyOn(fakeTimesheet, 'cache');

      scope.cache();

      expect(cacheSpy).toHaveBeenCalledWith(['test']);
    });
  });

  describe('.cachePo', function() {
    it('caches the po', function() {
      chromeStorageSaved = {};

      scope.po = '123456'
      scope.cachePo();

      expect(chromeStorageSaved['otl-po']).toEqual('123456');
    });
  });
});
