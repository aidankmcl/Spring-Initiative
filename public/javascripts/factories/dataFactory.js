
angular.module('springInitiativeApp')
  .factory('dataFactory', ['$http', '$rootScope', 'utilityService', function ($http, $rootScope, utilityService) {
    var dataFactory = {};

    // Student related
    dataFactory.activeStudents = [];
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
    }

    dataFactory.setStudent = function(student) {
      dataFactory.activeStudents = [student]
      $rootScope.$broadcast('toggleStudent', dataFactory.activeStudents);
    }

    dataFactory.addStudent = function(scopeStudent) {
      var student = angular.copy(scopeStudent);
      student["created"] = new Date().getTime();
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
      return $http.get('/api/notes/get/' + id);
    }

    dataFactory.getNotes = function(activeStudents, activeType, startDate, endDate) {
      var today = new Date();
      startDate = startDate || moment().subtract(7, 'days')._d;
      endDate = endDate || moment()._d;

      var studentIDs = activeStudents.map(function (student) {
        return student._id
      });

      var URL = '/api/notes/get';
      URL += '?noteType=' + activeType + '&studentIDs=' + studentIDs.join(',');
      URL += '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate);
      return $http.get(URL);
    }

    dataFactory.getNoteKeys = function(noteType) {
      return $http.get('/api/notes/keys?noteType=' + noteType);
    }

    // Schema Related
    dataFactory.activeSchema = {};
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

    return dataFactory;
  }]);