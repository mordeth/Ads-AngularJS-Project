adsApp.controller("ControllerListAds",  ['$scope', 'adsRes', function($scope, adsRes) {
  adsRes.getAllAds(function(response){
		$scope.adsData=response;
	}),
	adsRes.getAllTowns(function(response){
		$scope.townsData=response;
	}),
	adsRes.getAllCategory(function(response){
		$scope.categoryData=response;
	})

	console.log($scope);
}])


