WudApp.directive('imagebox', function(){

	return {
		restrict : 'C',
		link : function(scope, element, attrs) {

			var wrapper = element[0],
				img = element.children()[0],
				imgW = 0,
				imgH = 0;			

			img.onload = function() {
				
				if(img.width > '435' && img.width > img.height) {
					img.width = '435';
				} else if(img.height > '250' && img.height > img.width) {
					img.height = '250';
				}

			}
			

		}
	} 

});