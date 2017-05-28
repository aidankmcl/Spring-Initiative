angular.module('springInitiativeApp')
  .controller('navbarController', ["$scope", "$http", "$state", "$stateParams", "$location", "dataFactory", "utilityService",
    function($scope, $http, $state, $stateParams, $location, dataFactory, utilityService) {
			$scope.cohorts = dataFactory.cohorts;

			$scope.$on('cohorts', function(event, cohorts) {
				$scope.cohorts = cohorts;
    	});

    	dataFactory.getCohorts().then(function success(res) {
    		dataFactory.setCohorts(res.data.data);
    	}, utilityService.logErr);

      $scope.logout = function() {
        dataFactory.logout().then(function success(res) {
          alert("Logged Out Successfully!");
          $state.go('login');
        }, utilityService.logErr)
      }
    }
  ]);