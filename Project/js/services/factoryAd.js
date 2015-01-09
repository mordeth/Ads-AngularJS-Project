adsApp.factory('adsData', function($http, $q, $cookieStore, adsProfile, $location){	

	function publishAd(adsDetails) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'POST',
            url: apiUrl + '/user/ads',
            data: adsDetails,
            headers: headers
        })
        .success(function(data, status, headers, config) {              
            deferred.resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data, status, headers, config);
        });

        return deferred.promise;
    }
	
	function deleteAd(id) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'DELETE',
            url: apiUrl + '/user/ads/' + id,
            data: null,
            headers: headers
        })
        .success(function(data, status, headers, config) {              
            deferred.resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data, status, headers, config);
        });

        return deferred.promise;
    }
	
	function publishAgainAd(id) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'PUT',
            url: apiUrl + '/user/ads/publishagain/' + id,
            data: null,
            headers: headers
        })
        .success(function(data, status, headers, config) {              
            deferred.resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data, status, headers, config);
        });

        return deferred.promise;
    }
	
	function republishAd(id) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'PUT',
            url: apiUrl + '/user/ads/publishagain/' + id,
            data: null,
            headers: headers
        })
        .success(function(data, status, headers, config) {              
            deferred.resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data, status, headers, config);
        });

        return deferred.promise;
    }
	
	function deactivateAd(id) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'PUT',
            url: apiUrl + '/user/ads/deactivate/' + id,
            data: null,
            headers: headers
        })
        .success(function(data, status, headers, config) {              
            deferred.resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data, status, headers, config);
        });

        return deferred.promise;
    }

    function getUserAds(pageNumber, status) {
        var deferred  = $q.defer();
        var headers = adsProfile.getUserHeaders(); 
		if(typeof status === 'undefined'){
			status = '';
		}
		
        $http({
            method: 'GET',
            url: apiUrl + '/user/ads?pagesize=3&startpage=' + pageNumber + '&status=' + status,
            headers: headers
        })
        .success(function(data, status, headers, config) {
            deferred .resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred .reject(data, status, headers, config);
        });
        return deferred .promise;
    }
	
	function getSingleAd(adID) {
        var deferred  = $q.defer();
        var headers = adsProfile.getUserHeaders(); 

        $http({
            method: 'GET',
            url: apiUrl + '/user/ads/' + adID,
            headers: headers
        })
        .success(function(data, status, headers, config) {
            deferred .resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred .reject(data, status, headers, config);
        });
        return deferred .promise;
    }
	
	function editAd(adID, adsDetails) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'PUT',
            url: apiUrl + '/user/ads/' + adID,
            data: adsDetails,
            headers: headers
        })
        .success(function(data, status, headers, config) {              
            deferred.resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data, status, headers, config);
        });

        return deferred.promise;
    }
	
    return{
      publishAd: publishAd,
      getUserAds: getUserAds,
	  deleteAd: deleteAd,
	  deactivateAd: deactivateAd,
	  republishAd: republishAd,
	  getSingleAd: getSingleAd,
	  editAd: editAd
    }

})    