WudApp.factory('DataDPLAService', function(ItemsService){

	var factory = {

		base : 'http://api.dp.la/v2/',
		key : 'f1ab088394bc0548b7b2048ef06c0a29',
		optional : {},
		data : {},
 
		setQuery : function(params) {

			var api = factory.base, 
				method = 'items?q=',
				apiKey = '&api_key='+factory.key,
				valueQuery = params['search'], 
				pagination = params['pagination'],
				timeline = params['timeline'] || '',
				languages = params['languages'] || '', 
				mediatypes = params['mediatypes'] || '';

			return api + method + valueQuery + mediatypes + timeline + languages + apiKey + pagination;

		},
 
		getId : function(item) {

			if(item.hasOwnProperty('id')) {

				return item['id'];
 
			}

			return '';
		},

		getLink : function(id){

			return 'http://dp.la/item/'+id;

		},

		getTitle : function(item){

			if(item.hasOwnProperty('sourceResource')) {

				if(item['sourceResource'].hasOwnProperty('title')) {

					if(typeof item['sourceResource']['title'] == 'object') {

						return item['sourceResource']['title'][0];

					}

					return item['sourceResource']['title'];

				} 

			} 

			return 'no title';

		},

		getDescription : function(item){

			if(item.hasOwnProperty('sourceResource')) {

				if(item['sourceResource'].hasOwnProperty('description')) {

					if(typeof item['sourceResource']['description'] == 'object') {

						if(item['sourceResource']['description'][0] != '') {

							return item['sourceResource']['description'][0];

						}

					}

					if(item['sourceResource']['description'] != '') {

						return item['sourceResource']['description'];
						
					}

				} else {

					return '';

				}

			} else {

				return '';

			}

		},

		getDatation : function(item){

			if(item.hasOwnProperty('sourceResource')) {

				if(item['sourceResource'].hasOwnProperty('date')) {

					if(item['sourceResource']['date'].hasOwnProperty('displayDate')) {

						if(item['sourceResource']['date']['displayDate'] != '') {

							return item['sourceResource']['date']['displayDate'];

						}

					}

				}

			}

			return '';

		},

		getImage : function(item){

			if(item.hasOwnProperty('object')) {

				return item['object'];

			} else {

				return 'img/missing-dpla.jpg';

			}

		},

		getScore : function(item){

			if(item.hasOwnProperty('score')) {

				return item['score'];

			}

			return '';

		},

		getType : function(item){

			if(item.hasOwnProperty('sourceResource')) {

				if(item['sourceResource'].hasOwnProperty('type')) {

					return item['sourceResource']['type'];

				}

			}

			return '';

		},

		getSource : function(item){

			if(item.hasOwnProperty('isShownAt')) {

				return item['isShownAt'];

			}

			return '';

		},

		checkResult : function(data) {

			if(data['count'] > 0) {

				return {
					total : data['count'],
					objects : data['docs'],
					limit : data['limit'],
					start : data['start']
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
					'desc' : factory.getDescription(item),
					'date' : factory.getDatation(item),
					'image' : factory.getImage(item),
					'link' : factory.getLink(factory.getId(item)),
					'score' : factory.getScore(item),
					'source' : factory.getSource(item),
					'type' : factory.getType(item),
					'api' : 'dpla'
				});

			}

			return reformatItems;

		}, 

		isMoreObjAvailable : function() {
			return ItemsService.getInfoDPLA()['items'] >= ItemsService.getInfoDPLA()['total'];
		}

	}

	return factory;

});