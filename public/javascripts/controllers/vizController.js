angular.module('springInitiativeApp')
  .controller('vizController', ["$scope", "$http", "$stateParams", "dataFactory", "utilityService", 
    function($scope, $http, $stateParams, dataFactory, utilityService) {
        $scope.inputOptions = []
        $scope.options = { chart: { type: 'lineChart', height: 500,
            // turn off and the error does not arrise
            useInteractiveGuideline: true,
            xAxis: { tickFormat: function (d) { return d3.time.format('%-m/%d/%y')(new Date(d)); } } } };

        $scope.getSchema = function() {
            dataFactory.getSchemas({name: "Daily Entry"}).then(function success(res) {
                $scope.schema = res.data.data[0];
                for (var i=0; i<$scope.schema.questions.length; i++) {
                    if ($scope.schema.questions[i].input == "number") {
                        $scope.inputOptions.push($scope.schema.questions[i]);
                    }
                }
            }, utilityService.logErr);
        }
        $scope.getSchema()

        $scope.getNotes = function() {
            dataFactory.getNotes("589b26998561d5c7602d1a8d", "Daily Entry").then(function success(res) {
              $scope.notes = res.data.data;
              console.log($scope.notes);
            }, function error(res) {
              console.log('error', res);
            });
        }
        $scope.getNotes();

        $scope.updateGraph = function() {
            $scope.graphData[0].key = $scope.dataKey;
            $scope.graphData[0].values = []
            for (var i=0; i<$scope.notes.length; i++) {
                $scope.graphData[0].values.push({ x: $scope.notes[i].created, y: parseInt($scope.notes[i][$scope.dataKey]) })
            }
            console.log($scope.graphData);
        }
        $scope.graphData = [{color: "blue", key: "", values: [{x: 1, y: 0},{x:2, y: 0}, {x: 3, y: 0}]}]
    }
  ]);