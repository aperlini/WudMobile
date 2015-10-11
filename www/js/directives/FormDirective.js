WudApp.directive('cancelSearch', function($timeout){

	return {
		restrict : 'C',
		link : function(scope, element, attrs) {

			element.bind('click', function(e){

				// empty input
				scope.queryterm = '';

				// hide cancel btn basic
				scope.$apply('cancelbasicbtn = true');

				// if error reset class
				scope.errorOnQuery = false;

				// focus input on cancel
				$timeout(function(){
					element.parent().find('input')[0].focus()
				}, 750);
				
			});

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

// hide boolean inputs on certain width
WudApp.directive('mobileSearchType', function($window, $rootScope) {
    return {
    	restrict : 'A',
        link: function(scope, element, attrs) {

            angular.element($window).bind('resize', function(e){

            	// $rootScope
            	

            	if($window.innerWidth < 660) {

					$rootScope.basicinput = true;
					$rootScope.booleaninput = false;
					$rootScope.linkbasicclass = true;
					$rootScope.linkbooleanclass = false;

				}

            });
        }
   };
});
