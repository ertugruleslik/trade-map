// home.component.js
(() => {

    angular
        .module('app')
        .component('login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: 'app/login/login.html'
        });

})();
