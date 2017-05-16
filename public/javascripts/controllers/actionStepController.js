angular.module('springInitiativeApp')
  .controller('actionStepController', ["$scope", "$http", "$state", "$stateParams", "dataFactory", "utilityService",
    function($scope, $http, $state, $stateParams, dataFactory, utilityService) {
			$scope.activeSchema = dataFactory.activeSchema;
			$scope.activeStudents = dataFactory.activeStudents;
			$scope.actionSteps = dataFactory.actionSteps;
			
			$scope.colorScheme = {};
			$scope.showStepID = $stateParams.step_id || '';
			if ($scope.showStepID) {
        dataFactory.getActionStep($scope.showStepID).then(function(res) {
          $scope.showStep = res.data[0];
        }, utilityService.logErr);
      }

			$scope.refreshColors = function() {				
				for (var i=0; i<$scope.activeStudents.length; i++) {
          $scope.colorScheme[$scope.activeStudents[i]._id] = "color-" + i;
        }
			}
			$scope.refreshColors();

			$scope.$on('toggleStudent', function(event, students) {
				$scope.activeStudents = students;
			});

			$scope.$on('actionSteps', function(event, actionSteps) {
				$scope.actionSteps = actionSteps;
				$scope.refreshColors();
			});

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
				}, utilityService.logErr)
			}
	  }
	]);