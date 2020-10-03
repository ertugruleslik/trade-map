(() => {

    angular
        .module('app')
        .controller('LoginController', LoginController);

    function LoginController($state, $scope, socialLoginService, $rootScope) {
        const vm = this;


        $scope.$on('event:social-sign-in-success', (event, userDetails)=> {
            $rootScope.user = userDetails;
            $state.go('detay');
        })
    }

})();
