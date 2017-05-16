angular.module('springInitiativeApp')
  .directive('back', ['$window', function ($window) {
    return {
      restrict: 'E',
      link: function (scope, elm, attrs) {
        elm.css({ 'cursor': 'pointer' });

        elm.on('click', function ($event) {
          $event.stopPropagation();
          if ($window.history.length) {
            $window.history.back();
          }
        });
      }
    };
  }])