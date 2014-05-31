


function SelectKeyController($scope) {
    console.log("SelectKeyController");


    sharedScopes.SelectKeyScope = $scope;
}


function ClarityAppController($scope, $rootScope) {
    $("title").html("Home | Clarity");
}


function GAppController($scope, $rootScope) {

    $("title").html("Backend | GA");

    $scope.logged = function() {
        return $rootScope.logged;
    }
    $scope.clearLogin = function() {

        setTimeout(function() {
            $scope.$apply(function() {
                $rootScope.logged = false;
            });
        }, 1000);
        console.log("clearlogin!");
        store.set("gausername", "");
        store.set("gapassword", "");
    }

}



//GA LOGIN///////////////////////////
var GaLogin = angular.module('GaLoginService', ['ngResource'])
    .factory('GaLogin', ['$resource', "AppConfig",
        function($resource, AppConfig) {
            return $resource(AppConfig.apiGAProduccion + '/login/:id', {}, {
                check: {
                    method: 'POST',
                    isArray: false
                }
            });
        }
    ]);

function GaLoginController($scope, $rootScope, GaLogin, NMSHelper, $location) {
    $scope.data = {
        username: store.get("gausername") || "",
        password: store.get("gapassword") || ""
    }

    $scope.tryLogin = function() {
        GaLogin.check({}, $scope.data, function(data) {
            store.set("gausername", $scope.data.username);
            store.set("gapassword", $scope.data.password);
            if (data.ok) {
                $rootScope.logged = true;
                NMSHelper.changeState($scope, $location, "/ga/home", 500);
            } else {
                $('.ui.error.message').fadeIn();
                $('.ui.form')
                    .form("add errors", ["Usuario o contraseña invalidos"]);
                setTimeout(function() {
                    $('.ui.error.message').fadeOut();
                }, 2000);
            }
        }, function() {
            $('.ui.error.message').fadeIn();
            $('.ui.form')
                .form("add errors", ["Problema interno. Contacte administrador."]);
            setTimeout(function() {
                $('.ui.error.message').fadeOut();
            }, 2000);
        });
    }

    $('.ui.form')
        .form({
            username: {
                identifier: 'username',
                rules: [{
                    type: 'empty',
                    prompt: 'Usuario requerido'
                }]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: 'Password requerida'
                }]
            }
        }, {
            onSuccess: function() {
                $scope.tryLogin();
            },
            onFailure: function() {
                //console.log("fail");
            }
        });


    $scope.tryLogin();
}