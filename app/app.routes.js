(function() { // closure

'use strict';

angular
    .module('app')
    .config(configure)
    .run(watchStateChanges);

configure.$inject = [ '$urlRouterProvider', '$stateProvider', '$locationProvider' ];

function configure($urlRouterProvider, $stateProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/home");
	$stateProvider
		.state('menu', {
			abstract: true,
			templateUrl: 'views/components/menu-main/menu.main.view.html',
			controller: 'MainMenuController',
			controllerAs: 'vm'
		});
}

watchStateChanges.$inject = [ '$rootScope', '$location' ];

function watchStateChanges($rootScope, $location) {
    $rootScope.$on('$stateChangeStart', function(event) {
    	
    });

}

})(); // closure