'use strict';

var app = angular.module('crossFitApp');

app.controller('HeaderCtrl', ['$scope', '$window', 'DBService', '$location', '$timeout', '$http', '$cookies',
        function ($scope, window, dbService, loc, $timeout, $http, $cookies) {

            //loc.path('/workout')
            $scope.goToChoosePlayer = function(){
                dbService.reset(function(){
                    loc.path('/');
                });
            };

            $scope.goToMain = function(){
              loc.path('/main');
            };

            $scope.goToWorkout = function(){
                loc.path('/workout')
            }

        }]
);
