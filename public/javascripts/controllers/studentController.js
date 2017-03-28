angular.module('springInitiativeApp')
  .controller('studentController', ["$scope", "$http", "$stateParams", "dataFactory", 
    function($scope, $http, $stateParams, dataFactory) {
    	$scope.activeStudent = $stateParams.activeStudent;
    	$scope.newStudent = {};

    	dataFactory.getSchemas({name: "student"}).then(function success(res) {
    		$scope.studentSchema = res.data.data[0];
    	}, function error(res) {});

    	$scope.addStudent = function() {
			dataFactory.addStudent($scope.newStudent).then(function success(res) {
				console.log(res);
			}, function error(res) {});    		
    	}
    }
  ]);