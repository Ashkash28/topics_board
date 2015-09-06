var myAppModule = angular.module('myAppModule', ['ngRoute', 'LocalStorageModule']);

myAppModule.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/view1.html'
	})
	.when('/dashboard', {
		templateUrl: 'partials/view2.html'
	})
	.when('/profile/:id', {
		templateUrl: 'partials/view3.html'
	})
	.when('/topic/:id', {
		templateUrl: 'partials/view4.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})