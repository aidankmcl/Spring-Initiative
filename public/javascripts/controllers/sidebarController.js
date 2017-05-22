angular.module('springInitiativeApp')
  .controller('sidebarController', ["$scope", "$rootScope", "$http", "$state", "$stateParams", "dataFactory", "utilityService", 
    function($scope, $rootScope, $http, $state, $stateParams, dataFactory, utilityService) {
      $scope.studentIDs = [];
    	$scope.studentList = dataFactory.studentList;
      $scope.cohorts = dataFactory.cohorts;
      $scope.activeCohort = dataFactory.activeCohort;
      $scope.activeStudents = dataFactory.activeStudents;

    	dataFactory.getStudents({}).then(function success(res) {
  			$scope.studentList = res.data.data;
        dataFactory.setStudentList(res.data.data);
    	}, utilityService.logErr);

      $scope.$on('toggleStudent', function(event, students) {
        $scope.activeStudents = students,
          $scope.studentIDs = students.map(function(student) { return student._id; });      
        $scope.activeCohort = {};
      });

      $scope.$on('toggleCohort', function(event, cohort) {
        $scope.activeStudents = [],
          $scope.studentIDs = [];
        $scope.activeCohort = cohort;
      });

      $scope.$on('cohorts', function(event, cohorts) {
        $scope.cohorts = cohorts;
      });

      $scope.toggleStudent = dataFactory.toggleStudent;
      $scope.toggleCohort = dataFactory.toggleCohort;

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