'use strict';

angular.module('crossFitApp')
    .controller('WorkoutCtrl', ['$scope', '$timeout', 'DBService','$cookies', function ($scope, $timeout, dbService, $cookies) {

        dbService.getPlayerById($cookies.playerId, function (player) {
            $scope.player = player;
            dbService.getAllAvailableExercises($scope.player, function (result) {
                $scope.exercises = result;
            });
        });

        $scope.startWorkout = function(){
            dbService.nextExercise();
        };

        var updateRankPromise;
        $scope.sortableOptions = {
            axis:'y',
            scroll:true,
            scrollSensitivity: 100,
            update: function(e, ui) {
            },
            stop: function(e, ui) {
                if(!updateRankPromise) {
                    updateRankPromise = $timeout(function () {
                        dbService.updateExerciseRank($scope.exercises);
                    }, 2000)
                }else{
                    $timeout.cancel(updateRankPromise);
                    updateRankPromise = $timeout(function () {
                        dbService.updateExerciseRank($scope.exercises);
                    }, 2000)
                }
            }
        };
    }]);
