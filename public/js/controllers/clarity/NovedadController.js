angular.module('NovedadNode', [
    "NovedadService",
    "NovedadHelperModule",
    "EmpresaService",
    "ContactoService",
])


.controller('NovedadLayoutController', function($scope) {
    console.info("[NovedadLayoutController]");
    //window.history.pushState({}, "Contacto","Contacto");
    $("title").html("Novedad | Clarity");
})

.controller('NovedadItemsController', function($scope, $rootScope, Novedad, $timeout) {
    console.info("[NovedadItemsController]");
    Novedad.query({
        pageNumber: 1,
        itemsPerPage: 100
    }, function(res) { //res -> data (page)
        var items =  res.data.Items;
        _.each(items,function(item){
            item.Fecha = moment((new Date(item.Fecha)).getTime()).format("DD/MM/YYYY");
        });
        $scope.items = items;
    });
})

.controller('NovedadCreateController', function($scope, $state, $rootScope

    , $FEHelper, Contacto, Empresa, Novedad, NovedadHelper, $timeout) {
    console.info("[NovedadCreateController]");
    $scope.trysave = function() {
        console.info("[NovedadCreateController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {
        console.info("[NovedadCreateController][" + "validaciones ok" + "]");

        //console.info($scope.item);
        //return;

        Novedad.save({}, $scope.item, function(data) {
            $state.go("clarity.contacto.edit", {
                id: $scope.item.ContactoID
            });
            console.info("[NovedadCreateController][" + "save success" + "]");
        }, function(data) {
            $state.go("clarity.contacto.edit", {
                id: $scope.item.ContactoID
            });
            console.info("[NovedadCreateController][" + "save failure" + "]");
        });

    }

    $scope.subAbmCancel = function() {
        $state.go("clarity.contacto.edit", {
            id: $state.params.ContactoID
        })
    };

    function injectEmpresa() {
        Empresa.get({
            id: $scope.item.EmpresaID
        }, function(res) {
            var item = res.data; //RazonSocial
            $scope.item.EmpresaRazonSocial = item.RazonSocial;
        });
    }

    function injectContacto() {
        Contacto.get({
            id: $scope.item.ContactoID
        }, function(res) {
            var item = res.data[0];
            $scope.item.ContactoAsunto = item.Asunto;
            $scope.item.EmpresaID = item.EmpresaID;
            injectEmpresa();
        });
    }

    //console.info($state.params);
    $scope.item = {
        NovedadID: 0,
        ContactoID: $state.params.ContactoID,
        Asunto: "",
        Observacion: "",
        FechaAlta: moment().format("YYYY/MM/DD"),
        FechaModi: moment().format("YYYY/MM/DD"),
        Fecha: moment().format("YYYY/MM/DD"),
        UsuarioAlta: "CLARITY-MOBILE",
        UsuarioModi: "CLARITY-MOBILE",
    };


    $scope.item.ContactoID = $state.params.ContactoID;
    injectContacto();

    $FEHelper.bindDtp({
        selector: "#Fecha",
        defaultValue: $scope.item.Fecha,
        onChange: function(val) {
            $scope.item.Fecha = moment(val, "DD/MM/YYYY").format("YYYY/MM/DD");
        }
    });


    //
    NovedadHelper.FormValidationDefinition($scope.save, function() {});
})

.controller('NovedadEditController', function($scope, $state

    , $FEHelper, Empresa, Contacto, $rootScope, Novedad, NovedadHelper, $timeout) {
    console.info("[NovedadEditController]");
    $scope.trysave = function() {
        console.info("[NovedadEditController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {
        console.info("[NovedadEditController][" + "validaciones ok" + "]");
        beforeSave();
        Novedad.save({}, $scope.item, function(data) {
            //$state.go("clarity.novedad.items");
            $state.go("clarity.contacto.edit", {
                id: $scope.item.ContactoID
            });
            console.info("[NovedadEditController][" + "save success" + "]");
        }, function(data) {
            //$state.go("clarity.novedad.items");
            $state.go("clarity.contacto.edit", {
                id: $scope.item.ContactoID
            });
            console.info("[NovedadEditController][" + "save failure" + "]");
        });
    }
    $scope.delete = function() {
        console.info("[NovedadEditController][" + "delete?" + "]");
        if (confirm("Borrar?")) {
            Novedad.delete({
                id: $scope.item.NovedadID
            }, {}, function() {
                console.info("[NovedadEditController][" + "delete success" + "]");
                //$state.go("clarity.novedad.items");
                $state.go("clarity.contacto.edit", {
                    id: $scope.item.ContactoID
                });
            }, function() {
                console.info("[NovedadEditController][" + "delete failure" + "]");
                //$state.go("clarity.novedad.items");
                $state.go("clarity.contacto.edit", {
                    id: $scope.item.ContactoID
                });
            });
        }
    }
    //
    function beforeSave(){
        $scope.item.UsuarioModi = "CLARITY-MOBILE";
    }
    //sub abm
    $scope.subAbmCancel = function() {
        $state.go("clarity.contacto.edit", {
            id: $scope.item.ContactoID
        })
    };
    //
    function injectEmpresa() {
        Empresa.get({
            id: $scope.item.EmpresaID
        }, function(res) {
            var item = res.data; //RazonSocial
            $scope.item.EmpresaRazonSocial = item.RazonSocial;
        });
    }

    function injectContacto() {
        Contacto.get({
            id: $scope.item.ContactoID
        }, function(res) {
            var item = res.data[0];
            $scope.item.ContactoAsunto = item.Asunto;
            $scope.item.EmpresaID = item.EmpresaID;
            injectEmpresa();
        });
    }
    //

    //
    NovedadHelper.FormValidationDefinition($scope.save, null);
    Novedad.get({
        id: $state.params.id
    }, function(res) {
        //console.log(res);
        $scope.item = res.data[0];

        $FEHelper.bindDtp({
            $item: $scope.item,
            selector: "#Fecha",
            itemField: "Fecha",
            autoBindItem: true,
            defaultValue: $scope.item.Fecha,
            onChange: function(val) {
                $scope.item.Fecha = moment(val, "DD/MM/YYYY").format("YYYY/MM/DD");
                $scope.item.FechaModi = moment().format("YYYY/MM/DD");
            }
        });


        injectContacto();
    });
});



angular.module("NovedadHelperModule", []).factory("NovedadHelper", [

    function() {
        return {
            FormValidationDefinition: function(onSuccess, onFailure) {
                console.info("[NovedadHelper][ui.form validations]");
                $('.ui.form')
                    .form({
                        Asunto: {
                            identifier: 'Asunto',
                            rules: [{
                                type: 'empty',
                                prompt: 'Asunto requerido'
                            }]
                        },
                        Observacion: {
                            identifier: 'Observacion',
                            rules: [{
                                type: 'empty',
                                prompt: 'Observacion requerida'
                            }]
                        },
                        Fecha: {
                            identifier: 'Fecha',
                            rules: [{
                                type: 'empty',
                                prompt: 'Fecha requerida'
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