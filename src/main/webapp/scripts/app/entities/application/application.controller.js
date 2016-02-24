'use strict';

angular.module('versionatorApp')
    .controller('ApplicationController', function ($scope, $state, Application) {

        $scope.applications = [];
        $scope.loadAll = function() {
            Application.query(function(result) {
               $scope.applications = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.application = {
                name: null,
                id: null
            };
        };
    });
