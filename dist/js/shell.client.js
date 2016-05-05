function Angora() {
    this.libraries = [
        {
            name: 'Bootstrap CSS',
            oldcdn: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css',
            local: '/libs/bootstrap/dist/css/bootstrap.min.css'
        },
        {
            name: 'Bootstrap Theme CSS',
            local: '/libs/bootstrap/dist/css/bootstrap-theme.min.css'
        },
        {
            name: 'Application CSS',
            local: '/css/app.min.css'
        },
        {
            name: 'Slick Carousel CSS',
            local: '/libs/slick-carousel/slick/slick.css'
        },
        {
            name: 'jQuery',
            oldcdn: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
            local: '/libs/jquery/dist/jquery.js'
        },
        {
            name: 'jQuery UI CSS',
            local: '/libs/jquery-ui/themes/base/all.css'
        },
        {
            name: 'jQuery UI JS',
            local: '/libs/jquery-ui/jquery-ui.min.js'
        },
        {
            name: 'Bootstrap JS',
            oldcdn: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js',
            local: '/libs/bootstrap/dist/js/bootstrap.min.js'
        },
        {
            name: 'lodash',
            oldcdn: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.6.1/lodash.js',
            local: 'libs/lodash/lodash.js'
        },
        {
            name: 'Angular',
            type: 'library',
            oldcdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.js',
            local: '/libs/angular/angular.min.js'
        },
        {
            name: 'Slick Carousel JS',
            local: '/libs/slick-carousel/slick/slick.js'
        },
        {
            name: 'Angular Slick',
            local: '/libs/angular-slick/dist/slick.min.js'
        },
        {
            name: 'Angular Cookies',
            oldcdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular-cookies.js',
            local: '/libs/angular-cookies/angular-cookies.min.js'
        },
        {
            name: 'Angular Route',
            oldcdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular-route.js',
            local: '/libs/angular-route/angular-route.min.js'
        },
        {
            name: 'Angular Animate',
            oldcdn: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.5/angular-animate.min.js',
            local: '/libs/angular-animate/angular-animate.min.js'
        },
        {
            name: 'Angular UI Router',
            type: 'module',
            local: '/libs/angular-ui-router/release/angular-ui-router.min.js'
        },
        {
            name: 'Angular Sanitize',
            oldcdn: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular-sanitize.js',
            local: '/libs/angular-sanitize/angular-sanitize.min.js'
        },
        {
            name: 'D3',
            local: '/libs/d3/d3.min.js'
        },
        {
            name: 'Angular Bootstrap UI',
            oldcdn: 'http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.2.1.js',
            local: '/libs/angular-bootstrap/ui-bootstrap-tpls.min.js'
        },
        {   
            name: 'Bootstrap Material Design CSS',
            local: '/libs/bootstrap-material-design/dist/css/material-fullpalette.min.css'
        },
        {   
            name: 'Bootstrap Material Design JS',
            local: '/libs/bootstrap-material-design/dist/js/material.min.js'
        },
        {
            name: 'Chart JS',
            local: '/libs/Chart.js/Chart.js'
        },
        {
            name: 'TC Angular JS',
            local: '/libs/tc-angular-chartjs/dist/tc-angular-chartjs.js'
        }
    ];

    this.application = "/js/app.min.js";

    this.init = function() {
        ctx = this;
        this.loadLibraries(ctx);
    };
    this.loadLibraries = function(ctx) {
        var libraryList = [ ];
        for (var i in ctx.libraries) {
            var library = ctx.libraries[i];
            libraryList.push(library.cdn || library.local);
        }
        head.load(libraryList, function() {
            ctx.loadApplication(ctx);
        });
    };
    this.loadApplication = function(ctx) {
        head.load(ctx.application, function() {
            angular.bootstrap(document, ['app']);
        });
    $.material.init();
    };
    this.resetEditOnBackButton = function() {
        var mainMenu = angular.element('.navbar-header').scope();
        if (mainMenu) mainMenu.vm.resetEdit();
    };
}
var angora = new Angora(); // add core client library

// on page load, add libraries
window.onload = function () {
    var pathArray = window.location.pathname.split( '/' );
    if (pathArray[pathArray.length - 1] !== 'pdf') {
        window.onunload = angora.resetEditOnBackButton;
        window.onpopstate  = angora.resetEditOnBackButton;
    }
    angora.init();
};
