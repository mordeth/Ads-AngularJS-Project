adsApp.controller("ControllerListAds",  ['$scope', 'adsRes', function($scope, adsRes) {
  adsRes.getAllAds(function(response){
		$scope.adsData=response;
	})
}])


