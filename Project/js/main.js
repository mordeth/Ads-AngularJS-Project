var adsApp = angular.module("adsApp", ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination'])
.config(function($routeProvider){
	$routeProvider.when('/',
	{
		controller: 'ControllerListAds',
		templateUrl: 'templates/listAds.html'
	}).
	when('/login', 
	{
		controller: 'ControllerLogin',
		templateUrl: 'templates/login.html'
	}).
	when('/register', 
	{
		controller: 'ControllerRegister',
		templateUrl: 'templates/register.html'
	})

	$routeProvider.otherwise({redirectTo:'/'});
})