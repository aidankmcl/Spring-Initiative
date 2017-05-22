angular.module('springInitiativeApp')
  .controller('cohortController', ["$scope", "$http", "$stateParams", "dataFactory", "utilityService",
    function($scope, $http, $stateParams, dataFactory, utilityService) {
    	$scope.studentList = angular.copy(dataFactory.studentList);
  		$scope.cohorts = dataFactory.cohorts;
    	$scope.cohort = {
    		students: []
    	};

    	if ($stateParams._id) {
    		dataFactory.getCohort($stateParams._id).then(function (res) {
					$scope.cohort = res.data.data;
					console.log(res.data.data);

					for (var i=0; i<$scope.studentList.length; i++) {
		  			$scope.studentList[i].chosen = ($scope.cohort.students.indexOf($scope.studentList[i]._id) > -1) ? true : false;
		  		}
    		}, utilityService.logErr)
    	}

    	$scope.$on('cohorts', function(event, cohorts) {
	  		$scope.cohorts = cohorts;
    	});

    	$scope.$on('studentList', function(event, students) {
	  		$scope.studentList = students;

	  		for (var i=0; i<students.length; i++) {
	  			$scope.studentList[i].chosen = ($scope.cohort.students.indexOf($scope.studentList[i]._id) > -1) ? true : false;
	  		}
    	});

    	$scope.saveChanges = function() {
    		var studentIDs = _.chain($scope.studentList).filter({chosen: true}).map('_id').value();

    		dataFactory.updateCohort($scope.cohort._id, studentIDs).then(function success(res) {
    			alert('Your changes have been saved!');
    		}, utilityService.logErr);
    	}
    }
  ]);