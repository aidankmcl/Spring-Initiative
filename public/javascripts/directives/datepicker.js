angular.module('springInitiativeApp')
  .directive('datepicker', function() {
    return {
      restrict: 'E',
      scope: {
        updateFn: '&'
      },
      link: function(scope, element, attribute) {
        $(element).daterangepicker({
          singleDatePicker: true,
          showDropdowns: true
        }, 
        function(start, end, label) {
          console.log(start, end);
        });
      },
      replace: true,
      template: '<input type="text" name="date"/>'
    };
  });