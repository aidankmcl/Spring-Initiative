
angular.module('springInitiativeApp')
  .factory('dataFactory', ['$http', '$rootScope', 'utilityService', function ($http, $rootScope, utilityService) {
    var dataFactory = {};

    // Shared variables
    dataFactory.studentList = [];
    dataFactory.activeStudents = [];
    dataFactory.activeSchema = {};
    dataFactory.actionSteps = [];

    // Student related
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

      var students = (dataFactory.activeStudents.length > 0) ? dataFactory.activeStudents : dataFactory.studentList;
      dataFactory.getActionSteps(students).then(function (res) {
        dataFactory.actionSteps = res.data.data;
        $rootScope.$broadcast('actionSteps', dataFactory.actionSteps);
      }, utilityService.logErr);
    }

    dataFactory.setStudentList = function(students) {
      dataFactory.studentList = students;
      $rootScope.$broadcast('studentList', students);
    }

    dataFactory.setStudent = function(student) {
      dataFactory.activeStudents = [student]
      $rootScope.$broadcast('toggleStudent', dataFactory.activeStudents);
    }

    dataFactory.addStudent = function(scopeStudent) {
      var student = angular.copy(scopeStudent);
      return $http.post('/api/students/add', angular.toJson(student));
    }

    dataFactory.getStudents = function(search) {
      var url = (search.id) ? '/api/students/' + search.id : '/api/students';
      return $http.get(url);
    }

    dataFactory.deleteStudent = function(id) {
      return $http.delete('/api/students/' + id);
    }

    // Note related
    dataFactory.addNote = function(scopeNote, studentID, type) {
      var note = angular.copy(scopeNote);
      note["noteType"] = type;
      note["studentID"] = studentID;
      return $http.post('/api/notes/add', angular.toJson(note));
    }

    dataFactory.getNote = function(id) {
      return $http.get('/api/notes/' + id);
    }

    dataFactory.getNotes = function(activeStudents, activeType, startDate, endDate) {
      var today = new Date();
      startDate = startDate || moment().subtract(29, 'days')._d;
      endDate = endDate || moment()._d;

      var studentIDs = _.map(activeStudents, '_id').join(',');

      var URL = '/api/notes?noteType=' + activeType + '&studentIDs=' + studentIDs;
      URL += '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);
      return $http.get(URL);
    }

    dataFactory.getNoteKeys = function(noteType) {
      return $http.get('/api/notes/keys?noteType=' + noteType);
    }

    // Schema Related
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

    // Action Step Related
    dataFactory.addActionStep = function(description, scopeActiveStudents ) {
      var data = {
        description: description,
        studentIDs: _.map(scopeActiveStudents, '_id')
      }
      return $http.post('/api/action-steps', data);
    }

    dataFactory.getActionSteps = function(activeStudents, startDate, endDate) {
      var today = new Date();
      startDate = startDate || moment().subtract(29, 'days')._d;
      endDate = endDate || moment()._d;

      var studentIDs = _.map(activeStudents, '_id').join(',');
      var URL = '/api/action-steps?studentIDs=' + studentIDs
      URL += '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);

      return $http.get(URL);
    }

    dataFactory.getActionStep = function(stepID) {
      return $http.get('/api/action-steps/' + stepID);
    }

    dataFactory.updateActionStep = function(scopeStep) {
      var data = { 
        complete: scopeStep.complete,
        result: scopeStep.result
      }
      return $http.put('/api/action-steps/' + scopeStep._id, data);
    }

    dataFactory.setActionSteps = function(actionSteps) {
      $rootScope.$broadcast('actionSteps', actionSteps);
    }

    return dataFactory;
  }]);