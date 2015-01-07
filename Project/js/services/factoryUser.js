adsApp.factory('adsUser', function($http, $q){	

	function login(userDetails) {
    var deferred = $q.defer();

    $http({
        method: 'POST',
        url: apiUrl + '/user/login',
        data: userDetails
    })
    .success(function(data, status, headers, config) {              
        deferred.resolve(data, status, headers, config);
    })
    .error(function(data, status, headers, config) {
        deferred.reject(data, status, headers, config);
    });

    return deferred.promise;

   }

   function register(userDetails) {
    var deferred = $q.defer();

    $http({
        method: 'POST',
        url: apiUrl + '/user/register',
        data: userDetails
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
		login: login,
		register: register,
	}

})	