angular.module('ClarityLoginModule', [
	"NMSAuthModule"
])


.controller('ClarityLoginController', function(

	$scope, $ClarityLogin, $state, $timeout) {
	console.info("[ClarityLoginController]");
	$scope.data = {
		loginname: "",
		password: ""
	};

	function onSuccess() {
		//CASO: auth exitoso con el servidor.
		$state.go("clarity.home");
	}

	function onFailure() {
		//CASO: Password incorrecto
		//alert("login fail!");

		$(".ui.error.message").toggle(true);
		$(".ui.form").form("add errors", ["Usuario o contraseña incorrectos"]);
		$timeout(function() {
			$(".ui.error.message").toggle(false);
		}, 5000);

	}

	$scope.trylogin = function() {
		console.info("[ClarityLoginController][" + "trylogin" + "]");
		$('.ui.form').form('validate form');
	}
	$scope.login = function() {
		console.info("[ClarityLoginController][login][(" + $scope.data.loginname + ", " + $scope.data.password + " )]");
		$ClarityLogin.login($scope.data.loginname, $scope.data.password, onSuccess, onFailure);
	};
	$scope.FormValidationDefinition = function(onSuccess, onFailure) {
		console.info("[ClarityLoginController][ui.form validations]");
		$('.ui.form')
			.form({
				loginname: {
					identifier: 'loginname',
					rules: [{
						type: 'empty',
						prompt: 'Usuario requerido'
					}]
				},
				password: {
					identifier: 'password',
					rules: [{
						type: 'empty',
						prompt: 'Contraseña requerida'
					}]
				}
			}, {
				onSuccess: onSuccess,
				onFailure: onFailure
			});
	}
	$scope.FormValidationDefinition($scope.login, function() {
		console.info("[ClarityLoginController][" + "validations failed!" + "]");
	});
})

.factory('$ClarityLogin', [
	'$resource', "AppConfig", "$rootScope", "$NMSLocalSession", "$NMSAuth",
	function($resource, AppConfig, $rootScope, $NMSLocalSession, $NMSAuth) {

		var $res = $resource(AppConfig.apiClarity + 'auth/:action/:id', {}, {
			save: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				params: {
					action: "login"
				}
			}
		});

		return {
			login: function(loginname, password, success, failure) {
				$res.save({}, {
					loginname: loginname,
					password: password
				}, function(res) {

					if (res.ok == true) {
						console.info("[ClarityLogin][Success]");

						
						$NMSLocalSession.setData(res.data);
						$NMSAuth.setToken(res.token);
						$NMSAuth.setLogged(true, res.token);
						success();

					} else {
						console.info("[ClarityLogin][Failure][But resp ok]");
						failure();
					}
					console.info("[ClarityLogin][Token]->");
					console.info(res);

				}, function() {
					console.info("[ClarityLogin][Failure]");
					failure();
				})
			}
		}
	}
]);