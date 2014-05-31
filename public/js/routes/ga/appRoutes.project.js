appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

    .state('ga.project', {
        url: '/project',
        views: {
            '': {
                templateUrl: 'views/nodes/project/project.layout.html',
                controller: 'ProjectController'
            }
        }
    })

    .state('ga.project.items', {
        url: '/items',
        views: {
            '': {
                templateUrl: 'views/nodes/project/project.items.html',
                controller: "ProjectItemsController"
            }
        }
    })

    .state('ga.project.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/nodes/project/project.create.html',
                controller: "ProjectCreateController"
            }
        }
    })
        .state('ga.project.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/project/project.edit.html',
                    controller: "ProjectEditController"
                }
            }
        })



});