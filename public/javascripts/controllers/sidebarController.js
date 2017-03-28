angular.module('springInitiativeApp')
  .controller('sidebarController', ["$scope", "$http", "$stateParams", "dataFactory", 
    function($scope, $http, $stateParams, dataFactory) {
    	$scope.studentList = [];

    	dataFactory.getStudents({}).then(function success(res) {
			$scope.studentList = res.data.data;
    	}, function error(res) {})
    }
  ]);