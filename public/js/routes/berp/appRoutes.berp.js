appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

   
    .state('berp', {
        url: '/berp',
        views: {
            '': {
                templateUrl: 'views/layouts/berp/berp.layout.html',
                controller: 'HomeController'
            },
            'header@berp': {
                templateUrl: 'views/layouts/berp/berp.header.html',

            },
            'tree@berp': {
                templateUrl: 'views/layouts/berp/berp.tree.html',

            }
        }
    })

    .state('berp.home', {
        url: '/home',
        views: {
            '': {
                templateUrl: 'views/layouts/berp/berp.home.html',
            }
        }
    })

     .state('berp.login', {
        url: '/login',
        views: {
            '': {
                templateUrl: 'views/layouts/nms/login.html',
                // controller: 'LoginController'
            }
        }
    })


    
   

   
    .state('workitems', {
        url: '/workitems',
        views: {
            '': {
                templateUrl: 'views/workitems.html',
                //controller: 'WorkItemController'
            }
        }
    })

});
