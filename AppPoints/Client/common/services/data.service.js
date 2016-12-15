(function () {
    angular.module('pointApp')
        .service('dataService', ['$resource',
            function ($resource, $route) {
                return $resource('/api/list/:list_id', { list_id: '@list_id' }, {
                    update: { method: 'PUT', params: { list_id: '@name' } }
                });
            }]);

})();