var NMSHelperService = angular.module('NMSHelperService', [])
    .factory('NMSHelper', [

        function(AppConfig) {
            var $self = {};
            $self.changeState = function($scope, $location, path, time) {
                setTimeout(function() {
                    $scope.$apply(function() {
                        $location.path(path);
                    });
                }, time);
            }
            return $self;
        }
    ]);