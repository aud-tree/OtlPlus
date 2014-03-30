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

  describe('.projects', function() {
    it('returns project codes', function() {
      expect(this.Types.projects().length).toEqual(5);
    });
  });

  describe('.tasks', function() {
    it('returns task codes', function() {
      expect(this.Types.tasks()[1].length).toEqual(3);
    });
  });

  describe('.matchProjectsFor', function() {
    it('returns references matching each project in the provided set', function() {
      expect(this.Types.matchProjectsFor(
        [{project: {value: this.Types.projects()[0].value}}]
      )).toEqual(
        [{project: this.Types.projects()[0]}]
      );
    });
  });
});
