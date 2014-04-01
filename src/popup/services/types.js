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
      1: {
        'Fake': '1.0',
        'Codes': '2.0',
        'Yaaaay': '3.0'
      },
      2: {
        'More Fake': '1.0',
        'Codes2': '2.0',
        'Yaaaay2': '3.0'
      }
    };

    function projectNames() { return Object.keys(PROJECTS); }

    function tasks() { return TASKS; }

    function taskNames(projectName) {
      return Object.keys(TASKS[PROJECTS[projectName].taskType]);
    }

    function projectValue(name) { return PROJECTS[name].value; }

    function taskValue(projectName, taskName) {
      return TASKS[PROJECTS[projectName].taskType][taskName];
    }

    return {
      projectNames: projectNames,
      tasks: tasks,
      taskNames: taskNames,
      projectValue: projectValue,
      taskValue: taskValue
    };
  });
