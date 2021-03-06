// setting up angular module and ui-router information for ui-sref functions
var springInitiative = angular.module('springInitiativeApp',
                                      ['ui.router','ngAnimate', 'nvd3',
                                      'rzModule', 'ui.bootstrap']);

springInitiative.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  /* Auth views */
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })
  
  /* Page views */
  .state('index', {
    url: '/',
    defaultSubstate: 'index.dashboard.listNotes',
    views: {
      '@': {
        templateUrl: 'views/index.html',
        controller: 'indexController'
      },
      'navbar@index': { 
        templateUrl: 'views/nav/navbar.html',
        controller: 'navbarController'
      },
      'sidebar@index': {
        templateUrl: 'views/nav/sidebar.html',
        controller: 'sidebarController'
      }
    }
  })

  .state('index.dashboard', {
    url: 'dashboard',
    templateUrl: 'views/dashboard/index.html',
    defaultSubstate: 'index.dashboard.listNotes'
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
  .state('index.dashboard.updateNote', {
    url: '/notes/:note_id/update',
    templateUrl: 'views/dashboard/notes/update.html',
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

  // Action Step Views
  .state('index.dashboard.listActionSteps', {
    url: '/action-steps',
    templateUrl: 'views/dashboard/actions/list.html',
    controller: 'actionStepController'
  })
  .state('index.dashboard.addActionStep', {
    url: '/action-steps/add',
    templateUrl: 'views/dashboard/actions/add.html',
    controller: 'actionStepController'
  })
  .state('index.dashboard.viewActionStep', {
    url: '/action-steps/:step_id',
    templateUrl: 'views/dashboard/actions/view.html',
    controller: 'actionStepController'
  })

  /**************************************
  *********** Visualization *************
  **************************************/
  .state('index.viz', {
    url: 'visualization',
    templateUrl: 'views/visualization/index.html',
    controller: 'vizController'
  })

  /**************************************
  ************ Cohort Views *************
  **************************************/
  .state('index.cohort', {
    url: 'cohort',
    templateUrl: 'views/dashboard/index.html',
  })
  .state('index.cohort.view', {
    url: '/:_id',
    templateUrl: 'views/dashboard/cohorts/view.html',
    controller: 'cohortController',
  })
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

  // .state('index.student.editStudent', {
  //   views: {
  //     'studentView@index.student': {
  //       templateUrl: 'views/content/editStudentInfo.html'
  //     }
  //   }
  // })
  .state('settings', {
    url: '/password/:user_id',
    templateUrl: 'views/content/settings.html',
    controller: 'settingsController'
  });

  $locationProvider.html5Mode(true);

});

springInitiative.run(function($rootScope, $state, $http) {
  $rootScope.$on('$stateChangeStart', function(event, next, current) {
    $http.get('/user').then(function(data) {
      if (next.name === 'settings') {

      } else if (data.data.user == null && next.name !== 'login') {
        $state.go('login');
      } else if (data.data.user != null && next.name === 'login') {
        $state.go('index.dashboard.listNotes');
      }
    }, function(err) {
      console.log('Error: in GET \'/user\'', err);
    });
  });
});
