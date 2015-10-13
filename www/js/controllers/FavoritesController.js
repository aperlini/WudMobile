WudApp.controller('FavoritesCtrl', function($scope, $rootScope, FavoritesService, $window, $ionicPopup, $timeout, $ionicScrollDelegate){

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

	// Popup email
	$scope.showPopupEmail = function() {

		var popupmsg = $ionicPopup.show({
			template: '<input type="email">',
			title : 'Send Favorites',
			subTitle : 'Please enter your email',
			scope : $scope,
			buttons : [
				{ text : 'cancel' },
				{ 
					text : '<b>send</b>',
					type : 'button-positive',
					onTap : function(e) {
						e.preventDefault();
						this.close();
						console.log('mail service');
					}
				}
			]
		});

		

	}

	checkFavorites();

});