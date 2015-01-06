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

   function logout(){
     var deferred = $q.defer();
     headers = authHeader();
     $http({
        method: 'POST',
        url: apiUrl + '/user/logout',
        data: {},
        headers: headers
     })
    .success(function(data, status, headers, config) {
        authorizationService.deleteAuthorizationHeaders();
        delete sessionStorage['currentUser'];              
        deferred.resolve(data, status, headers, config);
    })
    .error(function(data, status, headers, config) {
        deferred.reject(data, status, headers, config);
    });

    return deferred.promise;
   }

   function authHeader() {
			var accessToken = getAccessToken();
			if (accessToken) {
				angular.extend(headers, {Authorization: 'Bearer ' + accessToken});
			}
			return headers;
	 }


	return{
		login: login,
		register: register,
		logout: logout,
		authHeader: authHeader
	}

})	