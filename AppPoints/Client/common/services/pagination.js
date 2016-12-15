(function () {
    var paginationModule = angular.module('pointApp');

    paginationModule.factory('pagination', function () {


        var paginator = {
            currentPage: 0,
            itemsPerPage: 5,
            pagedItems: [],
            filteredItems: [],
            reverse: false,
            sortingOrder: 'x'
        }; 
         

        paginator.initPagination = function (data) {
            if (data != undefined ) {
                paginator.filteredItems = data;
                paginator.groupToPages();
            }
        };


        //// change sorting order
        paginator.sort_by = function (newSortingOrder) {
            if (paginator.sortingOrder == newSortingOrder)
                paginator.reverse = !paginator.reverse;

            paginator.sortingOrder = newSortingOrder;
        };


        paginator.prevPage = function () {
            if (paginator.currentPage > 0) {
                paginator.currentPage--;
            }
        };

        paginator.nextPage = function () {
            if (paginator.currentPage < paginator.pagedItems.length - 1) {
                paginator.currentPage++;
            }
        };
        paginator.setPage = function (n) {
            paginator.currentPage = n;
        };

        paginator.groupToPages = function () {
            paginator.pagedItems = [];

            for (var i = 0; i < paginator.filteredItems.length; i++) {
                if (i % paginator.itemsPerPage === 0) {
                    paginator.pagedItems[Math.floor(i / paginator.itemsPerPage)] = [paginator.filteredItems[i]];
                } else {
                    paginator.pagedItems[Math.floor(i / paginator.itemsPerPage)].push(paginator.filteredItems[i]);
                }
            }

        };

        // show items per page
        paginator.perPage = function () {
            paginator.groupToPages();
        };

        paginator.range = function (start, end) {
            var ret = [];
            if (!end) {
                end = start;
                start = 0;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }
            return ret;
        };


        return paginator;
    });


})();