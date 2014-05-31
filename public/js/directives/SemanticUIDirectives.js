SemanticUIAppDirectives = angular.module('SemanticUIDirectives', [])
	.directive('nmsdropdown', ["$timeout",
		function(timer) {

			return {
				//templateUrl: 'views/controls/nms.dropdown.html',
				link: function(scope, elem, attrs, ctrl) {
					var hello = function() {
						//var $elem  = $("#"+elem[0].id);
						//console.log($elem.html());
					}
					timer(hello, 0);
				},
				transclude: true
			}

		}
	]);