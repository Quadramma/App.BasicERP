//ContactoNode
///Controllers: 
///-ContactoItemsController
///-ContactoCreateController
///-ContactoEditController

angular.module('ContactoNode', [
    "ContactoService",
    "ContactoHelperModule",
    "FrontEndHelperService",
    "EstadoContactoService",
    "EmpresaService",
    "NovedadService"
])



.controller('ContactoLayoutController', function($scope) {
    console.info("[ContactoLayoutController]");
    //window.history.pushState({}, "Contacto","Contacto");
    $("title").html("Contacto | Clarity");
})

.controller('ContactoItemsController', function($scope, $FEHelper

    , EstadoContacto, Empresa, $rootScope, Contacto, $timeout) {
    console.info("[ContactoItemsController]");

    //
    $scope.filtro = {
        EmpresaID: -1,
        EstadoContactoID: -1,
        ComienzoDesde: "",
        ComienzoHasta: ""
    }
    //
    //EmpresaDropdown----------------
    $FEHelper.bindDropdown({
        selector: "#empresaDropdown",
        apiService: Empresa,
        itemsPerPage: 1000,
        pageNumber: 1,
        waitFor: "ItemsGet",
        $remoteScope: $scope,
        fieldID: "EmpresaID",
        semanticUIInitDelay: 2000,
        autoBindItem: false, //works for altamodi
        onQuerySuccess: function(res) {
            $scope.empresas = res.data.Items;
        },
        onQueryFailure: function() {},
        onInit: function() {
            return $scope.filtro.EmpresaID;
        },
        onChange: function(val) {
            $scope.filtro.EmpresaID = val;
            console.info($scope.filtro);
            $scope.sync();
        }
    });
    //
    //EstadoDropdown----------------
    $FEHelper.bindDropdown({
        selector: "#estadoContactoDropdown",
        apiService: EstadoContacto,
        itemsPerPage: 1000,
        pageNumber: 1,
        waitFor: "ItemsGet",
        $remoteScope: $scope,
        fieldID: "EstadoContactoID",
        semanticUIInitDelay: 1000,
        autoBindItem: false, //works for altamodi
        onQuerySuccess: function(res) {
            $scope.estados = res.data.Items;
        },
        onQueryFailure: function() {},
        onInit: function() {
            return $scope.filtro.EstadoContactoID;
        },
        onChange: function(val) {
            $scope.filtro.EstadoContactoID = val;
            console.info($scope.filtro);
            $scope.sync();
        }
    });
    //
    //F. Agenda Desde
    $FEHelper.bindDtp({
        $item: $scope.item,
        selector: "#fechaAgendaDesde",
        autoBindItem: false, //itemField: "Comienzo",
        defaultValue: null,
        onChange: function(val) {
            $scope.filtro.ComienzoDesde = val;
            $scope.sync();
        }
    });
    //
    //F. Agenda Hasta
    $FEHelper.bindDtp({
        $item: $scope.item,
        selector: "#fechaAgendaHasta",
        autoBindItem: false, //itemField: "Comienzo",
        defaultValue: null,
        onChange: function(val) {
            $scope.filtro.ComienzoHasta = val;
            $scope.sync();
        }
    });

    function formatDate(date) {
        if (date != "") {
            return moment(date, "DD/MM/YYYY").format("MM/DD/YYYY")
        }
        return date;
    }

    $scope.sync = function() {
        Contacto.query({
            pageNumber: 1,
            itemsPerPage: 100,
            EstadoContactoID: $scope.filtro.EstadoContactoID,
            EmpresaID: $scope.filtro.EmpresaID,
            ComienzoDesde: formatDate($scope.filtro.ComienzoDesde),
            ComienzoHasta: formatDate($scope.filtro.ComienzoHasta)
        }, function(res) { //res -> data (page)

            _.each(res.data.Items, function(item) {
                
                item.Comienzo = moment(new Date(item.Comienzo)).format("DD/MM/YYYY");
                //console.log(new Date(item.Comienzo));
            });

            $scope.items = res.data.Items;
            $scope.$emit("ItemsGet");
        });
    }
    $scope.sync();
})



