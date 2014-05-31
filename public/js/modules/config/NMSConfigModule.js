angular.module('NMSConfigModule', [

])

.factory('$NMSConfig', [
	function() {
		return {
			AppIdentifier: "AppIdentifier_NAME"
		}
	}
]);