angular.module('springInitiativeApp')
  .controller('actionStepController', ["$scope", "$rootScope", "$http", "$state", "$stateParams", "dataFactory", "utilityService",
    function($scope, $rootScope, $http, $state, $stateParams, dataFactory, utilityService) {
			$scope.activeSchema = dataFactory.activeSchema;
			$scope.activeStudents = dataFactory.activeStudents;
			$scope.actionSteps = dataFactory.actionSteps;
			$scope.activeSteps = _.filter(dataFactory.actionSteps, ['complete', false]);

			$scope.$on('toggleStudent', function(event, students) {
				$scope.activeStudents = students;
			});

			$scope.$on('actionSteps', function(event, actionSteps) {
				$scope.actionSteps = actionSteps;
				console.log($scope.actionSteps);
				$scope.activeSteps = _.filter(dataFactory.actionSteps, ['complete', false]);
				$scope.refreshColors();
			});

			$scope.$on('studentList', function(event, students) {
				$scope.studentList = students;
			});

			$scope.refreshSteps = function() {
				dataFactory.getActionSteps(dataFactory.activeStudents || dataFactory.studentList).then(function (res) {
	        dataFactory.actionSteps = res.data.data;
	        $rootScope.$broadcast('actionSteps', dataFactory.actionSteps);
	      }, utilityService.logErr);
			}
			$scope.refreshSteps();
			
			$scope.colorScheme = {};
			$scope.showStepID = $stateParams.step_id || '';
			if ($scope.showStepID) {
        dataFactory.getActionStep($scope.showStepID).then(function(res) {
          $scope.showStep = res.data[0];
          dataFactory.getStudents({ id: res.data[0].studentID }).then(function success(res) {
          	$scope.currentStudent = res.data.data
          }, utilityService.logErr);
        }, utilityService.logErr);
      }

			$scope.refreshColors = function() {
				if ($scope.activeStudents.length == 0) {
					$scope.colorScheme = {};
					return;
				} else {
					for (var i=0; i<$scope.activeStudents.length; i++) {
	          $scope.colorScheme[$scope.activeStudents[i]._id] = "color-" + i;
	        }
				}
			}
			$scope.refreshColors();

			$scope.createActionStep = function() {
				dataFactory.addActionStep($scope.description, $scope.activeStudents).then(function success(res) {
					$state.go('index.dashboard.listActionSteps');
					Array.prototype.push.apply($scope.actionSteps, res.data.data);
					dataFactory.setActionSteps($scope.actionSteps);
	      }, utilityService.logErr);
			}

			$scope.updateActionStep = function() {
				dataFactory.updateActionStep($scope.showStep).then(function success(res) {
					alert("Record Updated Successfully!");
					$state.go('index.dashboard.listActionSteps');
					$scope.refreshSteps();
				}, utilityService.logErr)
			}
	  }
	]);