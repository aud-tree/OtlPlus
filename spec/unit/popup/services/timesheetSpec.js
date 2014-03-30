var chrome;

describe('Timesheet', function() {
  var serviceFactory, qResolve, chromeStorageReturns, chromeStorageSaved, blankRow;
  blankRow = [{project: null, task: null}];
  chrome = {
    storage: {local: {
      get: function(key, callback) {callback(chromeStorageReturns);},
      set: function(data) {chromeStorageSaved = data;}
    }}
  };

  qResolve = {resolve: function(data) {}};
  var q = {defer: function() {
    return qResolve;
  }};

  var fakeTypes = {
    projects: function() {},
    matchProjectsFor: function(data) { return data; }
  };

  function createService() {
    return serviceFactory('Timesheet');
  }

  beforeEach(function() {
    module('OtlPlusServices');
    module(function($provide) {
      $provide.value('$q', q);
      $provide.value('Types', fakeTypes);
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

      expect(this.qSpy).toHaveBeenCalledWith(blankRow);
    });

    it('initializes with cached data when a timesheet is in progress', function() {
      var cachedData = [{project: 'project', task: '1'}];
      chromeStorageReturns = {'otl-timesheet-cached': cachedData};

      this.Timesheet.inProgress();

      expect(this.qSpy).toHaveBeenCalledWith(cachedData);
    });
  });

  describe('.cache', function() {
    it('caches a timesheet', function() {
      chromeStorageSaved = null;
      var data = [{project: 'project', task: '1'}];

      this.Timesheet.cache(data);

      expect(chromeStorageSaved).toEqual({'otl-timesheet-cached': data});
    });
  });

  describe('.blankRow', function() {
    it('returns a blank row', function() {
      expect(this.Timesheet.blankRow()).toEqual(blankRow[0]);
    });

    it('returns unique objects on successive calls', function() {
      expect(this.Timesheet.blankRow()).not.toBe(this.Timesheet.blankRow());
    });
  });
});
