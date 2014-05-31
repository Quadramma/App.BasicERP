appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
    .state('berp.client', {
        url: '/client',
        views: {
            '': {
                templateUrl: 'views/nodes/client/clientLayout.html',
                //controller: 'ClientController'
            }
        }
    })
    .state('berp.client.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/nodes/client/clientList.html'
            }
        }
    })
    .state('berp.client.edit', {
        url: '/edit',
        views: {
            '': {
                templateUrl: 'views/nodes/client/clientEdit.html'
            },
            'clientForm@berp.client.edit': {
                templateUrl: 'views/nodes/client/clientForm.html'
            }
        }
    })
    .state('berp.client.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/nodes/client/clientCreate.html'
            },
            'clientForm@berp.client.create': {
                templateUrl: 'views/nodes/client/clientForm.html'
            }
        }
    })
});

