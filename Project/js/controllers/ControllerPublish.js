adsApp.controller("ControllerPublish",  ['$scope', '$location', '$rootScope', 'adsRes', 'adsMain', 'adsData', 'adsUser', function($scope, $location, $rootScope, adsRes, adsMain, adsData, adsUser) {
	$scope.imageData = '';
	$rootScope.$broadcast('notAdsPage');

	adsRes.getCategories().then(function(response) {
        $scope.categoriesFeed = response;
    }, function(error) {
       adsMain.displayMessage("Error, refresh page!", "error");
    });

    adsRes.getTowns().then(function(response) {
        $scope.townsFeed = response;
    }, function(error) {
        adsMain.displayMessage("Error, refresh page!", "error");
    });
	
	$rootScope.$broadcast('pageChanged', { pageTitle: "Publish Ad"});

    $scope.fileSelected = function(fileInputField) {
		delete $scope.adDetails.imageDataUrl;
        var file = fileInputField.files[0];

        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function() {
				$scope.adDetails.imageDataUrl = reader.result;
                $('.adImage').attr('src', reader.result);
                $('.image-title').attr('value', file.name);
            };
            reader.readAsDataURL(file);
        } else {
            
        }
    };

    $scope.publishAd = function(adDetails, formNewAd) {
        if (adsUser.userLogged()) {
            adsData.publishAd(adDetails).then(function(response) {
            	adsMain.displayMessage("Ad was successfully published, please wait to be approved!", "success");
                $('.adImage').attr('src', 'images/noimage.jpg');
                $('.image-title').attr('value', '');
                $('#title').val('');
                $('#text').val('');
                $('#selectTown').val('');
                $('#selectCategory').val('');
				$location.path('/user/ads');
            }, function(error) {
               adsMain.displayMessage("Error, refresh page!", "error");
            });
        }
    };
}])    