appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('clarity.contacto', {
            url: '/contacto',
            views: {
                '': {
                    templateUrl: 'views/nodes/contacto/contacto.layout.html',
                    controller: 'ContactoLayoutController'
                }
            }
        })

    .state('clarity.contacto.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/nodes/contacto/contacto.list.html',
                controller:"ContactoItemsController"
            }
        }
    })
        .state('clarity.contacto.create', {
            url: '/create',
            views: {
                '': {
                    templateUrl: 'views/nodes/contacto/contacto.create.html',
                    controller:"ContactoCreateController"
                }
            }
        })
        .state('clarity.contacto.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/contacto/contacto.edit.html',
                    controller:"ContactoEditController"
                },
                "novedades@clarity.contacto.edit":{
                    templateUrl: 'views/nodes/novedad/novedad.items.html'
                }
            }
        });


});