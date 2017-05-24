angular.module('springInitiativeApp')
  .directive('datepicker', function() {
    return {
      restrict: 'E',
      scope: {
        updateFn: '&',
        start: '='
      },
      link: function(scope, element, attribute) {
        scope.$watch('start', function(newValue, oldValue) {
          cb(newValue);
        })

        function cb(start) {
          element.value = start;
          $(element).data('daterangepicker').setStartDate(start);
          $(element).data('daterangepicker').setEndDate(start);
        }

        $(element).daterangepicker({
          singleDatePicker: true,
          showDropdowns: true
        }, cb);
      },
      replace: true,
      template: '<input type="text" name="date"/>'
    };
  });