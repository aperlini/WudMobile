WudApp.directive('cancelSearch', function($timeout, $rootScope){

	return {
		restrict : 'C',
		controller : function($scope, $element) {
			
			$scope.cancelSearch = function() {
				$rootScope.$broadcast('onError');

				$scope.errorClass = false;
			}

		}
 
	}

});

WudApp.directive('searchInput', function($timeout, $rootScope, $parse){

	return {
		restrict : 'C',
		controller : function($scope, $element) {

			$scope.setFocus = function() {

				if($scope.errorClass) {

					$scope.errorClass = false;

				}

			}

			$rootScope.$on('onError', function(){

				// empty input
				$scope.queryterm = '';
 
				// hide cancel btn basic
				$scope.cancelbasicbtn = true;

				// if error reset class
				$scope.errorOnQuery = false;

				// focus input on cancel
				$timeout(function(){
					$element[0].focus();
				});

			});

		}
	}

});

WudApp.directive('focusInput', function($timeout){

	return {
		restrict : 'C',
		link : function(scope, element, attrs) {

			// focus input on cancel
			$timeout(function(){
				element[0].focus()
			}, 750);

		}
	}

});

WudApp.directive('noLink', function() {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});
