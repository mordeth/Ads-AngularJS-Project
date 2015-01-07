adsApp.factory('adsMain', function($http, $q){	
	
	function displayMessage(message, type) {
			noty({
				text: message, 
				type: type,
				animation: {
					open: {height: 'toggle'}, // jQuery animate function property object
					close: {height: 'toggle'}, // jQuery animate function property object
					easing: 'swing', // easing
					speed: 500 // opening & closing animation speed
				}
				
				});
	}
	
	return{
		displayMessage: displayMessage
	}

})	