angular.module('OtlPlusServices')
  .factory('Types', function() {
    var PROJECTS = [
      {name: 'These are', value: '100000', taskType: 1},
      {name: 'some fake', value: '100001', taskType: 1},
      {name: 'project codes.', value: '100002', taskType: 2},
      {name: "Real ones can't", value: '100003', taskType: 2},
      {name: 'be posted on github.', value: '100004', taskType: 2},
    ];

    function projects() { return PROJECTS; }

    function matchProjectsFor(timesheet) {
      return timesheet.map(function(row) {
        row.project = PROJECTS.filter(function(proj) { return proj.value == row.project.value })[0];
        return row;
      });
    }

    return {
      projects: projects,
      matchProjectsFor: matchProjectsFor
    };
  });
