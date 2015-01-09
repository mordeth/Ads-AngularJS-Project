adsApp.controller("ControllerListAds",  ['$scope', '$location', '$rootScope', 'adsRes', 'adsMain', function($scope, $location, $rootScope, adsRes, adsMain) {
	var ajaxError = "Error loading feed, please try again later!";
    var selectedCategory = '';
	var selectedTown = '';
    $scope.noAds = false;
	$rootScope.$broadcast('notAdsPage');
	
	//Pagination with dirPaginate
	var currentPage = 1;
    $scope.totalAds = 0;
    $scope.adsPerPage = 10;
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    $rootScope.$broadcast('pageChanged', { pageTitle: "Home"});
	
    function getResultsPage(pageNumber) {
        adsRes.getAll(pageNumber, selectedTown, selectedCategory).then(function(response) {
			$scope.adsData = response;
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
      adsRes.getAll(currentPage, selectedTown, categoryId).then(function(response) {
       
        $scope.adsData = response;
    
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
      adsRes.getAll(currentPage, townId, selectedCategory).then(function(response) {
       
        $scope.adsData = response;
    
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

}])


