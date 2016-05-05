(function() { // closure

'use strict';

angular
    .module('app.home')
    .config(configure);

configure.$inject = [ '$stateProvider', '$urlRouterProvider', '$locationProvider' ];

function configure($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('menu.home', {
            url: '/home',
            parent: 'menu',
            templateUrl: '/views/home/home.view.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        });
    $locationProvider.html5Mode(true);
}


})(); // closure