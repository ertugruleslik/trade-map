// home.controller.js
(() => {

    angular
        .module('app')
        .controller('NavBarController', NavBarController);

    function NavBarController($rootScope, $scope, $state, Utils, $location, socialLoginService) {
        const vm = this;
        vm.countrySelect = countrySelect;
        vm.logout = logout;
        vm.root = $rootScope;
        vm.search;
        vm.path = $location.path();

        Utils.getCountry().then(function(data){
            vm.mapRegions = data.countries;
        });

        vm.menuItems = [
            {text: "İhracat Yap", callback: makeExport},
            {text: "İthalat Yap", callback: makeImport},
            {text: "Not Ekle", callback: addNote},
            {text: "Bilgileri Sil", callback: deleteInfo}
        ];

        function makeExport(){
            Utils.countryStyle(vm.selectCountry, 'export');
            Utils.setAction(vm.selectCountry, 'export');
        }

        function makeImport(){
            Utils.countryStyle(vm.selectCountry, 'import');
            Utils.setAction(vm.selectCountry, 'import');
        }

        function addNote(){
            const note = prompt("Not:");
            Utils.setNote(vm.selectCountry, note);
        }
        function deleteInfo(){
            Utils.deleteInfo(vm.selectCountry);
        }

        function countrySelect(code) {
            vm.selectCountry = code;
        }

        function logout() {
            socialLoginService.logout();
        }

        $scope.$on('event:social-sign-out-success', function(event, userDetails){
            $rootScope.user = userDetails;
            $state.go('cikis');
        })

    }

})();
