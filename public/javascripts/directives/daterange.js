angular.module('springInitiativeApp')
  .directive('daterange', function() {
    return {
      restrict: 'E',
      scope: {
        updateFn: '&'
      },
      link: function(scope, element, attribute) {
        start = moment().subtract(29, 'days');
        end = moment();
        scope.startDate = start._d;
        scope.endDate = end._d;

        function cb(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            scope.startDate = start._d;
            scope.endDate = end._d;
            scope.updateFn();
        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
               'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'This Month': [moment().startOf('month'), moment().endOf('month')],
               'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);
      },
      replace: true,
      templateUrl: 'views/directives/daterange.html'
    };
  });