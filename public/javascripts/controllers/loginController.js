angular.module('springInitiativeApp')
  .controller('loginController', ["$scope", "$http", "$state", "dataFactory", "utilityService",
    function($scope, $http, $state, dataFactory, utilityService) {

      $scope.emailGroupClass = {'form-group': true};
      $scope.passwordGroupClass = {'form-group': true};

      $scope.login = function() {
        console.log($scope.email, $scope.password);
        $http.post('/api/login', {
          username: $scope.email,
          password: $scope.password
        }).then(function(response) {
          $state.go('index.dashboard.listNotes');
        }, function(response) {
          var msg = response.data;
          if (msg === 'Incorrect username' || msg === 'User did not verify email!') {
            $scope.emailGroupClass['has-error'] = true;
            $scope.passwordGroupClass['has-error'] = false;
            $scope.email_error = response.data;
            $scope.password_error = null;
            $scope.verification_alert = false;
          } else if (msg == 'Incorrect password') {
            $scope.passwordGroupClass['has-error'] = true;
            $scope.emailGroupClass['has-error'] = false;
            $scope.password_error = response.data;
            $scope.email_error = null;
            $scope.verification_alert = false;
          } else {
            console.log('Error: ', msg);
          }
        });
      };

      $scope.register = function() {
        var data = {
          username: $scope.email,
          password: $scope.password
        };
        $http.post('/api/register', data).then(function(response) {
          $scope.verification_alert = true;
        }, utilityService.logErr);
      };
    }
  ]);
