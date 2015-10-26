WudApp.directive('favoriteLinkList', function($rootScope, FavoritesService){

	return {
		restrict : 'A',
		scope : {
			sourceId : '@'
		},
		link : function(scope, elem, attrs) {

			// when favorites is triggered from detail
			$rootScope.$on('favoritesEventDetail', function(e, args){

				e.preventDefault();

				if(attrs.sourceId == args['id']) {
					
					switch(args['state']) {
						case true:
							elem.addClass('active');
							break;
						case false:
							elem.removeClass('active');
							break;
					}
				}

			});

			// when delete all favorites is triggered
			$rootScope.$on('deleteAllFavorites', function(){

				elem.removeClass('active');

			});

			attrs.$observe('sourceId', function(val){

				// favorite check on list on load
				if(FavoritesService.isFavorite(val)) {
					elem.addClass('active');
				} else {
					elem.removeClass('active');
				}

			});

			elem.bind('click', function(e){

				e.preventDefault();
				
				var isFavorited = false;

				var currentID = scope.sourceId;

				// check if current data-id is on favorites
				if(FavoritesService.isFavorite(currentID)) { 
					FavoritesService.removeFavorite(currentID);
					elem.removeClass('active');
					isFavorited = false;
				} else {
					if(FavoritesService.getCurrentNbrFavorites() < 20) {
						FavoritesService.addFavorite(currentID);
						elem.addClass('active');
						isFavorited = true;
					} else {
						alert('Too many favorites. please manage your favorites');
					}
				}

				$rootScope.$broadcast('favoritesEventList', {id : currentID, state : isFavorited});

				// update favorites count indicator
				if(FavoritesService.getCurrentNbrFavorites() > 0) {
					$rootScope.favoritesIndicator = FavoritesService.getCurrentNbrFavorites();
				} else {
					$rootScope.favoritesIndicator = '';
				}

				$rootScope.$apply();

			});
		}
		
	}

}); 

WudApp.directive('favoriteLinkDetail', function($rootScope, FavoritesService){

	return {
		restrict : 'A',
		scope : {
			sourceId : '@'
		},
		// require : 'favoriteLinkList',
		link : function(scope, elem, attrs) {
			
			// when favorites is triggered from list
			$rootScope.$on('favoritesEventList', function(e, args){

				e.preventDefault(); 

				if(attrs.sourceId == args['id']) {
					switch(args['state']) {
						case true:
						elem.children('#favorite-icon').addClass('icon-heart active');
						break;
						case false:
						elem.children('#favorite-icon').removeClass('icon-heart active');
						break;
					}
				}

			});

			// when delete all favorites is triggered
			$rootScope.$on('deleteAllFavorites', function(){

				elem.children('#favorite-icon').removeClass('icon-heart active');

			});

			attrs.$observe('sourceId', function(val){

				// favorite check on list on load
				if(FavoritesService.isFavorite(val)) {
					elem.children('#favorite-icon').addClass('icon-heart active');
				} else {
					elem.children('#favorite-icon').removeClass('icon-heart active');
				}

			});

			elem.bind('click', function(e){

				e.preventDefault();

				var isFavorited = false;

				var currentID = scope.sourceId;

				// check if current data-id is on favorites
				if(FavoritesService.isFavorite(currentID)) {
					FavoritesService.removeFavorite(currentID);
					elem.children('#favorite-icon').removeClass('icon-heart active');
					isFavorited = false;
				} else {
					if(FavoritesService.getCurrentNbrFavorites() < 20) {
						FavoritesService.addFavorite(currentID);
						elem.children('#favorite-icon').addClass('icon-heart active');
						isFavorited = true;
					} else {
						alert('Too many favorites. please manage your favorites');
					}
				}

				$rootScope.$broadcast('favoritesEventDetail', {id : currentID, state : isFavorited});
				
				// update favorites count indicator
				if(FavoritesService.getCurrentNbrFavorites() > 0) {
					$rootScope.favoritesIndicator = FavoritesService.getCurrentNbrFavorites();
				} else {
					$rootScope.favoritesIndicator = '';
				}

				$rootScope.$apply();

			});
		}
	}

});

WudApp.directive('stopEvent', function(){
	return {
		restrict : 'A',
		link : function(scope, elem, attrs) {
			elem.bind('click', function(e){
				e.stopPropagation();
			});
		}
	}
});


