(function () {
	'use strict';
	angular
		.module('app', [
			'ui.bootstrap',
			'uiGmapgoogle-maps',
			'ngRoute'
			])
		.config(function (uiGmapGoogleMapApiProvider, $routeProvider){
    		uiGmapGoogleMapApiProvider.configure({
    			key: '<api_key>',
    			v: '3.17'
    		});
    		
    		$routeProvider
		            .when('/', {
		                templateUrl : 'templates/map.html'
		            });
    	});
})();