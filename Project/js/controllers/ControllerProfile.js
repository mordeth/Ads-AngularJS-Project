adsApp.controller("ControllerProfile",  ['$scope', '$location', '$rootScope', '$route', '$cookieStore', 'adsProfile', 'adsMain', 'adsRes', 'adsUser', function($scope, $location, $rootScope, $route, $cookieStore, adsProfile, adsMain, adsRes, adsUser) {
	
	var username = $cookieStore.get('username');
	var accessToken = $cookieStore.get('access_token');
	$rootScope.$broadcast('notAdsPage');
	
	if(!adsUser.userLogged()) {
		$location.path('/');
	}

	adsRes.getTowns().then(function(response) {
      $scope.townsFeed = response;
	}, function(error) {
	  adsMain.displayMessage("Error, refresh page!", "error");
	});

	adsProfile.getUserProfile().then(function(response) {
    $scope.formProfile = {
        name: response.name,
        email: response.email,
        phoneNumber: response.phoneNumber ? response.phoneNumber : '',
        townId: response.townId ? response.townId : null,
    };
	}, function(error) {
  	adsMain.displayMessage("Error, refresh page!", "error");
	});

  $rootScope.$broadcast('pageChanged', { pageTitle: "Edit Profile"});

  $scope.updateProfile = function(formProfile) {
      if (!formProfile.name || !formProfile.email || !formProfile.phoneNumber) {
          return;
      }
      adsProfile.updateProfile(formProfile).then(function(data) {
          $route.reload();
          adsMain.displayMessage("User profile successfully updated.", "success");
      }, function(error) {
      	adsMain.displayMessage("Error, refresh page!", "error");
      });
  };

  $scope.changePassword = function(userDetails, formRegister) {
      if (!userDetails.newPassword || !userDetails.confirmPassword ||
          !userDetails.oldPassword) {
          return;
      }

      adsProfile.changePassword(userDetails).then(function(data) {
          $route.reload();
          adsMain.displayMessage("Password successfully updated.", "success");
      }, function(error) {
      		adsMain.displayMessage("Error, refresh page!", "error");
      });
  };

}])