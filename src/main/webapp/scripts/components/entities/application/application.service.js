'use strict';

angular.module('versionatorApp')
    .factory('Application', function ($resource, DateUtils) {
        return $resource('api/applications/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
