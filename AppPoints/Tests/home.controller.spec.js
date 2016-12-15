'use strict';

describe('Controller: homeCtrl', function () {

	var $scope, homeCtrl, $location, dataService;

	beforeEach(function () {

		module('pointApp');

		module(function ($provide) {
			$provide.service('$location', function () {
			
			});
			$provide.service('dataService', function () {
			
			});
		});

		inject(function ($controller, _$location_, _dataService_) {
			$scope = {};
			$location = _$location_;
			dataService = _dataService_;

			homeCtrl = $controller('homeCtrl', {
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