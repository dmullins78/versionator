'use strict';

angular.module('versionatorApp')
    .controller('VersionDetailController', function ($scope, $rootScope, $stateParams, entity, Version, Application) {
        $scope.version = entity;
        $scope.load = function (id) {
            Version.get({id: id}, function(result) {
                $scope.version = result;
            });
        };
        var unsubscribe = $rootScope.$on('versionatorApp:versionUpdate', function(event, result) {
            $scope.version = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
