var otl = otl || {};

otl.injector = function() {
  var $tableBody = $("table tbody");

  function _row(rowIndex) {
    var needsNewRow = ($("#A23" + rowIndex + "N1display").length == 0);
    if(needsNewRow) { $tableBody.append("<tr></tr>"); }

    // consistency is for losers
    return [3, 4, 5, 6, 7].map(function(colIndex) {
      if(needsNewRow) {
        _appendCell("A2" + colIndex + rowIndex + "N1display");
      }
      return $("#A2" + colIndex + rowIndex + "N1display");
    }).concat([0, 1, 2, 3, 4, 5, 6].map(function(colIndex) {
      if(needsNewRow) {
        _appendCell("B21_" + rowIndex + "_" + colIndex);
      }
      return $("#B21_" + rowIndex + "_" + colIndex);
    }));
  }

  function _appendCell(id) {
    $tableBody.children().filter(":last").append(
      $("<td><input id='" + id + "' type='text' size='12' name='" + id + "'></input></td>")
    );
  }

  function populateRow(rowIndex, data) {
    var $row = _row(rowIndex);
    for(var colIndex=0; colIndex<data.length; colIndex+=1) {
      $row[colIndex].val(data[colIndex]);
    }
  }

  return {
    populateRow: populateRow
  };
};
