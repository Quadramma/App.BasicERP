var module1 = angular.module('TemaService', ['ngResource', 'AppConfigService'])
	.factory('Tema', ['$resource', 'AppConfig',
		function($resource, AppConfig) {
			return $resource(AppConfig.apiClarity + 'tema/:id', {}, {
				query: {
					method: "GET",
					isArray: true
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
			});
		}
	]);