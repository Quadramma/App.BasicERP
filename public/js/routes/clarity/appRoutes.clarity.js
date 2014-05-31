appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('clarity', {
            url: '/clarity',
            views: {
                '': {
                    templateUrl: 'views/layouts/clarity/clarity.layout.html',
                    controller: 'ClarityAppController'
                },
                'tree@clarity': {
                    templateUrl: 'views/layouts/clarity/clarity.tree.html',
                    controller: "ClarityMenuController"

                },
                'header@clarity': {
                    templateUrl: 'views/layouts/clarity/clarity.header.html',
                    controller: 'ClarityHeaderController'

                }
            }
        })
        .state('clarity.home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: 'views/layouts/clarity/clarity.home.html',
                    controller: "ClarityHomeController"
                }
            }
        })

    .state('clarity-login', {
        url: '^/login',
        views: {
            '': {
                templateUrl: 'views/layouts/clarity/clarity.login.html',
                controller: 'ClarityLoginController'
            },
            "logo@clarity-login": {
                templateUrl: 'views/layouts/clarity/clarity.logo.html'
            }
        }
    })

});