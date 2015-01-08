adsApp.factory('adsData', function($http, $q, $cookieStore, adsProfile){	

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

   return{
      publishAd: publishAd
    }

})    