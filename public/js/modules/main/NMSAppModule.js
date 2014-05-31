angular.module('NMSAppModule', [
	"NMSConfigModule",
	"NMSAuthModule"
])


.controller('NMSAppController', function($scope, $NMSConfig, $rootScope) {
	console.info("[NMSAppController]");

	$(".ng-scope").css("max-height", $("window").height());
	$(".ng-scope").css("overflow-y", "auto");

	$NMSConfig.AppIdentifier = "NMS_DEFAULT_APP_IDENTIFIER";

	//ALWAYS START LOGGED FALSE
	$rootScope.logged = false;

})

.controller('NMSPageController', function($scope, $NMSConfig) {
	console.info("[NMSPageController]");
	/*
	_nms.page = {};
	smokesignals.convert(_nms.page);
	//EVENTS
	$(".nms.page").on("keypress", function(e) {
		if (e.which == 13) {
			var $focused = $(":focus");
			$focused.blur();
			_nms.page.emit("enterPress", {
				element: $focused
			});
		}
	})
*/
});