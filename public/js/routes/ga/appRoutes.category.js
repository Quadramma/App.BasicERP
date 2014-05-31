appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

    .state('ga.category', {
        url: '/category',
        views: {
            '': {
                templateUrl: 'views/nodes/category/category.layout.html',
                controller: 'CategoryController'
            }
        }
    })

    .state('ga.category.items', {
        url: '/items',
        views: {
            '': {
                templateUrl: 'views/nodes/category/category.items.html',
                controller: "CategoryItemsController"
            }
        }
    })

    .state('ga.category.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/nodes/category/category.create.html',
                controller: "CategoryCreateController"
            }
        }
    })
        .state('ga.category.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/category/category.edit.html',
                    controller: "CategoryEditController"
                }
            }
        })


    .state('ga.prjcategory', {
        url: '/prjcategory',
        views: {
            '': {
                templateUrl: 'views/nodes/category/category.layout.html',
                controller: 'CategoryController'
            }
        }
    })



    .state('ga.prjcategory.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/nodes/prjcategory/prjcategory.create.html',
                controller: "PrjCategoryCreateController"
            }
        }
    })

    .state('ga.prjcategory.edit', {
        url: '/edit',
        views: {
            '': {
                templateUrl: 'views/nodes/prjcategory/prjcategory.edit.html',
                controller: "PrjCategoryEditController"
            }
        }
    })

    .state('ga.prjcategory.items', {
        url: '/items',
        views: {
            '': {
                templateUrl: 'views/nodes/prjcategory/prjcategory.items.html',
                controller: 'CategoryItemsController'
            }
        }
    })

});