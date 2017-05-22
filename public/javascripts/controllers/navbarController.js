angular.module('springInitiativeApp')
  .controller('navbarController', ["$scope", "$http", "$stateParams", "dataFactory", "utilityService",
    function($scope, $http, $stateParams, dataFactory, utilityService) {
			$scope.cohorts = dataFactory.cohorts;

			$scope.$on('cohorts', function(event, cohorts) {
				$scope.cohorts = cohorts;
    	});

    	dataFactory.getCohorts().then(function success(res) {
    		dataFactory.setCohorts(res.data.data);
    	}, utilityService.logErr);
    }
  ]);