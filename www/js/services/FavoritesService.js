WudApp.factory('FavoritesService', function(CollectionsService, $http, $q){

	var factory = { 

		favoritesArr : [],
		emailResponse : '',
 
		addFavorite : function(current) {

			// checking if any previous favorites registered in storage
			factory.favoritesArr = factory.getFavoritesList();

			factory.favoritesArr.unshift(CollectionsService.getItemById(current));
			localStorage.setItem('favorites', JSON.stringify(factory.favoritesArr));

		},

		getFavoritesList : function() {

			if(localStorage.getItem('favorites') != '' && localStorage.getItem('favorites') != null) {

				factory.favoritesArr = JSON.parse(localStorage.getItem('favorites'));

			} else {

				factory.favoritesArr = [];

			}

			return factory.favoritesArr;
		},
 
		removeFavorite : function(current) {

			factory.favoritesArr = factory.getFavoritesList();
			
			if(factory.favoritesArr.length > 0) {

				for(var i=0; i<factory.favoritesArr.length; i++) {

					var currentIndex = -1;
						
					if(factory.favoritesArr[i]['id'] === current) {

						currentIndex = i;
						factory.favoritesArr.splice(currentIndex, 1);
						localStorage.setItem('favorites', JSON.stringify(factory.favoritesArr));
						break;

					}

				}

			} else {

				return false;

			}
		},

		isFavorite : function(currentID) {

			factory.favoritesArr = factory.getFavoritesList();
			
			if(factory.favoritesArr.length > 0) {

				for(var i=0; i<factory.favoritesArr.length; i++) {

					if(factory.favoritesArr[i]['id'] == currentID) {
						return true; 
					} 

				}

			} 

			return false;
		},

		getCurrentNbrFavorites : function() {

			factory.favoritesArr = factory.getFavoritesList();

			return factory.favoritesArr.length;
		},

		resetFavoritesList : function() {

			factory.favoritesList = [];
			localStorage.clear();
		}

	};

	return factory;

}); 