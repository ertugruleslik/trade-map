// logout.controller.js
(() => {

    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    function LogoutController($state, $scope, socialLoginService) {
        const vm = this;
        vm.header = 'Çıkış';
        vm.logoutClick = logoutClick;

        function logoutClick() {
            socialLoginService.logout();
            $state.go('giris');
        }
    }

})();
