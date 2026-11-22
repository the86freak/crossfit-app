'use strict';

angular.module('crossFitApp')
    .controller('ExerciseCtrl', ['$scope', '$routeParams', '$timeout', '$location', '$cookies', 'DBService', function ($scope, $routeParams, $timeout, $location, $cookies, dbService) {


        dbService.getPlayerById($cookies.playerId, function (player) {
            $scope.player = player;
        });

        $scope.init = function () {
            dbService.getExerciseById($routeParams.exId, function (exercise) {
                if (exercise) {
                    $scope.exercise = exercise;
                    var lastRep = exercise.repetitions[exercise.repetitions.length - 1]
                    if (lastRep) {
                        $scope.currentRepetitions = parseInt(lastRep.count);
                    } else {
                        $scope.currentRepetitions = 30;
                    }
                }else{
                    $location.path('/');
                }
            });
        };
        $scope.init();

        $scope.nextExercise = function (save) {
            $scope.stop();
            if(save) {
                dbService.insertRepetition(Date.now(), $scope.exercise, $scope.currentRepetitions, $scope.player);
            }
            dbService.nextExercise();
        };

        $scope.increase = function (n) {
            $scope.currentRepetitions += n;
        };

        $scope.decrease = function (n) {
            $scope.currentRepetitions -= n;
        };

        $scope.$on("$destroy", function () {
            $scope.stop();
        });
        /*
         * ----TIMER FUNCTION----
         */
        $scope.counter = 60 * 1000;
        var timeOut;
        $scope.onTimeout = function () {
            if ($scope.counter > 0) {
                $scope.counter = $scope.counter - 100;
                timeOut = $timeout($scope.onTimeout, 100);
            } else {
                var audio = document.getElementById("alarm");
                console.log(audio);
                audio.load();
                audio.play();
            }
        }

        $scope.start = function () {
            timeOut = $timeout($scope.onTimeout, 100);
        };

        var pause = false;
        $scope.pause = function () {
            pause = !pause;
            if (pause) {
                timeOut = $timeout.cancel(timeOut);
            } else {
                $scope.start();
            }
        };

        $scope.stop = function () {
            $timeout.cancel(timeOut);
        };

        $scope.reset = function () {
            $scope.counter = 60;
        };

        $scope.start();

    }]);
