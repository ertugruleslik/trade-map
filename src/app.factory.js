(() => {

    angular
        .module('app')
        .factory("Utils", function ($http, $rootScope) {
            return {
                getCountry: function() {
                    return $http.get('data/world.json').then(function(response) {
                        return response.data;
                    });
                },
                countryStyle: function (code,event) {
                    let filtered = $rootScope.data.countries.filter(function (el,i) {
                        if(el.code == code) {
                            el.id = i
                            return el;
                        }
                    });


                    let selectRegion = filtered[0]?.id,
                        action = !filtered[0]?.actions,
                        color;

                    if(action){
                        if(event === 'export'){
                            color = 'red';
                        } else if(event === 'import'){
                            color = 'green';
                        } else if(event === 'over') {
                            color = '#353535';
                        } else {
                            color = '#d6d6d6';
                        }

                        if($rootScope.data.countries[selectRegion]){
                            $rootScope.data.countries[selectRegion].fill = color;
                        }
                    }
                },
                setAction: function(select, action) {
                    $rootScope.data.countries.filter((el) => el.code == select ? el['actions'] = action : null);
                },
                setNote: function(select, note) {
                    $rootScope.data.countries.filter((el) => el.code == select ? el['note'] = note : null);
                },
                deleteInfo: function(select) {
                    $rootScope.data.countries.filter((el) => {
                        if(el.code == select){
                            el['actions'] = ''
                            el['note'] = ''
                        }
                        this.countryStyle(el.code);
                    });
                }
            }
        })
})();
