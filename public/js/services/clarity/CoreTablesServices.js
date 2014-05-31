var CRMCrudOperations = {
	query: {
		method: "GET",
		isArray: false
	},
	get: {
		method: "GET",
		isArray: true
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
};

var CRMServices = angular.module('CoreTablesServices', ['ngResource', 'AppConfigService'])
	.factory('CTS', ['$resource', 'AppConfig',
		function($resource, AppConfig) {
			var Empresa = $resource(AppConfig.apiClarity + 'empresa/:id', {}, CRMCrudOperations);
			var Grupo = $resource(AppConfig.apiClarity + 'grupo/:id', {}, CRMCrudOperations);
			var Cuenta = $resource(AppConfig.apiClarity + 'cuenta/:id', {}, CRMCrudOperations);
			var Usuario = $resource(AppConfig.apiClarity + 'usuario/:id', {}, CRMCrudOperations);
			//
			return {
				Empresa: Empresa,
				Grupo: Grupo,
				Cuenta: Cuenta,
				Usuario: Usuario
			};
		}
	]);