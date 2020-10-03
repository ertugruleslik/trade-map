angular.module('auto-close', [])
    .directive('pyAutoClose', function($document) {
        return {
            scope: {
                autoClose: '=pyAutoClose'
            },
            link: function (scope, element) {

                scope.$watch('autoClose', function (flag) {

                    if (flag) {
                        $document.on('click', closeElement);
                    } else {
                        $document.off('click', closeElement);
                    }
                });

                function closeElement(event) {

                    if ($(event.target).hasClass('fixedShow')) {
                        scope.autoClose = true;
                    } else if (!element[0].contains(event.target)) {
                        scope.autoClose = '';
                        scope.$apply();
                        scope.searchService = '';
                    } else {
                        scope.autoClose = true;
                    }
                }

            }
        };
    });
