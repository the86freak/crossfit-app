'use strict';

var app = angular.module('crossFitApp');

app.controller('MainCtrl', ['$scope', '$window', 'DBService', '$location', '$timeout', '$http', '$cookies',
        function ($scope, window, dbService, loc, $timeout, $http, $cookies) {

            //loc.path('/workout')
            //$scope.$apply();
            dbService.getPlayerById($cookies.playerId, function (player) {
                $scope.player = player;
                dbService.getAllAvailableExercises($scope.player, function (result) {
                    $scope.exercises = result;
                });
            });

            $scope.exercise = {};

            $scope.insert = function (exercise) {
                exercise.repetitions.push({date: Date.now(), count: exercise.sliderVal});
                dbService.insertRepetition(Date.now(), exercise, exercise.sliderVal, $scope.player);
            };

            $scope.deleteRepetition = function (exercise, repetition) {
                dbService.deleteRepetition(repetition.id);
                var i = exercise.repetitions.indexOf(repetition);
                if (i != -1)exercise.repetitions.splice(i, 1);
            };

            $scope.updateNewRepetitionValue = function (exercise) {
                var repetitions = exercise.repetitions;
                var l = repetitions.length;
                if (l > 0) {
                    exercise.newRep = parseInt(repetitions[l - 1].count)
                        + parseInt(exercise.sliderVal);
                } else {
                    exercise.newRep = parseInt(exercise.sliderVal);
                }
            };

            var updateRankPromise;
            $scope.sortableOptions = {
                update: function (e, ui) {
                },
                stop: function (e, ui) {
                    if (!updateRankPromise) {
                        updateRankPromise = $timeout(function () {
                            dbService.updateExerciseRank($scope.exercises);
                        }, 2000)
                    } else {
                        $timeout.cancel(updateRankPromise);
                        updateRankPromise = $timeout(function () {
                            dbService.updateExerciseRank($scope.exercises);
                        }, 2000)
                    }
                }
            };

            $scope.minValue = function (exercise) {
                var repetitions = exercise.repetitions;
                var l = repetitions.length;
                if (l > 0) {
                    var n = parseInt(repetitions[l - 1].count);
                    if (n - 30 > 0) {
                        return n - 30;
                    } else {
                        return 1;
                    }
                } else {
                    return 1;
                }
            };

            $scope.maxValue = function (exercise) {
                var repetitions = exercise.repetitions;
                var l = repetitions.length;
                if (l > 0) {
                    var n = parseInt(repetitions[l - 1].count);
                    return n + 30;
                } else {
                    return 200;
                }
            };
        }]
);