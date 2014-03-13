describe('otlInjector', function() {
  var fieldValues = function(i) {
    return ["A23"+i+"N1display", "A24"+i+"N1display", "A25"+i+"N1display", "A26"+i+"N1display", "A27"+i+"N1display",
    "B21_"+i+"_0", "B21_"+i+"_1", "B21_"+i+"_2", "B21_"+i+"_3", "B21_"+i+"_4", "B21_"+i+"_5", "B21_"+i+"_6"].map(function(id) {
      return $("#" + id).val();
    });
  };

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'fixtures/'
    loadFixtures('otlInjector.html');
    this.injector = otl.injector();
  });

  it("populates an existing row", function() {
    var data = ['106302', '4.0', '456789', '1', 'CONTRACT LABOR - OTL', 0, 8, 8, 8, 8, 8, 0]

    this.injector.populateRow(1, data);

    var expecteds = data.map(function(datum) { return "" + datum; });
    expect(fieldValues(1)).toEqual(expecteds);
  });

  it("creates a new row when the specified row doesn't exist", function() {
    pending();
  });
});
