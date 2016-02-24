'use strict';

angular.module('versionatorApp')
	.controller('VersionDeleteController', function($scope, $uibModalInstance, entity, Version) {

        $scope.version = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Version.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
