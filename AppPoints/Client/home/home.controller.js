(function () {

    angular
        .module('pointApp')
        .controller('homeCtrl', function ($scope, dataService, $location) {

            $scope.editList = function (listId) {
                $location.path('/edit/' + listId);
            }

            $scope.createList = function () {
                $location.path('/create/');
            }

            function getItems() {
                $scope.lists = dataService.query(function () {
                    console.log($scope.lists);
                }, function (err) {

                });
            }

            $scope.deleteList = function (listId) {
                //var entry = dataService.delete({ list_id: listId }, function () {
                //    entry.$delete({ list_id: entry._id }, function (result) {
                //        getItems();
                //    });
                //});

                dataService.delete({ list_id: listId }, function () {
                    getItems();
                });





            }



            getItems();
        });



})();