adsApp.controller("ControllerEditAd",  ['$scope', '$route', '$location', '$rootScope', 'adsRes', 'adsMain', 'adsData', 'adsUser', 'adID', '$modalInstance', function($scope, $route, $location, $rootScope, adsRes, adsMain, adsData, adsUser, adID, $modalInstance) {
	
	$scope.adID = adID;

	adsData.getSingleAd(adID).then(function(response) {
		$scope.adDetails = response;
		$scope.formEditAd = {
			title: response.title,
			text: response.text,
			imageDataUrl: response.imageDataUrl ? response.imageDataUrl : 'images/noimage.jpg',
			categoryId: response.categoryId ? response.categoryId : null,
			townId: response.townId ? response.townId : null
		};
	}, function(error) {
		adsMain.displayMessage("Error, refresh page!", "error");
	});

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

	$scope.fileSelected = function(fileInputField) {
		delete $scope.formEditAd.imageDataUrl;
		var file = fileInputField.files[0];

		if (file.type.match(/image\/.*/)) {
			var reader = new FileReader();
			reader.onload = function() {
				$scope.formEditAd.imageDataUrl = reader.result;
				$('.adImage').attr('src', reader.result);
				$('.image-title').attr('value', file.name);
				$scope.formEditAd.changeImage = true;
				$scope.formEditAd.imageDataUrl = reader.result;
			};
			reader.readAsDataURL(file);
		} else {
			$scope.formEditAd.imageDataUrl = null;
		}
	};

	$scope.deleteImage = function() {
		delete $scope.formEditAd.imageDataUrl;
		$('.adImage').attr('src', 'images/noimage.jpg');
		$('.image-title').attr('value', '');
		$scope.formEditAd.changeImage = true;
		$scope.formEditAd.imageDataUrl = null;
	};


	$scope.ok = function(adID, formEditAd) {
		if (!formEditAd.title || !formEditAd.text) {
			return;
		}

		adsData.editAd(adID, formEditAd).then(function(data) {
			$modalInstance.close();
			$route.reload();
			adsMain.displayMessage("Ad was successfully edited, please wait to be approved!", "success");
		}, function(error) {
			$modalInstance.close();
			$route.reload();
			adsMain.displayMessage("Error, refresh page!", "error");
		});
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
		$route.reload();
	};
}])


