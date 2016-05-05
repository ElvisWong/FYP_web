(function() { // closure

'use strict';

angular
    .module('app', [
        'ngCookies',
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'app.home',
        'app.stat',
        'mwr.shared',
        'slick',
        'tc.chartjs'
    ]);

})(); // closure