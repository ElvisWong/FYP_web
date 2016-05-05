(function() { // closure

'use strict';

angular
    .module('app.home')
    .factory('homeService', homeService);

homeService.$inject = [ '$http' ];

function homeService($http) {

	var service = {
		runPython: runPython,
		search: search,
		getSentiment: getSentiment
	};

	return service;

	function runPython(inputField) {
		console.log("run python services called");
		return $http.post('/api/home/runPython', {inputField: inputField});
	}
	function search(input) {
		return $http.post('/api/home/search', {input: input});
	}
	function getSentiment() {
		var promise = $http.post("/api/stat/getSentiment");
		return promise;
	}
}

})(); // closure