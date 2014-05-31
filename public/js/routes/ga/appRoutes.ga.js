appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('ga', {
            url: '/ga',
            views: {
                '': {
                    templateUrl: 'views/layouts/ga/ga.layout.html',
                    controller: 'GAppController'
                },
                'header@ga': {
                    templateUrl: 'views/layouts/ga/ga.header.html',

                }
            }
        })
        .state('ga.home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: 'views/layouts/ga/ga.home.html',
                }
            }
        })

    .state('ga.categories', {
        url: '/categories',
        views: {
            '': {
                templateUrl: 'views/layouts/ga/ga.categories.html',
            }
        }
    })


    .state('ga.login', {
        url: '/login',
        views: {
            '': {
                templateUrl: 'views/layouts/ga/ga.login.html',
                controller: 'GaLoginController'
            }
        }
    })


    .state('ga.config', {
        url: '/config',
        views: {
            '': {
                templateUrl: 'views/layouts/ga/ga.config.layout.html',
                controller: 'ConfigController'
            }
        }
    })
        .state('ga.config.destacados', {
            url: '/destacados',
            views: {
                '': {
                    templateUrl: 'views/layouts/ga/ga.config.destacados.html',
                    controller: 'ConfigDestacadosController'
                }
            }
        })

    .state('ga.config.slider', {
        url: '/slider',
        views: {
            '': {
                templateUrl: 'views/layouts/ga/ga.config.slider.html',
                controller: 'ConfigSliderController'
            }
        }
    })

});



appRoutes.run(function($rootScope, $location, $urlRouter, $state, $timeout) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        // console.log("toState");
        // console.log(toState);
    });

});