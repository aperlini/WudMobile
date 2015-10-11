// Search
WudApp.controller('SearchCtrl', function($scope, $ionicLoading, ItemsService, CollectionsService, FavoritesService, PaginationService, OptionsService, DataEDMService, DataDPLAService, MainDataService, $timeout, $ionicScrollDelegate, $state, $ionicScrollDelegate, $stateParams, $rootScope){

  // Search term
  $scope.queryterm = '';

  // Clear search field btn
  $scope.cancelbasicbtn = true;

  // Search field 
  $scope.basicinput = true;

  // Loadmore status
  $scope.noMoreItemsAvailable = true;

  // Error no results input form
  $scope.errorOnQuery = false;

  // Favorites indicator
  if(FavoritesService.getCurrentNbrFavorites() > 0) {
    $rootScope.favoritesIndicator = FavoritesService.getCurrentNbrFavorites();
  }

  // Scroll status
  $scope.isScrollActive = false;

  $scope.getScrollState = function() {

    var positionTop = $ionicScrollDelegate.getScrollPosition().top;

    if(positionTop > 0) {

      $timeout(function(){
        $scope.isScrollActive = true;
      }); 

    } else {

      $timeout(function(){
        $scope.isScrollActive = false;
      });

    }

  };

  $scope.search = function() {
    
    // Get search term
    var currentSearch = $scope.queryterm;

    // Show cancel search field btn
    $scope.cancelbasicbtn = false;

    // Set Current search value
    ItemsService.setCurrentSearch(currentSearch);

    // Reset items count
    ItemsService.resetItemsCount();

    // Reset Collections
    CollectionsService.resetCollections();

    // Reset Pagination
    PaginationService.resetPagination();

    // Reset Options
    OptionsService.resetOptions();

    // get options values
    var optionsvalues = {
      timeline : null,
      mediatypes : null,
      languages : null
    };

    // Get timeline values
    if(OptionsService.getStatusTimeline()) {
      optionsvalues['timeline'] = OptionsService.getTimelineValues();
      // console.log(optionsvalues['timeline']);
    }

    // Get mediatypes values
    if(OptionsService.getStatusMediatypes()) {
      optionsvalues['mediatypes'] = OptionsService.getMediatypesElements();
      // console.log(optionsvalues['mediatypes']);
    }

    // Get languages values
    if(OptionsService.getStatusLanguages()) {
      optionsvalues['languages'] = OptionsService.getLanguagesElements();
      // console.log(optionsvalues['languages']);
    }

    // Set options
    OptionsService.setOptionsEDM(optionsvalues);
    OptionsService.setOptionsDPLA(optionsvalues);

    // page loader
    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner><p>Loading data</p>'
    });

    // Send request
    $scope.sendQuery();

    // scroll top
    $ionicScrollDelegate.scrollTop();

    // close keyboard after query has been sent
    // cordova.plugins.Keyboard.close();

  };

  $scope.sendQuery = function() {

    // Get current Search
    var currentQuery = ItemsService.getCurrentSearch();

    // Get current Pagination
    var pagination = PaginationService.getCurrentPagination();

    // Get current Options
    var options = OptionsService.getOptions();

    // Setting URIs
    var edmURI = DataEDMService.setQuery({
      search : currentQuery,
      pagination : pagination['edm'],
      mediatypes : options['edm']['mediatypes'],
      timeline : options['edm']['timeline'],
      languages : options['edm']['languages']
    });

    var dplaURI = DataDPLAService.setQuery({
      search : currentQuery,
      pagination : pagination['dpla'],
      mediatypes : options['dpla']['mediatypes'],
      timeline : options['dpla']['timeline'],
      languages : options['dpla']['languages'] 
    });

    // Set current request
    var response = MainDataService.setRequest({
      edm : edmURI,
      dpla : dplaURI
    });

    response.then(function(data){

      // 1) check results
      var checkedResults = MainDataService.checkResults(data);

      // 2) check collections
      var itemsCollections = MainDataService.checkCollections(checkedResults);

      // If returned collections are empty
      if(!itemsCollections) {

        // $scope.queryterm = 'empty';

        $scope.errorOnQuery = true;

        // Reset any previous collection
        CollectionsService.resetCollections();

        $scope.items = [];

        // Dismiss modal
        $ionicLoading.hide();

      } else {

        $timeout(function(){
          // Dismiss modal
          $ionicLoading.hide();
        }, 750);

        // Update current collections
        CollectionsService.updateCurrentCollections(itemsCollections);

        // Get current collections
        var currentCollection = CollectionsService.getCurrentCollections();

        var title = '',
          reformat = [];

        for(var i=0; i<currentCollection.length; i++) {

          currentCollection[i]['title'].length > 40 ? title = currentCollection[i]['title'].substring(0,40)+'...' : title = currentCollection[i]['title'];

          reformat.push({
            
            api : currentCollection[i]['api'],
            date : currentCollection[i]['date'],
            desc : currentCollection[i]['desc'],
            id : currentCollection[i]['id'],
            image : currentCollection[i]['image'],
            link : currentCollection[i]['link'],
            score : currentCollection[i]['score'],
            source : currentCollection[i]['source'],
            title : title,
            type : currentCollection[i]['type']
            
          });

        }

        // render view items list
        $scope.items = reformat;

        // console.log(reformat);

        // render view current query
        $scope.query = currentQuery;

        // render view infos
        var info = ItemsService.getInfo();

        $scope.infos = {
          items : info.items,
          total : info.total,
          edm : info.edm,
          dpla : info.dpla
        };

        // checking loadmore state
        if(MainDataService.loadMoreState) {

          $scope.noMoreItemsAvailable = false;
          $scope.$broadcast('scroll.infiniteScrollComplete');


        } else {

          $scope.noMoreItemsAvailable = true;

        }

      }

    });

  };  

  $scope.loadmore = function() {

    // Update pagination
    PaginationService.updatePagination();

    // Send request
    $scope.sendQuery();
    
  }

  $scope.initApp = function() {

    var keywords = ['syphilis', 'mélancolie', '"marie curie"', 'neurone', 'stethoscope', 'melancholy', 'sphere'],
        keyLth = keywords.length;
        item = keywords[Math.floor(Math.random()*keyLth)];

    // Set search term
    $scope.queryterm = item;

    var currentQuery = $scope.queryterm;

    $scope.cancelbasicbtn = false;

    // Set current search value
    ItemsService.setCurrentSearch(currentQuery);

    // Reset items count
    ItemsService.resetItemsCount();

    // Reset Collections
    CollectionsService.resetCollections();

    // Reset Pagination
    PaginationService.resetPagination();

    // Reset Options
    OptionsService.resetOptions();
    
    // page loader
    $ionicLoading.show({
      template: '<ion-spinner icon="ios"></ion-spinner><p>Loading data</p>'
    });

    // Send request
    $scope.sendQuery();

    // scroll top
    $ionicScrollDelegate.scrollTop();

  };

  $scope.showpanel = function(currentId) {

    $state.go('tabs.details', {id : currentId});

  };

  // Checking if refresh btn has been triggered
  $rootScope.$on('$stateChangeSuccess', function(e){
    if(OptionsService.optionSearchFired) {
      $scope.search();
      OptionsService.optionSearchFired = false;
    }
  });
  
});