adsApp.controller("MainController", ['$scope', '$location', '$rootScope', '$cookieStore', 'adsUser', 'adsMain', function($scope, $location, $rootScope, $cookieStore, adsUser, adsMain) {
		
	$scope.pageTitle = "Home";
	
	$scope.isUserAds = false;
	$scope.isAdminLogged = false;
	
	if (adsUser.userLogged()) {
		$scope.isUserLogged = true;
		$scope.currentUser = $cookieStore.get('username');
		if($cookieStore.get('isAdminUser')) {
			$scope.isAdminLogged = true;
		} else {
			$scope.isAdminLogged = false;
		}
	} else {
		$scope.isUserLogged = false;
		$scope.isAdminLogged = false;
		$scope.currentUser = '';
	}

	$rootScope.$on("pageChanged", function(event, args) {
		$scope.pageTitle = args.pageTitle;
	});

	$rootScope.$on("userLogged", function() {
		$scope.isUserLogged = true;
		$scope.currentUser = $cookieStore.get('username');
		if($cookieStore.get('isAdminUser')) {
			$scope.isAdminLogged = true;
		} else {
			$scope.isAdminLogged = false;
		}
	});
	
	$rootScope.$on("userAdsPage", function() {
		$scope.isUserAds = true;
	});
	
	$rootScope.$on("notAdsPage", function() {
		$scope.isUserAds = false;
	});

	$scope.logout = function () {
		$cookieStore.remove('access_token');
		$cookieStore.remove('username');
		$cookieStore.remove('isAdminUser');
		$rootScope.userAds = {};
		$location.path('/');
		$scope.isUserLogged = false;
		$scope.isAdminLogged = false;
		adsMain.displayMessage("You successfully logged out!", "success");
	}
}]);


