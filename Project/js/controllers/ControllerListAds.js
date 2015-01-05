adsApp.controller("ControllerListAds",  ['$scope', 'adsRes', 'adsMain', function($scope, adsRes, adsMain) {
	var ajaxError = "Error loading feed, please try again later!";
    var selectedCategory = '';
	var selectedTown = '';
	
	//Pagination with dirPaginate
	var currentPage = 1;
    $scope.totalAds = 0;
    $scope.adsPerPage = 5;
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };
	
    function getResultsPage(pageNumber) {
        adsRes.getAll(pageNumber, selectedTown, selectedCategory).then(function(response) {
			$scope.adsData = response;
			$scope.totalAds = parseInt(response.numPages) * 5;
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
      adsRes.getAll(categoryId, selectedTown, currentPage).then(function(response) {
       
        $scope.adsData = response;
    
        $scope.totalAds = parseInt(adsRes.getAll.numPages) * 5;
        selectedCategory = categoryId;

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
      adsRes.getAll(selectedCategory, townId, currentPage).then(function(response) {
       
        $scope.adsData = response;
    
        $scope.totalAds = parseInt(adsRes.getAll.numPages) * 5;
        selectedTown = townId;

      }, function(error) {
        adsMain.displayMessage(ajaxError, "warning");
      });

    };

}])


