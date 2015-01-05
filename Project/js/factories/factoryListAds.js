var apiUrl="http://softuni-ads.azurewebsites.net/api/";

adsApp.factory('adsRes', function($http, $q){
	function getAll(pageNumber, townId, categoryId) {
		var deferred  = $q.defer();
		$http({
			method: 'GET',
			url: apiUrl + '/ads?pagesize=5&startpage=' + pageNumber + '&TownId=' + townId + '&CategoryId=' + categoryId
		})
		.success(function(data, status, headers, config) {
			deferred .resolve(data, status, headers, config);
		})
		.error(function(data, status, headers, config) {
			deferred .reject(data, status, headers, config);
		});
		return deferred .promise;
	}

	return {
		getAll: getAll,
	};
	
})