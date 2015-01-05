var adsApp = angular.module("adsApp", ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination'])
.config(function($routeProvider){
	$routeProvider.when('/',
	{
		controller: 'ControllerListAds',
		templateUrl: "/Project/templates/listAds.html"
	})

	$routeProvider.otherwise({redirectTo:'/'});
})