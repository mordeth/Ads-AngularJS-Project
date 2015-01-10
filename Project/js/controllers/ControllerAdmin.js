adsApp.controller("ControllerAdmin",  ['$scope', '$route', '$location', '$rootScope', 'adsRes', 'adsMain', 'adsUser', 'adsAdmin', '$modal', function($scope, $route, $location, $rootScope, adsRes, adsMain, adsUser, adsAdmin, $modal) {
	var ajaxError = "Error loading feed, please try again later!";
    $scope.noAds = false;
	var selectedCategory = '';
	var selectedTown = '';
	
	if(!adsUser.userLogged()) {
		$location.path('/');
	}
	
	var currentPage = 1;
    $scope.totalAds = 0;
    $scope.adsPerPage = 10;
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };
	
	$rootScope.$broadcast('notUserAdsPage');

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    $rootScope.$broadcast('pageChanged', { pageTitle: "Ads"});
	
    function getResultsPage(pageNumber) {
		
		adsAdmin.getAdminAds(pageNumber, selectedTown, selectedCategory).then(function(response) {
			$scope.adminData = response;
			$scope.totalAds = parseInt(response.numPages) * 10;
			currentPage = pageNumber;
		}, function(error) {
          adsMain.displayMessage(ajaxError, "warning");
        });
    }
	
	adsRes.getCategories().then(function(response) {
        $scope.categoriesFeed = response;
    }, function(error) {
        adsMain.displayMessage(ajaxError, "warning");
    });

    $scope.filterByCategory = function(categoryId, cateogryName) {
      adsAdmin.getAdminAds(currentPage, selectedTown, categoryId).then(function(response) {
       
        $scope.adminData = response;
    
        $scope.totalAds = parseInt(response.numPages) * 10;
        selectedCategory = categoryId;

        $scope.noAds = false;
        if (response.ads.length === 0) {
         $scope.noAds = true;
        }
        $scope.idSelectedCat = categoryId;

      }, function(error) {
        adsMain.displayMessage(ajaxError, "warning");
      });

    };


    adsRes.getTowns().then(function(response) {
        $scope.townsFeed = response;
    }, function(error) {
        adsMain.displayMessage(ajaxError, "warning");
    });

    $scope.filterByTown = function(townId, townName) {
      adsAdmin.getAdminAds(currentPage, townId, selectedCategory).then(function(response) {
       
        $scope.adminData = response;
    
        $scope.totalAds = parseInt(response.numPages) * 10;
        selectedTown = townId;

        $scope.noAds = false;
        if (response.ads.length === 0) {
         $scope.noAds = true;
        }

        $scope.idSelectedTown = townId;

      }, function(error) {
        adsMain.displayMessage(ajaxError, "warning");
      });

    };
	
	$scope.deleteAd = function(adDetails) {
        if (adsUser.userLogged()) {
			var modalInstance = $modal.open({
				templateUrl: 'templates/adminDeleteAd.html',
				controller: function ($scope, $modalInstance, adDetails) {
					$scope.adDetails = adDetails;
					$scope.ok = function () {
						adsAdmin.deleteAd(adDetails.id).then(function(response) {
							adsMain.displayMessage("Ad delete successfully!", "success");
							$route.reload();
						}, function(error) {
						   adsMain.displayMessage("Error, refresh page!", "error");
						});
						$modalInstance.close();
					};
					$scope.cancel = function () {
						$modalInstance.close();
					};
				},
				size: 'lg',
				resolve: {
					adDetails: function () {
						return adDetails;
					}
				}
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
	
	$scope.approveAd = function (ad) {		
		if (adsUser.userLogged()) {
            adsAdmin.approveAd(ad.id).then(function(response) {
				adsMain.displayMessage("Ad has been approved!", "success");
				$route.reload();
            }, function(error) {
               adsMain.displayMessage("Error, refresh page!", "error");
            });
        }
    }

    $scope.rejectAd = function (ad) {
		if (adsUser.userLogged()) {
            adsAdmin.rejectAd(ad.id).then(function(response) {
				adsMain.displayMessage("Ad has been rejected!", "success");
				$route.reload();
            }, function(error) {
               adsMain.displayMessage("Error, refresh page!", "error");
            });
        }
    }
}])


