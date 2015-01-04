var adsApp = angular.module("adsApp", ['ngRoute', 'ngResource'])
.config(function($routeProvider){
	$routeProvider.when('/',
	{
		controller: 'ControllerListAds',
		templateUrl: "/Project/templates/listAds.html"
	})

	$routeProvider.otherwise({redirectTo:'/'});
})