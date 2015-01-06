adsApp.controller("ControllerLogin",  ['$scope', '$location', '$rootScope', '$cookieStore', 'adsUser', 'adsMain', function($scope, $location, $rootScope, $cookieStore, adsUser, adsMain) {
	
	$scope.username = $cookieStore.get('username');

	$rootScope.$broadcast('pageChanged', { pageTitle: "Login"});

	$scope.login = function(userDetails, form) {
		adsUser.login(userDetails).then(function(response) {
			$cookieStore.put('access_token', response.access_token);
			$cookieStore.put('username', response.username);
			adsMain.displayMessage("You are successfully logged in!", "success");
			$rootScope.$broadcast('userLogged');
			$location.path('/');
		}, function(error) {
			if (error.error_description) {
				adsMain.displayMessage(error.error_description, "error");
			} else {
				adsMain.displayMessage("Error loading feed, please try again later!", "error");
			}
		});
	};
	
}])