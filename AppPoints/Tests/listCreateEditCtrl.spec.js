'use strict';

describe('Controller: listCreateEditCtrl', function () {

	var $scope, listCreateEditCtrl, pagination, $mdDialog, FileSaver, calcService, dataService, points;

	beforeEach(function () {

		module('pointApp');

		module(function ($provide) {
			$provide.factory('pagination', function () {
			
			});
			$provide.service('$mdDialog', function () {
			
			});
			$provide.service('FileSaver', function () {
			
			});
			$provide.service('calcService', function () {
			
			});
			$provide.service('dataService', function () {
			
			});
			$provide.value('points', {});
		});

		inject(function ($controller, _pagination_, _$mdDialog_, _FileSaver_, _calcService_, _dataService_, _points_) {
			$scope = {};
			pagination = _pagination_;
			$mdDialog = _$mdDialog_;
			FileSaver = _FileSaver_;
			calcService = _calcService_;
			dataService = _dataService_;
			points = _points_;

			listCreateEditCtrl = $controller('listCreateEditCtrl', {
				$scope: $scope
			});
		});

	});

	// Specs here
	/*
	it('should return a property value', function () {
		expect($scope.foo).toBe('bar');
	});

	it('should return a method value', function () {
		expect($scope.baz()).toBe('qux');
	});
	*/

});