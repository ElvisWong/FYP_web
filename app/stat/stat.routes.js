(function() { // closure

'use strict';

angular
    .module('app.stat')
    .config(configure);

configure.$inject = [ '$stateProvider', '$urlRouterProvider', '$locationProvider' ];

function configure($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('menu.stat', {
            url: '/stat',
            parent: 'menu',
            templateUrl: '/views/stat/stat.view.html',
            controller: 'StatController',
            controllerAs: 'vm'
        });
    $locationProvider.html5Mode(true);
}


})(); // closure