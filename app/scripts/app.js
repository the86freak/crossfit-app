'use strict';

angular.module('crossFitApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angular-gestures',
    'ui.sortable'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/choosePlayer.html',
                controller: 'CFACtrl'
            })
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/workout', {
              templateUrl: 'views/workout.html',
              controller: 'WorkoutCtrl'
            })
            .when('/exercise/:exId', {
              templateUrl: 'views/exercise.html',
              controller: 'ExerciseCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });
