adsApp.controller("ControllerLogin",  ['$scope', '$location', 'adsUser', 'adsMain', function($scope, $location, adsUser, adsMain) {
	
	$scope.login = function(userDetails, form) {
    adsUser.login(userDetails).then(function(response) {
        //adsUser.setUserSession(response);
        adsMain.displayMessage("You are successfully logged in!", "success");
        //$location.path('/');
    }, function(error) {
    		if (error.error_description) {
					adsMain.displayMessage(error.error_description, "error");
				} else {
        	adsMain.displayMessage("Error loading feed, please try again later!", "error");
        }
    });
	};
	
}])