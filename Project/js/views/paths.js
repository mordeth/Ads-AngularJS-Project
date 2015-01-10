adsApp.config(function($routeProvider){
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
	when('/user/ads', {
		controller: 'ControllerUserAds',
		templateUrl: 'templates/userAds.html'
	}).
	when('/user/ads/published', {
		controller: 'ControllerUserAds',
		templateUrl: 'templates/userAds.html'	
	}).
	when('/user/ads/waitingapproval', {
		controller: 'ControllerUserAds',
		templateUrl: 'templates/userAds.html'	
	}).
	when('/user/ads/inactive', {
		controller: 'ControllerUserAds',
		templateUrl: 'templates/userAds.html'
	}).
	when('/user/ads/rejected', {
		controller: 'ControllerUserAds',
		templateUrl: 'templates/userAds.html'
	}).
	when('/user/profile', {
		controller: 'ControllerProfile',
		templateUrl: 'templates/userProfile.html',
	}).
	when('/admin/ads', {
		controller: 'ControllerAdmin',
		templateUrl: 'templates/adminAds.html',
	})


	$routeProvider.otherwise({redirectTo:'/'});
})