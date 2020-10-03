(() => {

    angular
        .module('app')
        .controller('continentsController', continentsController);

    function continentsController($scope, $stateParams, $rootScope, $state) {
        const vm = this;
        vm.$onInit = onInit;

        function onInit() {
            vm.continent = findContinent($rootScope.data.continents)[0];
            vm.countries = findCountries($rootScope.data.countries, vm.continent.code);
        }

        function findContinent(a){
            return a.filter(function (item) {
                return item['url'] === $stateParams.id
            });
        }

        function findCountries(data,code){
            return data.filter(item => item['continent'] === code)
        }

    }

})();
