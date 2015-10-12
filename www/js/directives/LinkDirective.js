WudApp.directive('browseTo', function ($window, $sce) {
 return {
  restrict: 'C',
  controller: function ($scope) {

    $scope.openExt = function(link) {

    	var safeLink = $sce.trustAsHtml(link);

       cordova.InAppBrowser.open(safeLink, '_blank', 'location=yes'); 
       return false;

    }

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