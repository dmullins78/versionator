'use strict';

angular.module('versionatorApp')
    .controller('ApplicationDetailController', function ($scope, $rootScope, $stateParams, entity, Application, Version) {
        $scope.application = entity;
        $scope.load = function (id) {
            Application.get({id: id}, function(result) {
                $scope.application = result;
            });
        };
        var unsubscribe = $rootScope.$on('versionatorApp:applicationUpdate', function(event, result) {
            $scope.application = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
