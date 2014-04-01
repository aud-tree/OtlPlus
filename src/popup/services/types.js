angular.module('OtlPlusServices')
  .factory('Types', function() {
    var PROJECTS = {
      'These are': { value: '100000', taskType: 1},
      'some fake': { value: '100001', taskType: 1},
      'project codes.': { value: '100002', taskType: 2},
      "Real ones can't": { value: '100003', taskType: 2},
      'be posted on github.': { value: '100004', taskType: 2},
    };

    var TASKS = {
      1: [
        {name: 'Fake', value: '1.0'},
        {name: 'Codes', value: '2.0'},
        {name: 'Yaaaay', value: '3.0'}
      ],
      2: [
        {name: 'More Fake', value: '1.0'},
        {name: 'Codes2', value: '2.0'},
        {name: 'Yaaaay2', value: '3.0'}
      ]
    };

    function projectNames() { return Object.keys(PROJECTS); }

    function tasks() { return TASKS; }

    function taskNames(projectName) {
      return TASKS[PROJECTS[projectName].taskType].map(function(t) { return t.name; });
    }

    function projectValue(name) { return PROJECTS[name].value; }

    return {
      projectNames: projectNames,
      tasks: tasks,
      taskNames: taskNames
    };
  });
