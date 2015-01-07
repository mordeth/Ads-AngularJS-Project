adsApp.factory('adsProfile', function($http, $q, $cookieStore){	

	function getUserHeaders() {
     var headers = {};
     var accessToken = $cookieStore.get('access_token');
     if (accessToken) {
         angular.extend(headers, {Authorization: 'Bearer ' + accessToken});
         return headers;
     }
     return null;
    }

    function deleteUserHeaders() {
        delete headers['Authorization'];
    }

    var getUserProfile = function() {
        var deferred = $q.defer();
        var headers = getUserHeaders();

        $http({
            method: 'GET',
            url: apiUrl + '/user/profile',
            headers: headers,
            data: null
        })
        .success(function(data, status, headers, config) {
            deferred.resolve(data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(data, status, headers, config);
        });

        return deferred.promise;
    };


	return{
		getUserHeaders: getUserHeaders,
		deleteUserHeaders: deleteUserHeaders,
        getUserProfile: getUserProfile
	}

})	