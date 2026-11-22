'use strict';
var app = angular.module('crossFitApp');
app.controller('CFACtrl', ['$scope', '$window', 'DBService', '$location', '$timeout', '$http','$cookies',
        function ($scope, window, dbService, loc, $timeout, $http, $cookies) {

            dbService.getAllPlayers(function(players){
                $scope.allPlayers = players;
            });

            $scope.choosePlayer = function(player) {
                $cookies.playerId = player.id;
            }

        }]
);