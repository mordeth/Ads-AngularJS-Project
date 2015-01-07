adsApp.controller("ControllerRegister",  ['$scope', '$location', '$rootScope', 'adsUser', 'adsMain', 'adsRes', function($scope, $location, $rootScope, adsUser, adsMain, adsRes) {
	if (authorizationService.userIsLogged()) {
		$location.path('/user/ads');
	}
	adsRes.getTowns().then(function(response) {
      $scope.townsFeed = response;
  }, function(error) {
      adsMain.displayMessage("Error, refresh page!", "error");
  });

  $rootScope.$broadcast('pageChanged', { pageTitle: "Registration"});

	$scope.register = function(userDetails, form) {
		adsUser.register(userDetails).then(function(response) {
			adsMain.displayMessage("User account created successfully. Please login!", "success");
		}, function(error) {
			adsMain.displayMessage(value, "error");
		});
	};

}])