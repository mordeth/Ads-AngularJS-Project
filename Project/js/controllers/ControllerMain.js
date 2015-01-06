adsApp.controller("MainController", ['$scope', '$location', '$rootScope', '$cookieStore', 'adsUser', 'adsMain', function($scope, $location, $rootScope, $cookieStore, adsUser, adsMain) {
		
	$scope.pageTitle = "Home";

	$rootScope.$on("pageChanged", function(event, args) {
		$scope.pageTitle = args.pageTitle;
	});

	$rootScope.$on("userLogged", function() {
		$scope.isUserLogged = true;
		$scope.currentUser = $cookieStore.get('username');
	});

	$scope.logout = function () {
		$cookieStore.remove('access_token');
		$cookieStore.remove('username');
		$rootScope.userAds = {};
		$location.path('/');
		$scope.isUserLogged = false;
		adsMain.displayMessage("You successfully logged out!", "success");
	}
   
}]);


