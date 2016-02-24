'use strict';

angular.module('versionatorApp').controller('ApplicationDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Application', 'Version',
        function($scope, $stateParams, $uibModalInstance, entity, Application, Version) {

        $scope.application = entity;
        $scope.versions = Version.query();
        $scope.load = function(id) {
            Application.get({id : id}, function(result) {
                $scope.application = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('versionatorApp:applicationUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.application.id != null) {
                Application.update($scope.application, onSaveSuccess, onSaveError);
            } else {
                Application.save($scope.application, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
