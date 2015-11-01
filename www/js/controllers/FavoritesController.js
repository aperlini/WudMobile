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

		var bodytext = '',
		    nbrFavorites = FavoritesService.getCurrentNbrFavorites(),
			favoritesList = FavoritesService.getFavoritesList();


		for(var i=0; i<favoritesList.length; i++) {
			
			bodytext += '<p>'+favoritesList[i]['title']+'</p>';
			bodytext += '<a href="'+favoritesList[i]['link']+'">Link '+favoritesList[i]['api']+'</a>';
			bodytext += '<hr/>';
		}

		$scope.submitForm = function() {

			if($scope.user.email != '') {

				$scope.submitTriggered = true;
				$scope.emailLoader = true; 

				var response = FavoritesService.sendFavorites($scope.user.email);

				response.then(function(response){

					$scope.emailLoader = false;

					if(response.msg.status == '200') {

						ModalService.setMsg('<strong>Success</strong>', '<br/>Your email was successfully sent');
						$scope.user.success = ModalService.getMsg();
						$scope.ajaxSuccess = true;
						$timeout(function(){
							popupmsg.close();
						}, 3000);
					}

				}, function(error){

					$scope.emailLoader = false;
					ModalService.setMsg(error.status, error.statusText);
					$scope.user.error = ModalService.getMsg();
					$scope.ajaxError = true;

				});

			}

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