describe('Types', function() {
  var serviceFactory;

  function createService() {
    return serviceFactory('Types');
  }

  beforeEach(function() {
    module('OtlPlusServices');
  });

  beforeEach(inject(function($injector) {
    serviceFactory = $injector.get;
  }));

  beforeEach(function() { this.Types = createService(); });

  describe('.projectNames', function() {
    it('returns project names', function() {
      expect(this.Types.projectNames().length).toEqual(5);
    });
  });

  describe('.tasks', function() {
    it('returns task objects', function() {
      expect(this.Types.tasks()[1].length).toEqual(3);
    });
  });

  describe('.taskNames', function() {
    it('returns task names for a given project name', function() {
      expect(this.Types.taskNames(this.Types.projectNames()[0]).length).toEqual(3);
    });
  });
});
