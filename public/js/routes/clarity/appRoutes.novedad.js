appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('clarity.novedad', {
            url: '/novedad',
            views: {
                '': {
                    templateUrl: 'views/nodes/novedad/novedad.layout.html',
                    controller: 'NovedadLayoutController'
                }
            }
        })

    .state('clarity.novedad.items', {
        url: '/items',
        views: {
            '': {
                templateUrl: 'views/nodes/novedad/novedad.items.html',
                controller:"NovedadItemsController"
            }
        }
    })
        .state('clarity.novedad.create', {
            url: '/create/:ContactoID',
            views: {
                '': {
                    templateUrl: 'views/nodes/novedad/novedad.create.html',
                    controller:"NovedadCreateController"
                }
            }
        })
        .state('clarity.novedad.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/novedad/novedad.edit.html',
                    controller:"NovedadEditController"
                },
                "novedades@clarity.novedad.edit":{
                    templateUrl: 'views/nodes/novedad/novedad.items.html'
                }
            }
        });


});