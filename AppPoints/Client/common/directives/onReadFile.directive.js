(function () {
    angular
        .module('pointApp')
        .directive('onReadFile', function($parse, calcService) {
            return {
                restrict: 'A',
                scope: false,
                link: function(scope, element, attrs) {
                    element.bind('change', function(e) {
                        var onFileReadFn = $parse(attrs.onReadFile);
                        var reader = new FileReader();
                        reader.onload = function() {
                            var fileContents = reader.result;
                            fileContents = calcService.toArrayOfObject(fileContents);
                            scope.$apply(function() {
                                onFileReadFn(scope, {
                                    'contents': fileContents

                                });

                            });

                        }
                        if (element[0].files[0])
                            reader.readAsText(element[0].files[0]);
                    });

                }
            }

        });

})();