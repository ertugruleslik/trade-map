// home.component.js
(() => {

    angular
        .module('app')
        .component('logout', {
            controller: 'LogoutController',
            controllerAs: 'vm',
            templateUrl: 'app/logout/logout.html'
        });

})();
