(function () {
    angular.module('pointApp')
        .directive('linkClick', function ($location) {
            return function (scope, element, attrs) {
                var path;

                attrs.$observe('linkClick', function (val) {
                    path = val;
                });

                element.bind('click', function () {
                    scope.$apply(function () {
                        $location.path(path);
                    });
                });
            };
        });

})();
