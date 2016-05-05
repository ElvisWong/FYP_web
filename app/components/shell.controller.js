(function() { // closure

'use strict';

angular
    .module('app')
    .controller('ShellController', ShellController);

ShellController.$inject = [ ];

function ShellController() {
    /*jshint validthis: true */
    var vm = this;

    vm.testVar = 'from controller';
}

})(); // closure