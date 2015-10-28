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

		// heading (first block)
		var bodytext = '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
			bodytext += '<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, width=device-width"></head><body>';
			bodytext += '<div class="block"><table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader">';
			bodytext += '<tbody><tr><td width="100%"><table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">';
			bodytext += '<tbody><tr><td width="100%" height="5"></td></tr><tr><td align="right" valign="middle" style="font-family: Helvetica, arial, sans-serif; font-size: 10px;color: #999999" st-content="preheader"></td></tr>';
			bodytext += '<tr><td width="100%" height="5"></td></tr></tbody></table></td></tr></tbody></table></div>';

			// Logo + Title (second block)
			bodytext += '<div class="block"><table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="header">';
			bodytext += '<tbody><tr><td><table width="580" bgcolor="#25313e" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth" hlitebg="edit" shadow="edit">';
			bodytext += '<tbody><tr><td><table width="70" cellpadding="0" cellspacing="0" border="0" align="left" class="devicewidth">';
			bodytext += '<tbody><tr><td valign="middle" width="70" style="padding: 10px 0 10px 20px;" class="logo">';
			bodytext += '<div class="imgpop"><img src="http://www.unifr.ch/mh/wud/img/logo/uni-fr.png" alt="logo" width="28" height="28" border="0" style="display:block; border:none; outline:none; text-decoration:none;" st-image="edit" class="logo"></a>';
			bodytext += '</div></td></tr></tbody></table><table width="510" cellpadding="0" cellspacing="0" border="0" align="right" class="devicewidth">';
			bodytext += '<tbody><tr><td width="510" valign="middle" style="font-family: Open sans, Arial, sans-serif;font-size: 14px; color: #ffffff;line-height: 31px; padding: 10px 0; letter-spacing:0.1em;" align="right" class="menu" st-content="menu">';
			bodytext += 'WUDMOBILE</td><td width="20"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>';

			// BG img + Favorites title (third block)
			bodytext += '<div class="block"><table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="bigimage">';
			bodytext += '<tbody><tr><td><table bgcolor="#ffffff" width="580" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth" modulebg="edit">';
			bodytext += '<tbody><tr><td><table width="580" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidthinner">';
			bodytext += '<tbody><tr><td align="center"><a target="_blank" href="#"><img width="580" border="0" alt="" style="display:block; border:none; outline:none; text-decoration:none;" src="http://www.unifr.ch/mh/wud/img/bg/grid-bg-1920.jpg" class="bigimage"></a>';
			bodytext += '</td></tr></tbody></table><table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="header">';
			bodytext += '<tbody><tr><td><table width="580" bgcolor="#25313e" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth" hlitebg="edit" shadow="edit">';
			bodytext += '<tbody><tr><td><table width="580" cellpadding="0" cellspacing="0" border="0" align="right" class="devicewidth">';
			bodytext += '<tbody><tr><td width="580" valign="middle" style="font-family: Open sans, Arial, sans-serif;font-size: 12px; color: #ffffff;line-height: 14px; padding: 10px 0 10px 20px; letter-spacing:0.1em;" align="left" class="menu" st-content="menu">';
			bodytext += 'Favorites</td><td width="20"></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>';

			// start loop
			var nbrFavorites = FavoritesService.getCurrentNbrFavorites(),
				favoritesList = FavoritesService.getFavoritesList();

			for(var i=0; i<favoritesList.length; i++) {

				bodytext += '<div class="block"><table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="left-image">';
				bodytext += '<tbody><tr><td><table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">';
				bodytext += '<tbody><tr><td width="100%"><table bgcolor="#ffffff" width="560" cellpadding="10" cellspacing="0" border="0" align="center" class="devicewidth">';
				bodytext += '<tbody><tr><td><table width="560" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">';
				bodytext += '<tbody><tr><td><table width="200" align="left" border="0" cellpadding="10" cellspacing="0" class="devicewidth">';
				bodytext += '<tbody><tr><td width="200" align="center" class="devicewidth">';
				bodytext += '<img src="'+favoritesList[i]['image']+'" alt="" border="0" style="max-width:200px;" style="display:block; border:none; outline:none; text-decoration:none;" class="col2img">';
				bodytext += '</td></tr></tbody></table>';

				bodytext += '<table width="340" align="right" border="0" cellpadding="10" cellspacing="0" class="devicewidthmob">';
				bodytext += '<tbody>';

				bodytext += '<tr><td style="font-family: Helvetica, arial, sans-serif; font-size: 12px; color: #525252; text-align:left; line-height: 20px;" class="padding-right15">';
				bodytext += favoritesList[i]['title']+'</td></tr>';
				bodytext += '<tr><td><table height="30" align="left" valign="middle" border="0" cellpadding="0" cellspacing="0" class="tablet-button" st-button="edit">';
				bodytext += '<tbody><tr><td width="auto" align="center" valign="middle" height="30" style=" background-color:#0db9ea; border-top-left-radius:4px; border-bottom-left-radius:4px;border-top-right-radius:4px; border-bottom-right-radius:4px; background-clip: padding-box;font-size:13px; font-family:Helvetica, arial, sans-serif; text-align:center;  color:#ffffff; font-weight: 300; padding-left:18px; padding-right:18px;">';
				bodytext += '<span style="color: #ffffff; font-weight: 300;">';
				bodytext += '<a style="color: #ffffff; text-align:center;text-decoration: none;" href="'+favoritesList[i]['link']+'">Link '+favoritesList[i]['api']+'</a></span></td>';
				bodytext += '<td width="5" bgcolor="#fff" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>';
				bodytext += '<td width="auto" align="center" valign="middle" height="30" style=" background-color:#0db9ea; border-top-left-radius:4px; border-bottom-left-radius:4px;border-top-right-radius:4px; border-bottom-right-radius:4px; background-clip: padding-box;font-size:13px; font-family:Helvetica, arial, sans-serif; text-align:center;  color:#ffffff; font-weight: 300; padding-left:18px; padding-right:18px;">';
				bodytext += '<span style="color: #ffffff; font-weight: 300;">';
				bodytext += '<a style="color: #ffffff; text-align:center;text-decoration: none;" href="'+favoritesList[i]['source']+'">Source</a></span></td>';
				bodytext += '</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>';

				bodytext += '<table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="left-image">';
				bodytext += '<tbody><tr><td><table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">';
				bodytext += '<tbody><tr><td height="1" bgcolor="#7B7B7B" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>';
				bodytext += '</tr></tbody></table></td></tr></tbody></table></div>';


			}	

			// end loop
			bodytext += '<div class="block"><table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="right-image">';
			bodytext += '<tbody><tr><td><table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"><tbody><tr><td width="100%">';
			bodytext += '<table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"><tbody><tr><td><table width="280" height="140" align="right" border="0" cellpadding="0" cellspacing="0" class="devicewidth">';
			bodytext += '<tbody><tr><td width="280" height="140" align="center" class="devicewidth"></td></tr></tbody></table>';
			bodytext += '<table align="left" border="0" cellpadding="0" cellspacing="0" class="mobilespacing"><tbody><tr><td width="100%" height="15" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>';
			bodytext += '</tr></tbody></table><table width="280" align="left" border="0" cellpadding="0" cellspacing="0" class="devicewidth"><tbody><tr><td>';
			bodytext += '<table width="280" align="center" border="0" cellpadding="0" cellspacing="0" class="devicewidth"><tbody><tr><td width="100%" height="15" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>';
			bodytext += '<tr><td width="100%" height="15" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td></tr></tbody></table>';
			bodytext += '</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div>';

			bodytext += '</body></html>';

		window.plugin.email.open({
                to:          [], 
                cc:          Array, 
                bcc:         Array, 
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