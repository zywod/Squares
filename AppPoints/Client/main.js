(function () {

    angular.module('pointApp', ['ngRoute', 'ui.bootstrap', 'ngResource', 'ngFileSaver', 'ngMaterial']);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl'
            })
            .when('/edit/:id', {
                templateUrl: '/list/create_edit.view.html',
                controller: 'listCreateEditCtrl',
                resolve: {
                    points: function (dataService, $route) {
                        return dataService.get({ list_id: $route.current.params.id });
                    }
                }     

            })
            .when('/create', {
                controller: 'listCreateEditCtrl',
                templateUrl: '/list/create_edit.view.html',
                resolve: {
                    points: function () {
                        return {name: '', xy: []};
                    }
                }

            })
            .otherwise({ redirectTo: '/' });

        //$locationProvider.html5Mode(true);
    }


    angular.module('pointApp')
        .config(['$routeProvider', '$locationProvider', config]);

})();