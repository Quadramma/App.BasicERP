//Require:
//- $resource pluggin (ngResource)
//- AppConfig (Clarity configuration module)
angular.module('EmpresaService', ['ngResource']).factory('Empresa', ['$resource', 'AppConfig',
    function($resource, AppConfig) {
        return $resource(AppConfig.apiClarity + 'empresa/:action/:id', {}, {
            query: {
                method: "GET",
                isArray: false,
                params: {
                    action: "get"
                }
            },
            get: {
                method: "GET",
                isArray: false,
                params: {
                    action: "get"
                }
            },
            update: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    action: "post"
                }
            },
            delete: {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    action: "DELETE"
                }
            },
            save: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    action: "post"

                }
            }
        });
    }
]);