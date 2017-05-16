angular.module('springInitiativeApp')
    .directive('visualization', ['utilityService', function(utilityService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/directives/graph.html',
            scope: {
                notes: '=',
                schema: '='
            },
            link: function (scope, elm, attrs) {
                scope.inputOptions = [];
                scope.graphData = [];
                scope.findWithAttr = utilityService.findWithAttr;
                scope.options = { chart: { type: 'lineChart', height: 500,
                    // turn off and the error does not arrise
                    useInteractiveGuideline: true,
                    xAxis: { tickFormat: function (d) { return d3.time.format('%-m/%d/%y')( new Date(d) ); } } } };

                var colors = ["blue", "red", "green", "purple", "teal"];

                scope.toggleInput = function(input) {
                    var inputIndex = utilityService.findWithAttr(scope.inputOptions, "key", input.key);
                    if (inputIndex > -1) {
                        scope.inputOptions.splice(inputIndex, 1);
                    } else {
                        scope.inputOptions.push(input);
                    }
                    scope.updateGraph();
                }

                scope.updateGraph = function() {
                    scope.graphData = [];
                    console.log(_.groupBy(scope.notes, 'studentID'));
                    for (var i=0; i<scope.inputOptions.length; i++) {
                        scope.graphData.push({});
                        scope.graphData[i].color = colors[i];
                        scope.graphData[i].key = scope.inputOptions[i].name;
                        scope.graphData[i].values = [];
                        for (var j=0; j<scope.notes.length; j++) {
                            console.log(scope.notes[j]);
                            scope.graphData[i].values.push({ x: scope.notes[j].created, y: parseInt(scope.notes[j][scope.inputOptions[i].key]) });
                        }
                    }
                }
            }
        }
    }]);