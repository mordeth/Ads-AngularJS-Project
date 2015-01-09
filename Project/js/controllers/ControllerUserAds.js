adsApp.controller("ControllerUserAds",  ['$scope', '$route', '$location', '$rootScope', 'adsRes', 'adsMain', 'adsData', 'adsUser', '$modal', function($scope, $route, $location, $rootScope, adsRes, adsMain, adsData, adsUser, $modal) {
	var ajaxError = "Error loading feed, please try again later!";
    $scope.noAds = false;
	
	var currentPage = 1;
    $scope.totalAds = 0;
    $scope.adsPerPage = 3;
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };
	
	
	$rootScope.$broadcast('userAdsPage');

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    $rootScope.$broadcast('pageChanged', { pageTitle: "User Ads"});
	
    function getResultsPage(pageNumber) {
		
		var status = $location.path().substr(10, $location.path().length);
		
		adsData.getUserAds(pageNumber, status).then(function(response) {
			$scope.userAdsData = response;
			$scope.totalAds = parseInt(response.numPages) * 3;
			currentPage = pageNumber;
		}, function(error) {
          adsMain.displayMessage(ajaxError, "warning");
        });
    }
	
	$scope.deleteAd = function(adID) {
        if (adsUser.userLogged()) {
            adsData.deleteAd(adID).then(function(response) {
				adsMain.displayMessage("Ad delete successfully!", "success");
				$route.reload();
            }, function(error) {
               adsMain.displayMessage("Error, refresh page!", "error");
            });
        }
    };
	
	$scope.deactivateAd = function(adID) {
        if (adsUser.userLogged()) {
            adsData.deactivateAd(adID).then(function(response) {
				adsMain.displayMessage("Ad deactivated successfully!", "success");
				$route.reload();
            }, function(error) {
               adsMain.displayMessage("Error, refresh page!", "error");
            });
        }
    };
	
	$scope.republishAd = function(adID) {
        if (adsUser.userLogged()) {
            adsData.republishAd(adID).then(function(response) {
				adsMain.displayMessage("Ad published again!", "success");
				$route.reload();
            }, function(error) {
               adsMain.displayMessage("Error, refresh page!", "error");
            });
        }
    };
	
	$scope.modalEdit = function (adID) {
		var modalInstance = $modal.open({
			templateUrl: 'templates/editAd.html',
			controller: 'ControllerEditAd',
			size: 'lg',
			resolve: {
				adID: function () {
					return adID;
				}
			}
		});
	};
	
}])


