angular.module('OtlPlusServices')
  .factory('Types', ['$http', '$q', function($http, $q) {
    var PROJECTS = {};
    var TASKS = {};
    var DEFAULT_TASKS = {};

    function load() {
      var deferred = $q.defer();
      $http.get('http://github.ove.local/pages/aschwarz1/OtlCodes/project_codes.json')
        .success(function(data) {
          PROJECTS = data.projects;
          TASKS = data.tasks;
          DEFAULT_TASKS = data.defaultTasks;
          deferred.resolve();
        });
      return deferred.promise;
    }

    function projectNames() { return Object.keys(PROJECTS); }

    function tasks() { return TASKS; }

    function taskNames(projectName) {
      if(!projectName) { return []; };
      return Object.keys(TASKS[PROJECTS[projectName].taskType]);
    }

    function defaultTask(projectName) {
      if(!projectName) { return null; };
      return DEFAULT_TASKS[PROJECTS[projectName].taskType];
    }

    function projectValue(name) { return PROJECTS[name].value; }

    function taskValue(projectName, taskName) {
      return TASKS[PROJECTS[projectName].taskType][taskName];
    }

    return {
      load: load,
      projectNames: projectNames,
      tasks: tasks,
      taskNames: taskNames,
      defaultTask: defaultTask,
      projectValue: projectValue,
      taskValue: taskValue
    };
  }]);
