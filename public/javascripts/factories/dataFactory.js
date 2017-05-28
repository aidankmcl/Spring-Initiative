angular.module('springInitiativeApp')
  .factory('dataFactory', ['$http', '$rootScope', 'utilityService', function ($http, $rootScope, utilityService) {
    var dataFactory = {};

    // Shared variables
    dataFactory.studentList = [];
    dataFactory.activeStudents = [];
    dataFactory.activeSchema = {};
    dataFactory.actionSteps = [];
    dataFactory.cohorts = [];
    dataFactory.activeCohorts = [];
    dataFactory.activeItems = [];

    /**************************
       Authentication Related
    **************************/    
    dataFactory.logout = function() {
      return $http.get('/api/logout');
    }

    /**************************
          Student Related
    **************************/
    dataFactory.toggleStudent = function(student) {
      var studentIndex = dataFactory.activeStudents.findIndex(function (activeStudent) {
        return activeStudent._id == student._id;
      });

      if (studentIndex > -1) {
        dataFactory.activeStudents.splice(studentIndex, 1);
      } else {
        dataFactory.activeStudents.push(student);
      }

      $rootScope.$broadcast('toggleStudent', dataFactory.activeStudents);
      dataFactory.activeItems = dataFactory.activeCohorts.concat(dataFactory.activeStudents);
      $rootScope.$broadcast('activeItems', dataFactory.activeItems);

      dataFactory.getActionSteps(dataFactory.activeItems).then(function success(res) {
        dataFactory.setActionSteps(res.data.data);
      }, utilityService.logErr);
    }

    dataFactory.setStudentList = function(students) {
      dataFactory.studentList = students;
      $rootScope.$broadcast('studentList', students);
    }

    dataFactory.setItem = function(item) {
      if (item.students) {
        dataFactory.activeCohorts = [item];
        dataFactory.activeStudents = [];
      } else {
        dataFactory.activeCohorts = [];
        dataFactory.activeStudents = [item];
      }

      $rootScope.$broadcast('toggleStudent', dataFactory.activeStudents);
      $rootScope.$broadcast('toggleCohort', dataFactory.activeCohorts);
      
      dataFactory.activeItems = [item];
      $rootScope.$broadcast('activeItems', dataFactory.activeItems);
    }

    dataFactory.addStudent = function(scopeStudent) {
      var student = angular.copy(scopeStudent);
      return $http.post('/api/students/add', angular.toJson(student));
    }

    dataFactory.getStudents = function(search) {
      var url = (search._id) ? '/api/students/' + search._id : '/api/students';
      return $http.get(url);
    }

    dataFactory.deleteStudent = function(id) {
      return $http.delete('/api/students/' + id);
    }

    /**************************
            Note related
    **************************/
    dataFactory.addNote = function(scopeNote, entityID, type) {
      var note = angular.copy(scopeNote);
      note["noteType"] = type;
      note["entityID"] = entityID;
      return $http.post('/api/notes/add', angular.toJson(note));
    }

    dataFactory.updateNote = function(note) {
      return $http.put('/api/notes/' + note._id, note);
    }

    dataFactory.getNote = function(id) {
      return $http.get('/api/notes/' + id);
    }

    dataFactory.getNotes = function(activeItems, activeType, startDate, endDate) {
      var today = new Date();
      startDate = startDate || moment().subtract(29, 'days')._d;
      endDate = endDate || moment()._d;

      var IDs = _.map(activeItems, '_id').join(',');

      var URL = '/api/notes?noteType=' + activeType + '&IDs=' + IDs;
      URL += '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);
      return $http.get(URL);
    }

    dataFactory.getNoteKeys = function(noteType) {
      return $http.get('/api/notes/keys?noteType=' + noteType);
    }

    /**************************
          Schema Related
    **************************/
    dataFactory.setSchema = function(schema) {
      dataFactory.activeSchema = schema;
      $rootScope.$broadcast('setSchema', schema);
    }
    dataFactory.addSchema = function(scopeSchema) {
      return $http.post('/api/schema/add', utilityService.sanitizeSchema(scopeSchema));
    }

    dataFactory.getSchemas = function(schemaType) {
      return $http.post('/api/schema/get', schemaType);
    }

    dataFactory.updateSchema = function(scopeSchema) {
      return $http.put('/api/schema/' + scopeSchema._id, utilityService.sanitizeSchema(scopeSchema));
    }

    dataFactory.deleteSchema = function(id) {
      return $http.delete('/api/schema/' + id);
    }

    /**************************
        Action Step Related
    **************************/
    dataFactory.addActionStep = function(dueDate, description, scopeActiveItems) {
      var data = {
        due: dueDate,
        description: description,
        entityIDs: _.map(scopeActiveItems, '_id')
      }
      return $http.post('/api/action-steps', data);
    }

    dataFactory.getActionSteps = function(activeItems, startDate, endDate) {
      var today = new Date();
      startDate = startDate || moment().subtract(29, 'days')._d;
      endDate = endDate || moment()._d;

      var items = (activeItems.length > 0) ? activeItems : dataFactory.studentList;

      var IDs = _.map(items, '_id').join(',');
      var URL = '/api/action-steps?IDs=' + IDs;
      URL += '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);

      return $http.get(URL);
    }

    dataFactory.getActionStep = function(stepID) {
      return $http.get('/api/action-steps/' + stepID);
    }

    dataFactory.updateActionStep = function(scopeStep) {
      var data = {
        due: new Date(scopeStep.due).getTime(),
        description: scopeStep.description,
        complete: scopeStep.complete,
        result: scopeStep.result
      }
      return $http.put('/api/action-steps/' + scopeStep._id, data);
    }

    dataFactory.setActionSteps = function(actionSteps) {
      dataFactory.actionSteps = actionSteps;
      $rootScope.$broadcast('actionSteps', actionSteps);
    }

    /**************************
          Cohort Related
    **************************/
    dataFactory.toggleCohort = function(cohort) {
      var cohortIndex = dataFactory.activeCohorts.findIndex(function (activeCohort) {
        return activeCohort._id == cohort._id;
      });

      if (cohortIndex > -1) {
        dataFactory.activeCohorts.splice(cohortIndex, 1);
      } else {
        dataFactory.activeCohorts.push(cohort);
      }
      
      $rootScope.$broadcast('toggleCohort', dataFactory.activeCohorts);
      dataFactory.activeItems = dataFactory.activeCohorts.concat(dataFactory.activeStudents);
      $rootScope.$broadcast('activeItems', dataFactory.activeItems);

      dataFactory.getActionSteps(dataFactory.activeItems).then(function success(res) {
        dataFactory.setActionSteps(res.data.data);
      }, utilityService.logErr);
    }

    dataFactory.getCohort = function(_id) {
      return $http.get('/api/cohorts/' + _id);
    }

    dataFactory.getCohorts = function() {
      return $http.get('/api/cohorts');
    }

    dataFactory.updateCohort = function(_id, studentIDs) {
      return $http.put('/api/cohorts/' + _id, {students: studentIDs});
    }

    dataFactory.setCohorts = function(cohorts) {
      dataFactory.cohorts = cohorts;
      $rootScope.$broadcast('cohorts', cohorts);
    }

    return dataFactory;
  }]);