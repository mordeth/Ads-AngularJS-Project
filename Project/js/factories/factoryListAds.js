var apiUrl="http://softuni-ads.azurewebsites.net/api/";

adsApp.factory('adsRes', function($http){
	return {
		getAllAds:function(success){
			$http({method:'GET',url:apiUrl+'ads?Pagesize=10&startpage=1'})
			.success(function(data,status,headers,config){
				success(data);
			})
			.error(function(data,status,headers,config){
				$log.warn(data);
			})
		},

		getAllTowns:function(success){
			$http({method:'GET',url:apiUrl+'towns'})
			.success(function(data,status,headers,config){
				success(data);
			})
			.error(function(data,status,headers,config){
				$log.warn(data);
			})
		},

		getAllCategory:function(success){
			$http({method:'GET',url:apiUrl+'categories'})
			.success(function(data,status,headers,config){
				success(data);
			})
			.error(function(data,status,headers,config){
				$log.warn(data);
			})
		}
	}
})