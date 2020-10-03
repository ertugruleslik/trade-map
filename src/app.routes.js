// app.routes.js
(() => {

    angular.module('app')

        .config(($stateProvider, $urlRouterProvider, $locationProvider, socialProvider) => {
            $locationProvider.html5Mode(true).hashPrefix();

            const states = [
                {
                    name: 'giris',
                    url: '/',
                    template: '<login></login>',
                    data: {
                        pageTitle: 'Giriş'
                    }
                },
                {
                    name: 'detay',
                    url: '/detay',
                    template: '<home></home>',
                    data: {
                        pageTitle: 'Detay'
                    }
                },
                {
                name: 'kita',
                    url: '/kita/:id',
                    template: '<continents></continents>',
                    params: {
                        id:{
                            value: null,
                            squash: true
                        }
                    }
                },
                {
                    name: 'cikis',
                    url: '/cikis',
                    template: '<logout></logout>',
                    data: {
                        pageTitle: 'Log Out'
                    }
                }];
            states.forEach(state => {
                $stateProvider.state(state);
            });
            socialProvider.setFbKey({appId: "434716407500533", apiVersion: "v2.8"});

            $urlRouterProvider.when('/', ['$state', '$match', ($state, $match) => {
                $state.go('detay');
            }]);
        })

        .run(
            ['$rootScope', '$state', '$stateParams',
                ($rootScope, $state, $stateParams) => {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]
        );

})();
