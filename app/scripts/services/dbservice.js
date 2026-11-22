'use strict';

angular.module('crossFitApp').service('DBService', ['$rootScope', '$http', '$location', function DBService(rootScope, $http, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var allPlayers;
    var getAllPlayers;

    getAllPlayers = function (cb) {
        if (!allPlayers) {
            var url = '../server/getAllPlayers.php';
            $http.post(url)
                .success(function (data, status, headers, config) {
                    allPlayers = data;
                    typeof cb == 'function' && cb(data);
                })
                .error(function (data, status) {
                    console.log("fail", data, status);
                })
        } else {
            typeof cb == 'function' && cb(allPlayers);
        }
    };

    var getPlayerById;
    getPlayerById = function (playerId, cb) {
        getAllPlayers(function () {
            allPlayers.forEach(function (player) {
                if (player.id == playerId) {
                    typeof cb == 'function' && cb(player);
                }
            });

        });
    };

    var insertRepetition;
    var deleteRepetition;

    var updateExerciseRank;
    var getExerciseById;

    var allAvailableExercises;
    var getAllAvailableExercises;
    var nextExercise;

    var reset;
    var exports = {};

    insertRepetition = function (date, exercise, count, player) {
        var url = '../server/insertRepetition.php';
        var data = {date: date, exercise: exercise.id, count: count, playerId: player.id};
        $http.post(url, data)
            .success(function (data, status, headers, config) {
            })
            .error(function (data, status) {
                console.log("fail", data, status);
            });
    };

    deleteRepetition = function (id) {
        console.log('delete');
        var url = '../server/deleteRepetition.php';
        var data = {repetitionId: id};
        $http.post(url, data)
            .success(function (data, status, headers, config) {
                console.log(data);
            })
            .error(function (data, status) {
                console.log("fail", data, status);
            });
    };

    updateExerciseRank = function (exercises) {
        var url = '../server/updateExerciseRank.php';
        var data = [];
        exercises.forEach(function (e) {
            data.push(e.id);
        });
        $http.post(url, data)
            .success(function (data, status, headers, config) {
            })
            .error(function (data, status) {
                console.log("fail", data, status);
            });
    }

    getExerciseById = function (exerciseId, cb) {
        if (allAvailableExercises.length < 1) {
            initAllAvailableExercises(function () {
                allAvailableExercises.forEach(function (exercise) {
                    if (exercise.id == exerciseId) {
                        cb(exercise);
                    }
                })
            });
        } else {
            allAvailableExercises.forEach(function (exercise) {
                if (exercise.id == exerciseId) {
                    cb(exercise);
                }
            })
        }
    };

    getAllAvailableExercises = function (player, cb) {
        if (allAvailableExercises && allAvailableExercises.length > 0) {
            typeof cb == 'function' && cb(allAvailableExercises);
        } else {
            var url = '../server/getAllExercises.php'; // The url of our search
            // The function that will be executed on button click (ng-click="search()")
            // Create the http post request
            // the data holds the keywords
            // The request is a JSON request.
            $http({method: 'POST',
                url: url,
                data: { "playerId": player.id, "password": "HashPW"},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .success(function (data, status, headers, config) {
                    allAvailableExercises = data;
                    typeof cb == 'function' && cb(data);
                })
                .error(function (data, status) {
                    console.log("fail", data, status);
                });
        }
    };

    var currentExercise;
    nextExercise = function () {
        if (currentExercise == undefined) {
            currentExercise = allAvailableExercises[0];
        } else {
            currentExercise = allAvailableExercises[allAvailableExercises.indexOf(currentExercise) + 1];
        }
        if (currentExercise != undefined) {
            $location.path('/exercise/' + currentExercise.id);
        } else {
            $location.path('/');
        }
    };

    reset = function (cb) {
        allAvailableExercises = undefined;
        typeof cb == 'function' && cb();
    }

    exports.nextExercise = nextExercise;
    exports.getAllAvailableExercises = getAllAvailableExercises;
    exports.insertRepetition = insertRepetition;
    exports.deleteRepetition = deleteRepetition;
    exports.updateExerciseRank = updateExerciseRank;
    exports.getExerciseById = getExerciseById;
    exports.getAllPlayers = getAllPlayers;
    exports.getPlayerById = getPlayerById;
    exports.reset = reset;
    return exports;
}]);


