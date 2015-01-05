adsApp.factory('adsMain', function($http, $q){	
	
	function displayMessage(message, type) {
			noty({text: message, type: type});
	}
	
	return{
		displayMessage: displayMessage
	}

})	