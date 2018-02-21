(function() {

    'use strict';

    angular
        .module('tokenAuthApp.components.auth', [])
        .controller('authLoginController', authLoginController);

    authLoginController.$inject = [];

    function authLoginController() {
        /*jshint validthis: true */
        const vm = this;
        vm.test = 'just a test';
    }

})();