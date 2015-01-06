adsApp.controller("ControllerRegister",  ['$scope', '$location', 'adsUser', 'adsMain', 'adsRes', function($scope, $location, adsUser, adsMain, adsRes) {
	
	adsRes.getTowns().then(function(response) {
      $scope.townsFeed = response;
  }, function(error) {
      adsMain.displayMessage("Error, refresh page!", "error");
  });

	$scope.register = function(userDetails, form) {
		adsUser.register(userDetails).then(function(response) {
			//adsUser.setUserSession(response);
			adsMain.displayMessage("User account created successfully. Please login!", "success");
		}, function(error) {

			console.log(error.modelState);

				adsMain.displayMessage(value, "success");

		    
		});
	};

}])