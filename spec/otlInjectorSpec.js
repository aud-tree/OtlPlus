describe('otlInjector', function() {
  var fieldValues = function(i) {
    return ["A23"+i+"N1display", "A24"+i+"N1display", "A25"+i+"N1display", "A26"+i+"N1display", "A27"+i+"N1display",
    "B21_"+i+"_0", "B21_"+i+"_1", "B21_"+i+"_2", "B21_"+i+"_3", "B21_"+i+"_4", "B21_"+i+"_5", "B21_"+i+"_6"].map(function(id) {
      return $("#" + id).val();
    });
  };
  var data = function(timecode) { return ['' + timecode, '4.0', '456789', '1', 'CONTRACT LABOR - OTL', 0, 8, 8, 8, 8, 8, 0] };
  var expecteds = function(timecode) {
    return data(timecode).map(function(datum) { return "" + datum; });
  }

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'fixtures/'
    loadFixtures('otlInjector.html');
    this.injector = otl.injector();
  });

  it("populates an existing row", function() {
    this.injector.populateRow(1, data(123456));

    expect(fieldValues(1)).toEqual(expecteds(123456));
  });

  it("populates a table", function() {
    this.injector.populateTable([data(106048), data(123456)]);

    expect([fieldValues(1), fieldValues(2)]).toEqual([expecteds(106048), expecteds(123456)]);
  });

  it("doesn't populate the table when there aren't enough rows", function() {
    this.injector.populateTable([data(106048), data(123456), data(234567)]);

    var emptyRow = ['','','','','','','','','','','',''];
    expect([fieldValues(1), fieldValues(2)]).toEqual([emptyRow, emptyRow]);
  });
});
