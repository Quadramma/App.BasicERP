angular.module('ClarityAppModule', [
	"NMSAppModule"
])


.controller('ClarityPageController', function($scope, $NMSConfig) {
	console.info("[ClarityPageController]");

	$NMSConfig.AppIdentifier = "ClarityApp";

})

.controller('ClarityMenuController', function($scope, $NMSConfig, $rootScope) {
	console.info("[ClarityMenuController]");


	$scope.closeMenu = function() {
		$('.menu.sidebar')
			.sidebar('toggle');
	}



})


.controller('ClarityHeaderController', function($scope, $rootScope) {
	console.info("[ClarityHeaderController]");

	function initSidebar() {
		$('.menu.sidebar')
			.sidebar({
				overlay: ($(window).width() < 1200)
			});
	}
	initSidebar();

	$(window).on("resize", function() {

		if ($('.menu.sidebar').sidebar("is open")) {
			$('.menu.sidebar').sidebar("hide");
		}


		initSidebar();
	})

	$scope.clickMenuButton = function() {
		$('.menu.sidebar')
			.sidebar('toggle');
	}

	if ($(window).width() > 1200) {
		//setTimeout(function() {
		$('.menu.sidebar')
			.sidebar('toggle');
		//}, 3000);
	}

	if (!$rootScope.logged) {
		$(".clarity.menu.button").toggle(false);
	}


})



.controller('ClarityHomeController', function($scope, $rootScope, $NMSLocalSession) {
	console.info("[ClarityHomeController]");

	$scope.session = $NMSLocalSession.getData();

	if ($rootScope.logged) {
		$(".clarity.menu.button").fadeIn();
	}

});