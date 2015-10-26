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

		getComment : function(currentID) {

			factory.favoritesArr = factory.getFavoritesList();
			
			if(factory.favoritesArr.length > 0) {

				for(var i=0; i<factory.favoritesArr.length; i++) {

					if(factory.favoritesArr[i]['id'] == currentID) {
						
						if(factory.favoritesArr[i]['comment'] != undefined) {
							return factory.favoritesArr[i]['comment'];
						}

					} 

				}

			} 

		},

		checkCommentOnFavorites : function(currentID) {

			factory.favoritesArr = factory.getFavoritesList();
			
			if(factory.favoritesArr.length > 0) {

				for(var i=0; i<factory.favoritesArr.length; i++) {

					if(factory.favoritesArr[i]['id'] == currentID) {
						
						if(factory.favoritesArr[i]['comment'] != undefined) {
							return true;
						}

					} 

				}

			} 

			return false;
		},

		deleteComment : function(currentID) {

			factory.favoritesArr = factory.getFavoritesList();
			
			if(factory.favoritesArr.length > 0) {

				for(var i=0; i<factory.favoritesArr.length; i++) {

					if(factory.favoritesArr[i]['id'] == currentID) {
						
						if(factory.favoritesArr[i]['comment'] != undefined) {
							factory.favoritesArr[i]['comment'] = '';
							delete factory.favoritesArr[i]['comment'];
							localStorage.setItem('favorites', JSON.stringify(factory.favoritesArr));
						}

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
		},

		addCommentOnFavorite : function(params) {

			factory.favoritesArr = factory.getFavoritesList();

			if(factory.favoritesArr.length > 0) {

				for(var i=0; i<factory.favoritesArr.length; i++) {

					if(factory.favoritesArr[i]['id'] == params.id) {

						factory.favoritesArr[i]['comment'] = '';
						factory.favoritesArr[i]['comment'] = params.comment;
						localStorage.setItem('favorites', JSON.stringify(factory.favoritesArr));

					} 

				}

			} 
		},

		sendFavorites : function(email) {

			if(factory.favoritesArr.length > 0 && email != '') {

				var favorite =  localStorage.getItem('favorites');

				var url = 'http://www.unifr.ch/mh/wud/mailwudmobile/index.php';

				var deferred = $q.defer();

				$http.post(url, {data : favorite, adress : email})
					.then(function(emailResponse){
						deferred.resolve({msg : emailResponse});
					}, function(error){
						return deferred.reject(error);
					});

				return deferred.promise;

			}

		}

	};

	return factory;

}); 