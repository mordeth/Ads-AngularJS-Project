adsApp.controller("ControllerProfile",  ['$scope', '$location', '$rootScope', '$cookieStore', 'adsProfile', 'adsMain', 'adsRes', function($scope, $location, $rootScope, $cookieStore, adsProfile, adsMain, adsRes) {
	
	var username = $cookieStore.get('username');
	var accessToken = $cookieStore.get('access_token');

	if(!username || !accessToken) {
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

  $scope.updateProfile = function(editProfileForm) {
      if (!editProfileForm.name || !editProfileForm.email || !editProfileForm.phoneNumber) {
          return;
      }

      userProfile.ediProfile(editProfileForm).then(function(data) {
          $route.reload();
      }, function(error) {

      });
  };

  $scope.changePassword = function(credentials, changePasswordForm) {
      if (!credentials.newPassword || !credentials.confirmPassword ||
          !credentials.oldPassword) {
          return;
      }

      userProfile.changePassword(credentials).then(function(data) {
          $route.reload();
      }, function(error) {

      });
  };

}])