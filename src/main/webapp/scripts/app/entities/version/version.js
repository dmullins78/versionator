'use strict';

angular.module('versionatorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('version', {
                parent: 'entity',
                url: '/versions',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Versions'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/version/versions.html',
                        controller: 'VersionController'
                    }
                },
                resolve: {
                }
            })
            .state('version.detail', {
                parent: 'entity',
                url: '/version/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Version'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/version/version-detail.html',
                        controller: 'VersionDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Version', function($stateParams, Version) {
                        return Version.get({id : $stateParams.id});
                    }]
                }
            })
            .state('version.new', {
                parent: 'version',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/version/version-dialog.html',
                        controller: 'VersionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    number: null,
                                    environment: null,
                                    releaseDate: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('version', null, { reload: true });
                    }, function() {
                        $state.go('version');
                    })
                }]
            })
            .state('version.edit', {
                parent: 'version',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/version/version-dialog.html',
                        controller: 'VersionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Version', function(Version) {
                                return Version.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('version', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('version.delete', {
                parent: 'version',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/version/version-delete-dialog.html',
                        controller: 'VersionDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Version', function(Version) {
                                return Version.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('version', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
