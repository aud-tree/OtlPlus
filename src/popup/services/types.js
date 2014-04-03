angular.module('OtlPlusServices')
  .factory('Types', ['$http', '$q', function($http, $q) {
    var PROJECTS = {};
    var TASKS = {};
    var TASK_TYPES = {};

    function load() {
      var deferred = $q.defer();
      $http.get('http://audreyschwarz.github.io/OtlPlus/project_codes.json')
        .success(function(data) {
          PROJECTS = data.projects;
          TASKS = data.tasks;
          TASK_TYPES = data.taskTypes;
          deferred.resolve();
        });
      return deferred.promise;
    }

    function projectNames() { return Object.keys(PROJECTS); }

    function taskNames(projectName) {
      if(!projectName) { return []; };
      return TASK_TYPES[PROJECTS[projectName].taskType].map(function(taskId) {
        return TASKS[taskId].name
      });
    }

    function defaultTask(projectName) {
      if(!projectName) { return null; };
      return TASKS[PROJECTS[projectName].default].name;
    }

    function projectValue(name) { return PROJECTS[name].value; }

    function taskValue(projectName, taskName) {
      return TASKS[TASK_TYPES[PROJECTS[projectName].taskType].filter(function(taskId) {
        return TASKS[taskId].name === taskName;
      })[0]].value;
    }

    return {
      load: load,
      projectNames: projectNames,
      taskNames: taskNames,
      defaultTask: defaultTask,
      projectValue: projectValue,
      taskValue: taskValue
    };
  }]);
