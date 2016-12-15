(function () {

    angular
        .module('pointApp')
        .controller('listCreateEditCtrl', function ($scope, dataService, calcService, FileSaver, pagination, $mdDialog, points) {
            var original = {};
            $scope.point = {};
            $scope.errors = [];
            $scope.paginator = pagination;
            $scope.pageSizes = [5, 10, 20, 50];
            $scope.selectedTabIndex = 0;

            if (points.$promise != undefined) {
                points.$promise.then(function (result) {
                    $scope.points = result;
                    original = angular.copy($scope.points.xy);
                    $scope.paginator.initPagination($scope.points.xy);
                });

            } else {
                $scope.points = points;
                original = angular.copy($scope.points.xy);
                $scope.paginator.initPagination($scope.points.xy);

            }


            $scope.showPrompt = function (ev) {
                if ($scope.points.xy.length > 0) {
                    var confirm = $mdDialog.prompt()
                        .title('Save a list')
                        .textContent('List with same name will be overrided')
                        .placeholder('Please enter a name')
                        .ariaLabel('Please enter a name')
                        .initialValue($scope.points.name)
                        .targetEvent(ev)
                        .ok('Save')
                        .cancel('Cancel');
                    $scope.status = "";
                    $mdDialog.show(confirm).then(
                        function (result) {
                            createDialogAction(result);
                        }, function () {
                             
                        });

                } else
                    $scope.errors.push({ message: "Add some points: ", value: "5000 >= x, y >= -5000" });
            }
             

            var createDialogAction = function (name) {
                var entry = new dataService();
                entry.name = name;
                entry.xy = $scope.points.xy;
                entry.$save(function (res) {
                    original = angular.copy($scope.points.xy);
                    $scope.status = res.message;
                }, function (err) {
                    $scope.status = "Error";
                });
            }


            $scope.displayFileContents = function (contents) {
                $scope.selectedTabIndex = 0;
                $scope.clearError();
                $scope.points.xy = $scope.points.xy.concat(contents);
                $scope.points.xy = calcService.removeDuplicates($scope.points.xy);
                $scope.errors.push(...calcService.errorMsg);
                $scope.paginator.initPagination($scope.points.xy);
            };


            var resetForm = function () {
                $scope.point = {};
                $scope.createForm.$setUntouched();
                $scope.createForm.$setPristine();
            }

            $scope.add = function () {
                $scope.selectedTabIndex = 0;
                if ($scope.createForm.$valid) {
                    if (calcService.checkValue({ 0: $scope.point.x, 1: $scope.point.y })) {
                        var index = $scope.points.xy.findIndex(x => x.x === $scope.point.x && x.y === $scope.point.y);
                        if (index === -1) {
                            $scope.points.xy.push($scope.point);
                            resetForm();
                            $scope.paginator.initPagination($scope.points.xy);
                        }
                        else $scope.errors.push({ message: "Duplicate found: ", value: $scope.point.x + " " + $scope.point.y });

                    }
                    else if ($scope.points.xy.length === 10000) {
                        $scope.errors.push({ message: "List is full: ", value: $scope.points.xy.length });
                    } else
                        $scope.errors.push({ message: "Value is incorrect: ", value: $scope.point.x + " " + $scope.point.y });
                }
            }


            $scope.download = function () {
                var dataFile = calcService.dataForDownload($scope.points);
                var data = new Blob([dataFile], { type: 'text/plain' });
                FileSaver.saveAs(data, $scope.points.name + '.txt');
            };

            $scope.remove = function (point) {
                var index = $scope.points.xy.indexOf(point);
                if (index != -1) {
                    $scope.points.xy.splice(index, 1);
                    $scope.paginator.initPagination($scope.points.xy);
                }

            };

            $scope.clearError = function () {
                $scope.errors = [];
                calcService.errorMsg = [];
            }

            $scope.clear = function () {
                angular.copy(original, $scope.points.xy);
                if ($scope.selectedTabIndex === 0)
                    $scope.paginator.initPagination($scope.points.xy);
            }
              

            $scope.$watch("squares", function () {
                if ($scope.squares) {
                    if ($scope.squares.length > 0) {
                        $scope.paginator.initPagination($scope.squares);
                        $scope.selectedTabIndex = 1;
                    }
                }
            }
            );



            $scope.onTabChanges = function (currentTabIndex) {
                $scope.selectedTabIndex = currentTabIndex;
                if ($scope.selectedTabIndex === 0 && $scope.points) {
                    $scope.paginator.initPagination($scope.points.xy);
                } else if ($scope.squares)
                    $scope.paginator.initPagination($scope.squares);

            };


            $scope.formSquare = function () {
                 
                $scope.squares = calcService.findSquares($scope.points.xy);
                if ($scope.squares.length === 0) {
                    $scope.errors.push({ message: "Current list don't have any square", value: "" });
                }
            }
        });



})();