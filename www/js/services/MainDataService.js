WudApp.factory('MainDataService', function(DataDPLAService, DataEDMService, ItemsService, $http, $q){

	var factory = {

		apiData : {
			'edm' : {},
			'dpla' : {}
		},

		loadMoreState : false,

		setRequest : function(params) {
 
			var deferred = $q.defer();

			// Setting Promises 
			var promiseDPLA = $http.jsonp(params['dpla']+'&callback=JSON_CALLBACK');
			var promiseEDM = $http.jsonp(params['edm']+'&callback=JSON_CALLBACK');

			var promiseList = [promiseDPLA, promiseEDM];

			$q.all(promiseList).then(function(response){

				factory.apiData.dpla = response[0].data;
				factory.apiData.edm = response[1].data;
				deferred.resolve(factory.apiData);

			}, function(error){

				return deferred.reject('Probleme');

			});

			return deferred.promise;
 
		},

		checkResults : function(data) {

			// checking result DPLA & Europeana
			var checkedResultDPLA = DataDPLAService.checkResult(data['dpla']);
			var checkedResultEDM = DataEDMService.checkResult(data['edm']);

			return {
				'edm' : checkedResultEDM,
				'dpla' : checkedResultDPLA
			}

		},

		checkCollections : function(object) {

			var dplaCollection = '',
				edmCollection = '';

			if(object.hasOwnProperty('edm')) {

				if(object['edm'] != null) {

					// update info europeana
					ItemsService.updateInfoEDM(object['edm']);

					// set europeana collection
					edmCollection = DataEDMService.parseCollection(object['edm']['objects']);

				}

			}

			if(object.hasOwnProperty('dpla')) {

				if(object['dpla'] != null) {

					// update info dpla
					ItemsService.updateInfoDPLA(object['dpla']);

					// set dpla collection
					dplaCollection = DataDPLAService.parseCollection(object['dpla']['objects']);

				}

			}

			// If europeana and dpla are present in collection
			if(edmCollection && dplaCollection) {

				// Merge Collections
				var mergedCollections = edmCollection.concat(dplaCollection);

				// Get btn load more state DPLA and EDM
				DataEDMService.isMoreObjAvailable() && DataDPLAService.isMoreObjAvailable() ? factory.loadMoreState = false : factory.loadMoreState = true;

				// Return merged collections sorted by score
				return ItemsService.sortObjectsByScore(mergedCollections);

			} else {


				if(edmCollection) { 

					// get btn load more state EDM
					DataEDMService.isMoreObjAvailable() ? factory.loadMoreState = false : factory.loadMoreState = true;

					// if europeana is present in collection
					return edmCollection;

				} else if(dplaCollection) {

					// get btn load more state DPLA
					DataDPLAService.isMoreObjAvailable() ? factory.loadMoreState = false : factory.loadMoreState = true;

					// if dpla is present in collection
					return dplaCollection;

				}

				return false;

			}

		}

	}

	return factory;

});