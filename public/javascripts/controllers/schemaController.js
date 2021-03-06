angular.module('springInitiativeApp')
  .controller('schemaController', ["$scope", "$http", "$state", "dataFactory", "utilityService", 
    function($scope, $http, $state, dataFactory, utilityService) {
      $scope.schemas = []
      $scope.cleanSlate = function() {
        $scope.newSchema = true;
        $scope.editSchema = {
          name: "",
          questions: []
        }
      }
      $scope.cleanSlate();

      $scope.setSchema = function(schema) {
        $scope.editSchema = schema;
        $scope.newSchema = false;
      }

      $scope.refreshSchemas = function() {
        dataFactory.getSchemas({}).then(function success(res) {
          $scope.cleanSlate();
          $scope.schemas = res.data.data;
        }, utilityService.logErr);
      }
      $scope.refreshSchemas();

      $scope.saveSchema = function() {
        dataFactory.addSchema($scope.editSchema).then(function success(res) {
          alert("New Schema created successfully!");
          $state.go('index.dashboard.schemas');
          $scope.refreshSchemas();
        }, utilityService.logErr);
      }

      $scope.updateSchema = function() {
        dataFactory.updateSchema($scope.editSchema).then(function success(res) {
          alert("Schema updated successfully!");
          $state.go('index.dashboard.schemas');
          $scope.refreshSchemas();
        }, utilityService.logErr)
      }

      $scope.deleteSchema = function(id) {
        dataFactory.deleteSchema(id).then(function success(res) {
          alert("Schema deleted successfully!");
          $scope.refreshSchemas();
          utilityService.removeFromArray($scope.schemas, "_id", id);
        }, utilityService.logErr);
      }
    }
  ]);

angular.module('springInitiativeApp')
  .controller('editSchemaController', ["$scope", "$http", "$state", "dataFactory", 
    function($scope, $http, $state, dataFactory) {

    }
  ]);
