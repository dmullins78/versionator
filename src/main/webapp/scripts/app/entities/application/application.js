'use strict';

angular.module('versionatorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('application', {
                parent: 'entity',
                url: '/applications',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Applications'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/application/applications.html',
                        controller: 'ApplicationController'
                    }
                },
                resolve: {
                }
            })
            .state('application.detail', {
                parent: 'entity',
                url: '/application/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Application'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/application/application-detail.html',
                        controller: 'ApplicationDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Application', function($stateParams, Application) {
                        return Application.get({id : $stateParams.id});
                    }]
                }
            })
            .state('application.new', {
                parent: 'application',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/application/application-dialog.html',
                        controller: 'ApplicationDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('application', null, { reload: true });
                    }, function() {
                        $state.go('application');
                    })
                }]
            })
            .state('application.edit', {
                parent: 'application',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/application/application-dialog.html',
                        controller: 'ApplicationDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Application', function(Application) {
                                return Application.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('application', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('application.delete', {
                parent: 'application',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/application/application-delete-dialog.html',
                        controller: 'ApplicationDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Application', function(Application) {
                                return Application.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('application', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
