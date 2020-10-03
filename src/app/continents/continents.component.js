(() => {

    angular
        .module('app')
        .component('continents', {
            controller: 'continentsController',
            controllerAs: 'vm',
            templateUrl: 'app/continents/continents.html'
        });

})();
