'use strict';

angular.module('versionatorApp')
	.controller('ApplicationDeleteController', function($scope, $uibModalInstance, entity, Application) {

        $scope.application = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Application.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
