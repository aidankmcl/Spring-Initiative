angular.module('springInitiativeApp')
  .controller('actionStepController', ["$scope", "$rootScope", "$http", "$state", "$stateParams", "dataFactory", "utilityService",
    function($scope, $rootScope, $http, $state, $stateParams, dataFactory, utilityService) {
			$scope.activeSchema = dataFactory.activeSchema;
			$scope.activeStudents = dataFactory.activeStudents;
			$scope.activeItems = dataFactory.activeItems;
			$scope.actionSteps = dataFactory.actionSteps;
			$scope.activeSteps = _.filter(dataFactory.actionSteps, ['complete', false]);

			$scope.$on('toggleStudent', function(event, students) {
				$scope.activeStudents = students;
			});

			$scope.$on('actionSteps', function(event, actionSteps) {
				$scope.actionSteps = actionSteps;
				$scope.activeSteps = _.filter(dataFactory.actionSteps, ['complete', false]);
				$scope.refreshColors();
			});

			$scope.$on('activeItems', function(event, items) {
				$scope.activeItems = items;
			})

			$scope.$on('studentList', function(event, students) {
				$scope.studentList = students;
			});

			$scope.refreshSteps = function() {
				dataFactory.getActionSteps($scope.activeItems || dataFactory.studentList).then(function (res) {
	        dataFactory.setActionSteps(res.data.data);
	      }, utilityService.logErr);
			}
			$scope.refreshSteps();
			
			$scope.colorScheme = {};
			$scope.showStepID = $stateParams.step_id || '';
			if ($scope.showStepID) {
        dataFactory.getActionStep($scope.showStepID).then(function(res) {
          $scope.showStep = res.data[0];
          if (dataFactory.activeCohort._id) {
          	$scope.group = dataFactory.activeCohort
          } else {
	          dataFactory.getStudents({ _id: res.data[0].entityID }).then(function success(res) {
	          	$scope.group = res.data.data
	          }, utilityService.logErr);
          }
        }, utilityService.logErr);
      }

			$scope.refreshColors = function() {
				if ($scope.activeItems.length == 0) {
					$scope.colorScheme = {};
					return;
				} else {
					for (var i=0; i<$scope.activeItems.length; i++) {
	          $scope.colorScheme[$scope.activeItems[i]._id] = "color-" + i;
	        }
				}
			}
			$scope.refreshColors();

			$scope.createActionStep = function() {
				dataFactory.addActionStep($scope.description, $scope.activeItems).then(function success(res) {
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
