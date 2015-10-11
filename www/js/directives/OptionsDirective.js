WudApp.directive('optionTimeline', function(OptionsService, $rootScope){

	return {
		restrict : 'A',
		controller : function($scope) {


			$scope.$watchGroup(['priceSlider.min', 'priceSlider.max'], function(val) {

				OptionsService.setTimeline(val);

				$scope.$broadcast('optionTriggered');
 
			});

		}
	}

});

// Mediatypes
WudApp.directive('optionMediatypes', function(OptionsService, $rootScope){

	return {
		restrict : 'A',
		controller : function($scope, $filter) {

			$rootScope.mediatypes = false;

			$scope.mediaparams = OptionsService.getMediatypesElements();

			$scope.$watch('mediaparams', function(n,o){

				var trues = $filter("filter")(n, {state : true});
				
				if(trues.length > 0) {
					OptionsService.setMediatypesStatus(true);

					$rootScope.mediatypes = true;
					
				} else {
					OptionsService.setMediatypesStatus(false);

					$rootScope.mediatypes = false;

				}

				$scope.$broadcast('optionTriggered');

			}, true);

			$scope.activeButtonMedia = function(item){
			    
			  item.state = !item.state;
			    
			};

		}
	}

});

// Languages
WudApp.directive('optionLanguages', function(OptionsService, $rootScope){

	return {
		restrict : 'A',
		controller : function($scope, $filter) {
    
			$scope.langparams = OptionsService.getLanguagesElements();

			$scope.setRadioModelStatus = function(current) {

				OptionsService.setLanguagesState(current);

				$scope.$broadcast('optionTriggered');
			}

			$scope.activeButtonLang = function(item) {

			  for(var i=0; i < $scope.langparams.length; i++) {

			    $scope.langparams[i].state = false;

			    if(item.title == $scope.langparams[i].title) {

			      $scope.langparams[i].state = true;

			    } 
			  }

			}

		}
	}

});

WudApp.directive('optionActions', function(OptionsService, $rootScope, $state){

	return {
		restrict : 'A',
		controller : function($scope) {
			$scope.initOptions = function() {
			    $rootScope.isOptionActive = false;
			    $scope.priceSlider = OptionsService.resetTimeline();
			    OptionsService.resetMediatypesElements();
			    OptionsService.resetLanguagesState();
			    
		    }

		    // Trigger search
			$scope.search = function() {
				OptionsService.optionSearchFired = true;
				$state.go('tabs.results');
			}
		}

	}

});

WudApp.directive('optionsStatus', function(OptionsService, $rootScope, $sce){

	return {
		restrict : 'A',
		controller : function($scope) {

			$scope.$on('optionTriggered', function(e, args){

				var values = OptionsService.getStatusOptions();

				for(var i=0; i<values.length; i++) {

					if(values[i] == true) {
						$rootScope.isOptionActive = $sce.trustAsHtml('✓');
						return false;
					} else {
						$rootScope.isOptionActive = false;
					}

				}
				
			});
			
		}
		
	}

});
 