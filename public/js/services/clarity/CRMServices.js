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

var CRMServices = angular.module('CRMServices', ['ngResource', 'AppConfigService'])
	.factory('CRM', ['$resource', 'AppConfig',
		function($resource, AppConfig) {
			var Contacto = $resource(AppConfig.apiClarity + 'contacto/:id', {}, CRMCrudOperations);
			var Tema = $resource(AppConfig.apiClarity + 'tema/:id', {}, CRMCrudOperations);
			var EstadoContacto = $resource(AppConfig.apiClarity + 'estadocontacto/:id', {}, CRMCrudOperations);
			var SubEstadoContacto = $resource(AppConfig.apiClarity + 'subestadocontacto/:id', {}, CRMCrudOperations);
			var TipoContacto = $resource(AppConfig.apiClarity + 'tipocontacto/:id', {}, CRMCrudOperations);
			//
			return {
				Tema : Tema,
				Contacto: Contacto,
				EstadoContacto: EstadoContacto,
				SubEstadoContacto: SubEstadoContacto,
				TipoContacto: TipoContacto
			};
		}
	]);