
angular.module('springInitiativeApp')
  .factory('dataFactory', ['$http', 'utilityService', function ($http, utilityService) {
    var dataFactory = {};

    // Student related
    dataFactory.addStudent = function(scopeStudent) {
      var student = angular.copy(scopeStudent);
      return $http.post('/api/students/add', angular.toJson(student));
    }

    dataFactory.getStudents = function(search) {
      var url = (search.id) ? '/api/students/' + search.id : '/api/students';
      return $http.get(url)
    }

    // Note related
    dataFactory.addNote = function(scopeNote, studentID, type) {
      var note = angular.copy(scopeNote);
      note["noteType"] = type;
      note["studentID"] = studentID;
      return $http.post('/api/notes/add', angular.toJson(note));
    }

    dataFactory.getNotes = function(studentID, noteType) {
      return $http.get('/api/notes/get?noteType=' + noteType + '&studentID=' + studentID);
    }

    // Schema Related
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