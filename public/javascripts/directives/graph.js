angular.module('springInitiativeApp')
    .directive('visualization', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/directives/graph.html',
            scope: {
                notes: '=',
                schema: '='
            },
            link: function (scope, elm, attrs) {
                console.dir(JSON.stringify(scope.notes));
                console.log(JSON.stringify(scope.schema.name));
                // scope.inputOptions = [];
                // scope.options = { chart: { type: 'lineChart', height: 500,
                //     // turn off and the error does not arrise
                //     useInteractiveGuideline: true,
                //     xAxis: { tickFormat: function (d) { return d3.time.format('%-m/%d/%y')(new Date(d)); } } } };

                // scope.updateGraph = function() {
                //     scope.graphData[0].key = scope.dataKey;
                //     scope.graphData[0].values = []
                //     for (var i=0; i<scope.notes.length; i++) {
                //         scope.graphData[0].values.push({ x: scope.notes[i].created, y: parseInt(scope.notes[i][scope.dataKey]) })
                //     }
                // }
                // scope.data = [{color: "blue", key: "", values: [{x: 1, y: 0},{x:2, y: 0}, {x: 3, y: 0}]}]
            }
        }
    });