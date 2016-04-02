springInitiative.controller('loginController', function($scope, $http, $state) {
  $scope.login = function() {
    $http.post('login', {
      username: $scope.email,
      password: $scope.password
    }).then(function(response) {
      $state.go(response.data.redirect);
    }, function(response) {
      var msg = response.data;
      if (msg === 'Incorrect username' || msg ===
        'User did not verify email!') {
        $('#email-group').addClass('has-error');
        $('#password-group').removeClass('has-error');
        $scope.email_error = response.data;
        $scope.password_error = null;
        $scope.verification_alert = false;
      } else if (msg == 'Incorrect password') {
        $('#password-group').addClass('has-error');
        $('#email-group').removeClass('has-error');
        $scope.password_error = response.data;
        $scope.email_error = null;
        $scope.verification_alert = false;
      } else {
        console.log(msg);
      }
    });
  }

  $scope.register = function() {
    var data = {
      username: $scope.email,
      password: $scope.password
    };
    $http.post('register', data).then(function(response) {
      $scope.verification_alert = true;
      // window.location.href = response.data.redirect;
    }, function(response) {
      console.log('error: %s', response.data);
    });
  }
});



springInitiative.controller('indexController', function($scope, $rootScope, $http, $location){
    $scope.students = [];

    // checkUser($rootScope, $location, $http);
    $scope.user = $rootScope.loggedInUser;
    console.log($rootScope.loggedInUser);

    // TODO: make this cleaner using http.get(...)
    $http({
          method: 'GET',
          url: '/api/allStudents'
        })
        .success(function(data){
            console.log(data);
            $scope.students = data;
         })
        .error(function(err){
             console.log('Error: in GET \'/student\'', err);
        }
    );

    $scope.currentStudent;
    $scope.showStudent = function(student){
      $rootScope.currentStudent = student;
    }
});

springInitiative.controller('overviewController', function($scope, $rootScope, $http, $location){
});

springInitiative.controller('programController', function($scope, $rootScope, $http, $location){
    $scope.programName = 'something spring';
    $scope.programInfo = ':3';
});

springInitiative.controller('studentController', function($scope, $http, $rootScope) {
  // $scope.studentName = $rootScope.currentStudent.name;
  console.log('Current student:', $rootScope.currentStudent);
  // TODO: Fix controller reloading! Currently, it'll show you the new information
  // because it's showing $rootScope. We could leave it as that,
  // but I don't know if we'll run into problems in the future
  // because of that

  // TODO: test these funcs below since you'll prob need to replace them with rootScope
  // if we continue on with the current solution above

  // $scope.getStudent = function(student) {
  //   $http.get('api/student/' + student._id)
  //     .success(function(data) {
  //       $scope.currentStudent = data.currentStudent;
  //       $scope.allStudents = data.allStudents;
  //       $scope.showStudent = !$scope.showStudent;

  //     })
  //     .error(function(data) {
  //       console.log('Error: ' + data)
  //     })
  // };

  $scope.submitEditStudent = function(student) {
    $http.post('api/student/edit/' + student._id, student)
      .success(function(data) {
        $scope.selected = $scope.allStudents[0];
        $scope.allStudents = data;
      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  };

  $scope.submitNewEntry = function(student) {
    $http.post('api/student/newEntry/' + student._id, $scope.newEntry)
      .success(function(data) {
        $scope.allStudents = data.allStudents;
        $scope.currentStudent = data.currentStudent;
      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  };

  // TODO: .success and .error are deprecated
  $scope.getArchive = function() {
    $http.get('api/index/archive')
      .success(function(data) {
        $scope.allArchivedStudents = data
      })
      .error(function(data) {
        console.log('Error:' + data)
      })
  };

});

springInitiative.controller('addStudentController', function($scope, $rootScope, $http, $location){
  $scope.addStudent = function() {
    $http.post('api/student/add', $scope.newStudent)
      .success(function(data) {
        $scope.allStudents = data.allStudents;
        $scope.newStudent = data.newStudent;
      })
      .error(function(data) {
        console.log('Error: ' + data)
      })
  };
});

springInitiative.controller('settingsController', function($scope, $rootScope, $http, $location){
});
