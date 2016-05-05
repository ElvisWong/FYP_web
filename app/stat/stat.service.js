(function() { // closure

'use strict';

angular
    .module('app.stat')
    .factory('statService', statService);

statService.$inject = [ '$http', '$cookieStore' ];

function statService($http, $cookieStore) {

	var service = {
		getSentiment: getSentiment
	};

	return service;

	function getSentiment() {
		var promise = $http.post("/api/stat/getSentiment");
		return promise;
	}

}

})(); // closure