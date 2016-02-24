'use strict';

angular.module('versionatorApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


