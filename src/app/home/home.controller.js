(() => {

    angular
        .module('app')
        .controller('HomeController', HomeController);

    function HomeController($state, $scope, $rootScope, $http, Utils) {
        const vm = this;
        vm.data = $rootScope.data;
        vm.tradeRate = tradeRate;
        init();
        tradeRate();

        // Map Events
        $scope.$on('svg-map-mousedown', function(e, x, y, data) {
            vm.selectCountry = data;
        });

        $scope.$on('svg-map-mouseover', function(e, x, y, data) {
            Utils.countryStyle(data.code, 'over');
            $scope.$apply();
        });

        $scope.$on('svg-map-mouseout', function(e, x, y, data) {
            Utils.countryStyle(data.code);
        });

        function init() {
            if(!vm.data){
                Utils.getCountry().then(function(data){
                    $rootScope.data = data;
                    vm.data = $rootScope.data;
                    tradeRate();
                });
            }
        }

        vm.menuItems = [
            {text: "İhracat Yap", callback: makeExport},
            {text: "İthalat Yap", callback: makeImport},
            {text: "Not Ekle", callback: addNote},
            {text: "Bilgileri Sil", callback: deleteInfo}
        ];

        function makeExport(){
            Utils.countryStyle(vm.selectCountry.code, 'export');
            Utils.setAction(vm.selectCountry.code, 'export');
        }

        function makeImport(){
            Utils.countryStyle(vm.selectCountry.code, 'import');
            Utils.setAction(vm.selectCountry.code, 'import');
        }

        function addNote(){
            const note = prompt("Not:");
            Utils.setNote(vm.selectCountry.code, note);
        }
        function deleteInfo(){
            Utils.deleteInfo(vm.selectCountry.code);
        }

        if(vm.data){
            vm.totalTrade = vm.data.countries.filter(function (el) {
                return el.actions;
            });
        }

        function tradeRate(){
            let totalTrade = {},
                actions = [],
                exports = [];

            if(vm.data){
                actions = vm.data.countries.filter(function (el) {
                    return el.actions;
                });

                exports = vm.data.countries.filter(function (el) {
                    return el.actions === 'export';
                });
            }

            totalTrade = {
                export: ((exports.length/actions.length) * 100).toFixed(),
                import: ((exports.length/actions.length) * 100).toFixed()
            }

            totalTrade.export = ((exports.length/actions.length) * 100).toFixed();
            totalTrade.import = (100-totalTrade.export).toFixed();

            return totalTrade;
        }
    }

})();
