'use strict';

angular.module('versionatorApp')
    .factory('Version', function ($resource, DateUtils) {
        return $resource('api/versions/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.releaseDate = DateUtils.convertDateTimeFromServer(data.releaseDate);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
