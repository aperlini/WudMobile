WudApp.directive('browseTo', function ($window, $sce) {
 return {
  restrict: 'C',
  controller: function ($scope) {

    $scope.openExt = function(link) {

    	var safeLink = $sce.trustAsHtml(link);

       $window.open(safeLink, '_blank'); 
       return false;

    }

  }
 }
});

// hidding unifr logo on back button
WudApp.directive('isBackButton', function($rootScope){

	return {
		restrict: 'C',
		controller : function($scope) {


			// $rootScope.$on('$ionicView.beforeEnter', function (e, data) { 
			// 	if (data.enableBack) {
			// 		$rootScope.isBackButton = data.enableBack;
			// 	} else {

			// 		$rootScope.isBackButton = false;
					
			// 	}
			// });
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