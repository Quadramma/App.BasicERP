angular.module('TemaNode', [
    "TemaService",
    "TemaHelperModule",
    "TemaService"
])


.controller('TemaLayoutController', function($scope) {
    console.info("[TemaLayoutController]");
    //window.history.pushState({}, "Contacto","Contacto");
    $("title").html("Tema | Clarity");
})

.controller('TemaItemsController', function($scope, $rootScope, Tema, $timeout) {
    console.info("[TemaItemsController]");
    Tema.query({
        pageNumber: 1,
        itemsPerPage: 100
    }, function(res) { //res -> data (page)
        $scope.items = res.data.Items;
    });
})

.controller('TemaCreateController', function($scope, $state, $rootScope, Tema, TemaHelper, $timeout) {
    console.info("[TemaCreateController]");
    $scope.trysave = function() {
        console.info("[TemaCreateController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {
        console.info("[TemaCreateController][" + "validaciones ok" + "]");

        //CABLEADO: POR AHORA
        $scope.item.GrupoID = 1;

        Tema.save({}, $scope.item, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaCreateController][" + "save success" + "]");
        }, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaCreateController][" + "save failure" + "]");
        });

    }
    //
    TemaHelper.FormValidationDefinition($scope.save, null);
})

.controller('TemaEditController', function($scope, $state, $rootScope, Tema, TemaHelper, $timeout) {
    console.info("[TemaEditController]");
    $scope.trysave = function() {
        console.info("[TemaEditController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {
        console.info("[TemaEditController][" + "validaciones ok" + "]");
        Tema.save({}, $scope.item, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaEditController][" + "save success" + "]");
        }, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaEditController][" + "save failure" + "]");
        });
    }
    $scope.delete = function() {
        console.info("[TemaEditController][" + "delete?" + "]");
        if (confirm("Borrar?")) {
            Tema.delete({
                id: $scope.item.TemaID
            }, {}, function(data) {
            
                
                if(data.ok){
                    console.info("[TemaEditController][" + "delete success" + "]");
                    $state.go("clarity.tema.list");    
                }else{
                    alert("Elementos relacionados");
                    console.info("[TemaEditController] "+data.error);
                }
                
            }, function() {
                console.info("[TemaEditController][" + "delete failure" + "]");
                $state.go("clarity.tema.list");
            });
        }
    }
    //
    TemaHelper.FormValidationDefinition($scope.save, null);
    Tema.get({
        id: $state.params.id
    }, function(res) {
        console.log(res);
        $scope.item = res.data;
    });
});



angular.module("TemaHelperModule", []).factory("TemaHelper", [

    function() {
        return {
            FormValidationDefinition: function(onSuccess, onFailure) {
                $('.ui.form')
                    .form({
                        asunto: {
                            description: 'description',
                            rules: [{
                                type: 'empty',
                                prompt: 'Desripcion requerida'
                            }]
                        }
                    }, {
                        onSuccess: onSuccess,
                        onFailure: onFailure
                    });
            }
        }
    }
]);



angular.module('TemaService', ['ngResource']).
factory('Tema', ['$resource', 'AppConfig',
    function($resource, AppConfig) {
        return $resource(AppConfig.apiClarity + 'tema/:action/:id', {}, {
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