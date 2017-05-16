angular.module('springInitiativeApp')
  .controller('sidebarController', ["$scope", "$rootScope", "$http", "$state", "$stateParams", "dataFactory", "utilityService", 
    function($scope, $rootScope, $http, $state, $stateParams, dataFactory, utilityService) {
      $scope.studentIDs = [];
    	$scope.studentList = dataFactory.studentList;
      $scope.activeStudents = dataFactory.activeStudents;

    	dataFactory.getStudents({}).then(function success(res) {
  			$scope.studentList = res.data.data;
        dataFactory.studentList = res.data.data;
    	}, utilityService.logErr);

      $scope.$on('toggleStudent', function(event, students) {
        $scope.activeStudents = students;
        $scope.studentIDs = students.map(function(student) { return student._id; });      
      })

      $scope.toggleStudent = function(student) {
        dataFactory.toggleStudent(student);
      }

    	$scope.deleteStudent = function(id, $studentIndex) {
    		dataFactory.deleteStudent(id).then(function success(res) {
    			$scope.studentList.splice($studentIndex, 1);
    		}, utilityService.logErr);
      }

      $scope.deleteStudent = function(id, $studentIndex) {
		    var r = window.confirm("Are you sure you would like to delete this student? This is not the same as archiving, and cannot be undone.");
		    if (r == true) {
  				dataFactory.deleteStudent(id).then(function success(res) {
	    			$scope.studentList.splice($studentIndex, 1);
	    		}, utilityService.logErr);
		    }
  		};
    }
  ]);