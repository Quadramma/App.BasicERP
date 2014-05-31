appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
   .state('supplier', {
        url: '/supplier',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierLayout.html',
                //controller: 'SupplierController'
            }
        }
    })
    .state('supplier.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierList.html'
            }
        }
    })
    .state('supplier.edit', {
        url: '/edit',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierEdit.html'
            },
            'clientForm@client.edit': {
                templateUrl: 'views/supplier/supplierForm.html'
            }
        }
    })
    .state('supplier.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierCreate.html'
            },
            'supplierForm@client.create': {
                templateUrl: 'views/supplier/supplierForm.html'
            }
        }
    })
});

