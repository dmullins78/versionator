'use strict';

angular.module('versionatorApp').controller('VersionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Version', 'Application',
        function($scope, $stateParams, $uibModalInstance, entity, Version, Application) {

        $scope.version = entity;
        $scope.applications = Application.query();
        $scope.load = function(id) {
            Version.get({id : id}, function(result) {
                $scope.version = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('versionatorApp:versionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.version.id != null) {
                Version.update($scope.version, onSaveSuccess, onSaveError);
            } else {
                Version.save($scope.version, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.datePickerForReleaseDate = {};

        $scope.datePickerForReleaseDate.status = {
            opened: false
        };

        $scope.datePickerForReleaseDateOpen = function($event) {
            $scope.datePickerForReleaseDate.status.opened = true;
        };
}]);
