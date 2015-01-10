adsApp.factory('adsAdmin', function($http, $q, $cookieStore, adsProfile, $location){		
	function getAdminAds(pageNumber, townId, categoryId) {
        var deferred  = $q.defer();
        var headers = adsProfile.getUserHeaders(); 
		if(typeof status === 'undefined'){
			status = '';
		}
		
        $http({
            method: 'GET',
            url: apiUrl + '/admin/ads?pagesize=10&startpage=' + pageNumber + '&TownId=' + townId + '&CategoryId=' + categoryId,
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
	
	function approveAd(id) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'PUT',
            url: apiUrl + '/admin/Ads/Approve/' + id,
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
	
	function rejectAd(id) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'PUT',
            url: apiUrl + '/admin/Ads/Reject/' + id,
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
	
	function deleteAd(id) {
        var deferred = $q.defer();
        var headers = adsProfile.getUserHeaders();

        $http({
            method: 'DELETE',
            url: apiUrl + '/admin/ads/' + id,
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
	
	return{
      getAdminAds: getAdminAds,
	  approveAd: approveAd,
	  rejectAd: rejectAd,
	  deleteAd: deleteAd
    }

})    