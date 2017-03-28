angular.module('springInitiativeApp')
  .controller('noteController', ["$scope", "$http", "$state", "$stateParams", "dataFactory", 
    function($scope, $http, $state, $stateParams, dataFactory) {
      $scope.activeType = $stateParams.activeType;
      $scope.studentID = $stateParams.studentID;
      $scope.editNote = {};
      $scope.notes = [];

      $scope.refreshNotes = function(schema) {
        $scope.activeType = schema;
        $scope.getNotes();
      }

      $scope.refreshSchemas = function() {
        dataFactory.getSchemas({}).then(function success(res) {
          $scope.schemas = res.data.data;
          $scope.activeType = $scope.activeType || $scope.schemas[0];
          $scope.activeSchema = $scope.schemas.filter(function(schema) {
            return schema.name == $scope.activeType.name
          })[0];
          $scope.refreshNotes($scope.activeType);
        }, function error(res) {});
      }
      $scope.refreshSchemas();

      $scope.createNote = function(item) {
        dataFactory.addNote(item, $scope.studentID, $scope.activeType.name).then(function success(res) {
          $state.go('index.dashboard.viewStudent', {studentID: $scope.studentID, activeType: $scope.activeType});
          $scope.refreshNotes($scope.activeType);
        }, function error(res) {
          console.log('error', res);
        });
      }

      $scope.getNotes = function() {
        dataFactory.getNotes($scope.studentID, $scope.activeType.name).then(function success(res) {
          $scope.notes = res.data.data;
        }, function error(res) {
          console.log('error', res);
        });
      }

    }
  ]);