.controller('ContactoCreateController', function($scope, $state, ContactoHelper

    , $FEHelper, $rootScope, Contacto, $timeout) {
    console.info("[ContactoCreateController]");
    $scope.trysave = function() {
        console.info("[ContactoCreateController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {
        console.info("[ContactoCreateController][" + "validaciones ok" + "]");

        //CABLEADO: POR AHORA
        $scope.item.GrupoID = 1;

        Contacto.save({}, $scope.item, function(data) {
            $state.go("clarity.contacto.list");
            console.info("[ContactoCreateController][" + "save success" + "]");
        }, function(data) {
            $state.go("clarity.contacto.list");
            console.info("[ContactoCreateController][" + "save failure" + "]");
        });

    }
    //

    ContactoHelper.FormValidationDefinition($scope.save, null);
})



.controller('ContactoEditController', function($scope, $FEHelper

    , $state, $rootScope, Contacto, EstadoContacto, Novedad

    , ContactoHelper, $timeout, Tema) {
    console.info("[ContactoEditController]");
    $scope.trysave = function() {
        console.info("[ContactoEditController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {

        //FORMAT DATES FOR WEBAPI/SQL SERVER
        $scope.item.Comienzo = moment($scope.item.Comienzo, "DD/MM/YYYY").format("YYYY/MM/DD")



        console.info("[ContactoEditController][" + "validaciones ok" + "]");
        Contacto.save({}, $scope.item, function(data) {
            $state.go("clarity.contacto.list");
            console.info("[ContactoEditController][" + "save success" + "]");
        }, function(data) {
            $state.go("clarity.contacto.list");
            console.info("[ContactoEditController][" + "save failure" + "]");
        });
    }
    $scope.delete = function() {
        console.info("[ContactoEditController][" + "delete?" + "]");
        if (confirm("Borrar?")) {
            Contacto.delete({
                id: $scope.item.ContactoID
            }, {}, function() {
                console.info("[ContactoEditController][" + "delete success" + "]");
                $state.go("clarity.contacto.list");
            }, function() {
                console.info("[ContactoEditController][" + "delete failure" + "]");
                $state.go("clarity.contacto.list");
            });
        }
    }
    //
    ContactoHelper.FormValidationDefinition($scope.save, function() {});


    //TemaDropdown----------------
    $FEHelper.bindDropdown({
        selector: "#temaDropdown",
        apiService: Tema,
        itemsPerPage: 1000,
        pageNumber: 1,
        $remoteScope: $scope,
        waitFor: "ItemGet",
        fieldID: "TemaID",
        semanticUIInitDelay: 1000,
        autoBindItem: true,
        onQuerySuccess: function(res) {
            $scope.temas = res.data.Items;
        },
        onQueryFailure: function() {}
    });
    //EstadoDropdown----------------
    $FEHelper.bindDropdown({
        selector: "#estadoContactoDropdown",
        apiService: EstadoContacto,
        itemsPerPage: 1000,
        pageNumber: 1,
        $remoteScope: $scope,
        waitFor: "ItemGet",
        fieldID: "EstadoContactoID",
        semanticUIInitDelay: 1000,
        autoBindItem: true,
        onQuerySuccess: function(res) {
            $scope.estados = res.data.Items;
        },
        onQueryFailure: function() {}
    });


    //
    $scope.syncNovedades = function() {
        Novedad.query({
            pageNumber: 1,
            itemsPerPage: 100,
            ContactoID: $scope.item.ContactoID
        }, function(res) { //res -> data (page)


            var items = res.data.Items;
            _.each(items, function(item) {
                item.Fecha = moment((new Date(item.Fecha)).getTime()).format("DD/MM/YYYY");
            });
            $scope.novedades = items;

            $scope.$emit("NovedadesGet");
        });
    }



    Contacto.get({
        id: $state.params.id
    }, function(res) {
        //console.log(res);
        $scope.item = res.data[0];


        $scope.syncNovedades();

        $FEHelper.bindDtp({
            selector: "#fechaAgenda",
            defaultValue: $scope.item.Comienzo,
            onChange: function(val) {
                $scope.item.Comienzo = val;
            }
        });

        $scope.$emit("ItemGet");
    });
});



angular.module("ContactoHelperModule", []).factory("ContactoHelper", [

    function() {
        return {
            FormValidationDefinition: function(onSuccess, onFailure) {
                $('.ui.form')
                    .form({
                        asunto: {
                            identifier: 'asunto',
                            rules: [{
                                type: 'empty',
                                prompt: 'Asunto requerido'
                            }]
                        },
                        proximaccion: {
                            identifier: 'proximaccion',
                            rules: [{
                                type: 'empty',
                                prompt: 'Proxima Accion requerida'
                            }]
                        },
                        estadoContactoDropdown: {
                            identifier: 'estadoContactoDropdown',
                            rules: [{
                                type: 'empty',
                                prompt: 'Estado de contacto requerido'
                            }]
                        },
                        fechaAgenda: {
                            identifier: 'fechaAgenda',
                            rules: [{
                                type: 'empty',
                                prompt: 'Fecha Agenda requerida'
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


angular.module('ContactoService', ['ngResource']).factory('Contacto', ['$resource', 'AppConfig',
    function($resource, AppConfig) {
        return $resource(AppConfig.apiClarity + 'contacto/:action/:id', {}, {
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
                    action: "put"
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

angular.module('EstadoContactoService', ['ngResource']).factory('EstadoContacto', ['$resource', 'AppConfig',
    function($resource, AppConfig) {
        return $resource(AppConfig.apiClarity + 'estadocontacto/:id', {}, {
            query: {
                method: "GET",
                isArray: false
            },
            get: {
                method: "GET",
                isArray: false
            },
            update: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            delete: {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            save: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });
    }
]);