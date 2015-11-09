WudApp.factory('DataEDMService', function($http, $q, ItemsService){

	var factory = {

			base : 'http://www.europeana.eu/api/v2/',
			key : 'Da5hthRYW',
			optional : {},
			data : {},
			dataDetail : {},
 
		setQuery : function(params) {

			var api = factory.base, 
				method = 'search.json?',
				apiKey = 'wskey='+factory.key,
				query = '&query=',
				valueQuery = params['search'], 
				pagination = params['pagination'],
				timeline = params['timeline'] || '',
				languages = params['languages'] || '', 
				mediatypes = params['mediatypes'] || '';

			return api + method + apiKey + query + valueQuery + mediatypes + timeline + languages + pagination;

		},

		getId : function(item) {

			if(item.hasOwnProperty('id')) {

				return item['id'];

			}

			return '';

		},

		getLink : function(item) {

			if(item.hasOwnProperty('guid')) {

				var link = item['guid'];

				var linkArray = link.split('.html'),
					reformatLink = linkArray[0]+'.html';

				return reformatLink;

			}

			return '';

		},

		getTitle : function(item) {

			if(item.hasOwnProperty('title')) {

				return item['title'][0];

			}

			return 'no title';

		},

		getImage : function(item) {

			if(item.hasOwnProperty('edmPreview')){

				return item['edmPreview'][0];

			} else {

				return 'img/missing-edm.jpg'; 

			}

		},

		getScore : function(item) {

			if(item.hasOwnProperty('score')) {

				return item['score'];

			}

			return '';

		},

		getType : function(item) {

			if(item.hasOwnProperty('type')) {

				return item['type'];

			}

			return '';

		},

		getSource : function(item) {

			if(item.hasOwnProperty('edmIsShownAt')) {

				return item['edmIsShownAt'][0];

			}

			return '';

		},

		checkResult : function(data) {

			if(data['itemsCount'] > 0) {

				return {
					total : data['totalResults'],
					objects : data['items'],
					limit : data['itemsCount']
				}

			} else {

				return null

			}

		},

		parseCollection : function(results) {

			var items = results,
				nbrItems = items.length,
				reformatItems = [];

			for(var i=0; i<nbrItems; i++) {

				var item = items[i]; 

				reformatItems.push({
					'id' : factory.getId(item),
					'title' : factory.getTitle(item), 
					'image' : factory.getImage(item),
					'link' : factory.getLink(item),
					'score' : factory.getScore(item),
					'source' : factory.getSource(item),
					'type' : factory.getType(item),
					'api' : 'edm'
				});

			}

			return reformatItems;

		},

		isMoreObjAvailable : function() {
			return ItemsService.getInfoEDM()['items'] >= ItemsService.getInfoEDM()['total'];
		},

		queryDetail : function(id) {

			var method = 'record/',
				type = '.json?wskey=',
				url = factory.base + method + id + type + factory.key,
				deferred = $q.defer();

			$http.jsonp(url+'&callback=JSON_CALLBACK').success(function(response, status){

				factory.dataDetail = response;
				deferred.resolve(factory.dataDetail);

			}).error(function(error, status){

				deferred.reject('Impossible d\'accéder à Europeana');

			});

			return deferred.promise;

		},

		formatDublinCore : function(term) {

			var label = '';

			switch(term) {
				case 'dcCreator':
					label = 'Creator';
					break;
				case 'dcDate':
					label = 'Date';
					break;
				case 'dctermsCreated':
					label = 'Date of creation';
					break;
				case 'dcDescription':
					label = 'Description';
					break;
				case 'dcPublisher':
					label = 'Publisher';
					break;
				case 'dctermsTemporal':
					label = 'Time Period';
					break;

			}

			return label;

		},

		getMoreDetailOnItem : function(data) {

			var detail = data['object'],
				detailContent = Object.keys(detail),
				detailContentLth = detailContent.length,
				detailProp = ['dcCreator', 'dcDate', 'dctermsCreated', 'dcDescription', 'dcPublisher', 'dctermsTemporal'],
				detailPropLth = detailProp.length,
				formatDetailObj = {
					'empty' : 'no further informations available'
				};

			if(detailContentLth > 0) {

				if(detail.hasOwnProperty('proxies')) {

					var proxies = detail['proxies'][0];

					for(var i=0; i<detailPropLth; i++) {

						if(proxies.hasOwnProperty(detailProp[i])) {

							if(proxies[detailProp[i]].hasOwnProperty('def')) {

								var def = proxies[detailProp[i]]['def'],
									defLth = def.length;
								
								var label = factory.formatDublinCore(detailProp[i]);

								formatDetailObj[label] = '';
								delete formatDetailObj.empty;

								if(defLth > 1) {

									for(var j=0; j<defLth; j++) {

										formatDetailObj[label] = def[j];

									}

								} else {

									formatDetailObj[label] = def[0];

								}

							}

						}

					}

				} 

			} 

			return formatDetailObj;

		}
 
	}

	return factory;

});