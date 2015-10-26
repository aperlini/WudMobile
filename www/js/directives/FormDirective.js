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

				console.log('focus set');

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

WudApp.directive('cancelBooleanFirst', function(){

	return {
		restrict : 'C',
		link : function(scope, element, attrs) {

			element.bind('click', function(e){

				// empty input
				scope.booleanquery.first = '';

				// hide cancel btn boolean first
				scope.$apply('cancelfirstbtn = true');

				// set focus on form
				element.parent().find('input')[0].focus();

			});

		}
 
	}

});

WudApp.directive('cancelBooleanSecond', function(){

	return {
		restrict : 'C',
		link : function(scope, element, attrs) {

			element.bind('click', function(e){

				// empty input
				scope.booleanquery.second = '';

				// hide cancel btn boolean second
				scope.$apply('cancelsecondbtn = true');

				// set focus on form
				element.parent().find('input')[0].focus();

			});

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

