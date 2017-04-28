angular.module('springInitiativeApp')
  .controller('noteController', ["$scope", "$http", "$state", "$stateParams", "dataFactory", "utilityService", 
    function($scope, $http, $state, $stateParams, dataFactory, utilityService) {
      $scope.activeSchema = dataFactory.activeSchema;
      $scope.activeStudents = dataFactory.activeStudents;
      $scope.editNote = {};
      
      $scope.notes = {};
      $scope.noteFields = {};
      $scope.hiddenFields = ["noteType", "studentID", "_id", "__v", "created"]

      $scope.$on('setSchema', function(event, schema) {
        $scope.activeSchema = schema;
      })

      $scope.startNote = function(schema) {
        dataFactory.setSchema(schema);
        $state.go('index.dashboard.addNote');
      }

      $scope.$on('toggleStudent', function(event, students) {
        $scope.activeStudents = students;
        if (students.length > 0) {
          $scope.refreshNotes();
        } else {
          $scope.notes = {}
        }
      });

      $scope.setStudent = function(student) {
        dataFactory.setStudent(student);
      }

      $scope.refreshNotes = function() {
        $scope.schemas.forEach(function(schema) {
          $scope.getNotes($scope.activeStudents, schema.name, $scope.startDate, $scope.endDate);
        });
      }

      $scope.setSchema = function(schema) {
        $scope.activeSchema = schema;
      }

      $scope.refreshSchemas = function() {
        dataFactory.getSchemas({}).then(function success(res) {
          $scope.schemas = res.data.data;
          $scope.activeSchema = (JSON.stringify($scope.activeSchema) !== JSON.stringify({})) ?
            $scope.activeSchema : $scope.schemas.filter(function (v) { return !v.private })[0];
          $scope.activeSchema = $scope.schemas.filter(function(schema) {
            return schema.name == $scope.activeSchema.name
          })[0];
          $scope.refreshNotes();
        }, utilityService.logErr);
      }
      $scope.refreshSchemas();

      $scope.selectOption = function(question, answer) {
        $scope.editNote[question.key] = answer;
      }

      $scope.createNote = function(item, studentID, activeSchema) {
        dataFactory.addNote(item, studentID, activeSchema.name).then(function success(res) {
          $state.go('index.dashboard.viewStudent', {studentID: $scope.studentID, activeSchema: $scope.activeSchema});
          $scope.refreshNotes($scope.activeSchema);
        }, utilityService.logErr);
      }

      $scope.getNotes = function(activeStudents, noteType, startDate, endDate) {
        if (!activeStudents || activeStudents.length < 1) return;

        dataFactory.getNotes(activeStudents, noteType, startDate, endDate).then(function success(res) {
          $scope.notes[noteType] = res.data.data;
          $scope.noteFields[noteType] = res.data.noteFields;
        }, utilityService.logErr);
      }
    }
  ]);