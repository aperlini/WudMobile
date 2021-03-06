WudApp.controller('FavoritesCtrl', function($scope, $rootScope, FavoritesService, $window, $ionicPopup, $timeout, $ionicScrollDelegate, ModalService){

	// Checking Favorites
	var checkFavorites = function() {
		$scope.favoritesList = FavoritesService.getFavoritesList();
	}

	// Favorites indicator
	if(FavoritesService.getCurrentNbrFavorites() > 0) {
	   $rootScope.favoritesIndicator = FavoritesService.getCurrentNbrFavorites();
	}

	// If favorites event occured on list item
	$rootScope.$on('favoritesEventList', function(e){

		e.preventDefault();

		checkFavorites();

	});

	// If favorites event occured on detail
	$rootScope.$on('favoritesEventDetail', function(e){

		e.preventDefault();

		checkFavorites();

	});

	// Delete favorite
	$scope.deleteFavorite = function(currentId) {

		// Remove favorite from favorites localStorage
		FavoritesService.removeFavorite(currentId);

		// Update view
		$scope.favoritesList = FavoritesService.getFavoritesList();

		// Update favorite count indicator
		$rootScope.favoritesIndicator = FavoritesService.getCurrentNbrFavorites();

		// Update favorite state on detail
		$rootScope.$broadcast('favoritesEventDetail', {id : currentId, state : false});

		// Update favorite state on list
		$rootScope.$broadcast('favoritesEventList', {id : currentId, state : false});

	}

	// Delete favorites
	$scope.deleteFavorites = function() {

		// setting an event to remove active class on list and detail favorite icon
		$rootScope.$broadcast('deleteAllFavorites');

		$rootScope.hasFavorites = false;

		// Deleting all favorites in localstorage
		FavoritesService.resetFavoritesList();

		// Update view
		$scope.favoritesList = FavoritesService.getFavoritesList();

		// update favorites count indicator
		if(FavoritesService.getCurrentNbrFavorites() > 0) {
			$rootScope.favoritesIndicator = FavoritesService.getCurrentNbrFavorites();
		} else {
			$rootScope.favoritesIndicator = '';
		} 

		// scroll top
	    $timeout(function(){
	      $ionicScrollDelegate.scrollTop();
	    }, 400);
	}

	$scope.openMailApp = function() {

		var bodytext = '<strong>Favorites found and sent with WudMobile, a cultural curation app & website developed by the Medicine and Society chair at the University of Fribourg. </strong>',
		    nbrFavorites = FavoritesService.getCurrentNbrFavorites(),
			favoritesList = FavoritesService.getFavoritesList();


		for(var i=0; i<favoritesList.length; i++) {
			
			bodytext += '<hr/>';
			bodytext += '<p>'+favoritesList[i]['title']+'</p>';
			bodytext += '<a href="'+favoritesList[i]['link']+'">'+favoritesList[i]['link']+'</a>';
			
		}

		window.plugin.email.open({
                to:          [], 
                cc:          [], 
                bcc:         [], 
                attachments: [],
                subject:    "Favorites WudMobile", 
                body:       bodytext, 
                isHtml:    true, 
            }, function () {
                console.log('email view dismissed');
            },
            this);    
	}

	checkFavorites();

});