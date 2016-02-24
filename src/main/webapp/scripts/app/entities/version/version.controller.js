'use strict';

angular.module('versionatorApp')
    .controller('VersionController', function ($scope, $state, Version) {

        $scope.versions = [];
        $scope.loadAll = function() {
            Version.query(function(result) {
               $scope.versions = result;
            });
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.version = {
                number: null,
                environment: null,
                releaseDate: null,
                id: null
            };
        };
    });
