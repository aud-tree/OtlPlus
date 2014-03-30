var chrome;

describe('Timesheet', function() {
  var serviceFactory, qResolve, chromeStorageReturns, chromeStorageSaved;
  chrome = {
    storage: {local: {
      get: function(key, callback) {callback(chromeStorageReturns);},
      set: function(key, data) {chromeStorageSaved = {key: key, data: data};}
    }}
  };

  qResolve = {resolve: function(data) {}};
  var q = {defer: function() {
    return qResolve;
  }};

  function createService() {
    return serviceFactory('Timesheet');
  }

  beforeEach(function() {
    module('OtlPlusServices');
    module(function($provide) {
      $provide.value('$q', q);
    });
  });

  beforeEach(inject(function($injector) {
    serviceFactory = $injector.get;
  }));

  beforeEach(function() { this.Timesheet = createService(); });

  describe('.inProgress', function() {
    beforeEach(function() {
      this.qSpy = spyOn(qResolve, 'resolve');
    });

    it('initializes a blank row when no timesheet is in progress', function() {
      chromeStorageReturns = {};

      this.Timesheet.inProgress();

      expect(this.qSpy).toHaveBeenCalledWith([{project: null, task: null}]);
    });

    it('initializes with cached data when a timesheet is in progress', function() {
      var cachedData = [{project: 'project', task: '1'}];
      chromeStorageReturns = {'otl-timesheet-cached': cachedData};

      this.Timesheet.inProgress();

      expect(this.qSpy).toHaveBeenCalledWith(cachedData);
    });
  });

  it('caches a timesheet', function() {
    chromeStorageSaved = null;
    var data = [{project: 'project', task: '1'}];

    this.Timesheet.cache(data);

    expect(chromeStorageSaved).toEqual({key: 'otl-timesheet-cached', data: data});
  });
});
