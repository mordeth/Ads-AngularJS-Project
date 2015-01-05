adsApp.controller("ControllerListAds",  ['$scope', 'adsRes', function($scope, adsRes) {
	var currentCategoryId = '';
	var currentTownId = '';
	
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
        adsRes.getAll(pageNumber, currentTownId, currentCategoryId).then(function(response) {
			$scope.adsData = response;
			$scope.totalAds = parseInt(response.numPages) * 5;
			currentPage = pageNumber;
		});
    }
}])


