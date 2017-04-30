//setting up angular module and ui-router information for ui-sref functions
var springInitiative = angular.module('springInitiativeApp',
                                      ['ui.router','ngAnimate', 'nvd3',
                                      'rzModule', 'ui.bootstrap']);

springInitiative.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  /* Page views */
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })
  .state('index', {
    url: '/',
    views: {
      '@': {
        templateUrl: 'views/index.html',
        controller: 'indexController'
      },
      'navbar@index': { templateUrl: 'views/nav/navbar.html' },
      'sidebar@index': {
        templateUrl: 'views/nav/sidebar.html',
        controller: 'sidebarController'
      }
    }
  })

  .state('index.dashboard', {
    url: 'dashboard',
    templateUrl: 'views/dashboard/index.html',
    controller: 'indexController'
  })

  /* Schema view */
  .state('index.dashboard.schemas', {
    url: '/schemas',
    params: { activeType: {} },
    controller: 'schemaController',
    templateUrl: 'views/dashboard/schema/add.html',
  })

  /* Note Views */
  .state('index.dashboard.addNote', {
    url: '/notes/add',
    templateUrl: 'views/dashboard/notes/add.html',
    params: { activeType: {}, activeStudents: [] },
    controller: 'noteController'
  })
  .state('index.dashboard.listNotes', {
    url: '/',
    templateUrl: 'views/dashboard/notes/list.html',
    params: { activeType: {} },
    controller: 'noteController'
  })
  .state('index.dashboard.showNote', {
    url: '/notes/:note_id',
    templateUrl: 'views/dashboard/notes/view.html',
    controller: 'noteController',
  })

  // Student Views
  .state('index.dashboard.addStudent', {
    url: '/students/add',
    templateUrl: 'views/dashboard/students/add.html',
    params: { activeType: {} },
    controller: 'studentController'
  })
  .state('index.dashboard.viewStudent', {
    url: '/students/{studentID}',
    templateUrl: 'views/dashboard/notes/list.html',
    params: { activeType: {}, activeStudents: [] },
    controller: 'noteController'
  })


  /**************************************
  *********** Visualization *************
  **************************************/
  .state('index.viz', {
    url: 'visualization',
    templateUrl: 'views/visualization/index.html',
    controller: 'vizController'
  })

  /* Content views */
  // .state('index.cohort', {
  //   views: {
  //     'content': {
  //       templateUrl: 'views/content/cohort.html',
  //       controller: 'cohortController'
  //     }
  //   }
  // })
  // .state('index.cohort.showViz', {
  //   views: {
  //     'cohortView@index.cohort': {
  //       templateUrl: 'views/content/cohortViz.html',
  //       controller: 'cohortVizController'
  //     }
  //   }
  // })
  // .state('index.cohort.showStudents', {
  //   views: {
  //     'cohortView@index.cohort': {
  //       templateUrl: 'views/content/cohortStudents.html',
  //       controller: 'cohortStudentsController'
  //     }
  //   }
  // })
  // // Note: this state won't be viewed by itself anymore
  // .state('index.student', {
  //   views: {
  //     'content': {
  //       templateUrl: 'views/content/student.html',
  //       controller: 'studentController'
  //     }
  //   }
  // })
  // .state('index.student.showData', {
  //   views: {
  //     'studentView@index.student': {
  //       controller: 'studentDataController',
  //       templateUrl: 'views/content/studentData.html'
  //     }
  //   }
  // })
  // .state('index.student.showd3', {
  //   views: {
  //     'studentView@index.student': {
  //       controller: 'd3Controller',
  //       templateUrl: 'views/content/studentViz.html'
  //     }
  //   }
  // })
  // .state('index.student.addEntry', {
  //   views: {
  //     'studentView@index.student': {
  //       controller: 'addDailyEntryController',
  //       templateUrl: 'views/content/dailyEntry.html'
  //     }
  //   }
  // })
  // .state('index.student.addLongEntry', {
  //   views: {
  //     'studentView@index.student': {
  //       controller: 'addLongEntryController',
  //       templateUrl: 'views/content/longTermEntry.html'
  //     }
  //   }
  // })

  // .state('index.student.editStudent', {
  //   views: {
  //     'studentView@index.student': {
  //       templateUrl: 'views/content/editStudentInfo.html'
  //     }
  //   }
  // })
  // .state('index.addStudent', {
  //   views: {
  //     'content': {
  //       templateUrl: 'views/content/addStudent.html',
  //       controller: 'addStudentController'
  //     }
  //   }
  // })
  // .state('index.settings', {
  //   views: {
  //     'content': {
  //       templateUrl: 'views/content/settings.html',
  //       controller: 'settingsController'
  //     }
  //   }
  // });

  $locationProvider.html5Mode(true);

});

springInitiative.run(function($rootScope, $state, $http) {
  $rootScope.$on('$stateChangeStart', function(event, next, current) {
    $http.get('/user').then(function(data) {
      if (false && data.data.user == null && next.name !== 'login') {
        console.log('No one logged in, redirecting to /login');
        $state.go('login');
      } else if (data.data.user != null && next.name === 'login') {
        console.log('Already logged in. Redirecting home.');
        $state.go('index');
      }
    }, function(err) {
      console.log('Error: in GET \'/user\'', err);
    });
  });
});
