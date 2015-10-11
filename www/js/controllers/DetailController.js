WudApp.controller('DetailCtrl', function($scope, $stateParams, CollectionsService, DataEDMService){

  // clear europeana detail if set
  $scope.edmdetails = {};

  $scope.isdescription = true; 
  $scope.isdate = true;

  // Get detail from Collections
  var detailItem = CollectionsService.getItemById($stateParams.id);

  $scope.detail = {};

  // id
  if(detailItem.hasOwnProperty('id')) {

    $scope.detail.id = detailItem['id'];

  }

  // title
  if(detailItem.hasOwnProperty('title')) {

    $scope.detail.title = detailItem['title'];

  }

  // description
  if(detailItem.hasOwnProperty('desc')) {

    $scope.detail.description = detailItem['desc'];
    $scope.isdescription = false;

  }

  // date
  if(detailItem.hasOwnProperty('date')) {

    if(detailItem['date'] != '') {

      $scope.detail.date = detailItem['date'];
      $scope.isdate = false;

    }
    
  }

  // source
  if(detailItem.hasOwnProperty('source')) {

    if(detailItem['source'] != '') {

      $scope.detail.source = detailItem['source'];

    } else {

      $scope.detail.source = '#';
      $scope.issource = false;

    }
    
  }

  // api
  var apiType = '';

    if(detailItem.hasOwnProperty('api')) {

      switch(detailItem['api']) {

        case 'edm':
        apiType = 'Europeana Link';
        $scope.loadmoredetail = false;
        break;

        case 'dpla':
        apiType = 'DPLA Link';
        $scope.loadmoredetail = true;
        break;

      }
      
    }

    $scope.detail.api = apiType;

    // link
    $scope.detail.link = detailItem['link'];

    // image
    $scope.detail.image = '';
    $scope.detail.image = detailItem.image;

    // load more btn detail
    $scope.spinnerdetail = true;
    $scope.loaderDetailLabel = true;

    $scope.loadDetail = function(id) {

      $scope.spinnerdetail = false;
      $scope.loaderDetailLabel = false;

      var response = DataEDMService.queryDetail(id);

      response.then(function(data){

        // format europeana detail
        var detailEDM = DataEDMService.getMoreDetailOnItem(data);

        $scope.edmdetails = detailEDM;

        // load more detail state
        $scope.spinnerdetail = true;
        $scope.loaderDetailLabel = true;
        $scope.loadmoredetail = true;

      });

    } 

});