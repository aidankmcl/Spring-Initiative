angular.module('springInitiativeApp')
  .controller('studentController', ["$scope", "$http", "$stateParams", "dataFactory", "utilityService", 
    function($scope, $http, $stateParams, dataFactory, utilityService) {
    	$scope.activeStudent = $stateParams.activeStudent;
    	$scope.newStudent = {};

    	dataFactory.getSchemas({name: "student"}).then(function success(res) {
    		$scope.studentSchema = res.data.data[0];
    	}, utilityService.logErr);

    	$scope.addStudent = function() {
			dataFactory.addStudent($scope.newStudent).then(function success(res) {
				console.log(res);
			}, utilityService.logErr);    		
    	}
    }
  ]);