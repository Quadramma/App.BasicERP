appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

    .state('ga.product', {
        url: '/product',
        views: {
            '': {
                templateUrl: 'views/nodes/product/product.layout.html',
                controller: 'ProductController'
            }
        }
    })

    .state('ga.product.items', {
        url: '/items',
        views: {
            '': {
                templateUrl: 'views/nodes/product/product.items.html',
                controller: "ProductItemsController"
            }
        }
    })

    .state('ga.product.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/nodes/product/product.create.html',
                controller: "ProductCreateController"
            }
        }
    })
        .state('ga.product.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/product/product.edit.html',
                controller: "ProductEditController"
                }
            }
        })



});