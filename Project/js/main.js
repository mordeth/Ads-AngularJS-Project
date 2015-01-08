var adsApp = angular.module("adsApp", ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination','ngCookies'])
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
	}).
	when('/user/publish', {
		controller: 'ControllerPublish',
		templateUrl: 'templates/newAd.html'
	}).
	when('/user/profile', {
		controller: 'ControllerProfile',
		templateUrl: 'templates/userProfile.html',
	})


	$routeProvider.otherwise({redirectTo:'/'});
})