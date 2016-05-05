(function() { // closure

'use strict';

angular
    .module('app')
    .controller('MainMenuController', MainMenuController);

MainMenuController.$inject = [ '$scope', '$state', '$location'];

function MainMenuController($scope, $state, $location) {

	var vm = this;

	vm.path = $location.path();
	vm.resetEdit = resetEdit;
	vm.changeLocation = changeLocation;

	function resetEdit() {
		
	}
	function changeLocation(path) {
		vm.path = path;
		console.log("path: ", path);
		$location.path(path);
	}

}

})(); //closure

