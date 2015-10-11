WudApp.factory('CollectionsService', function(){

	var factory = {
 
		currentCollections : [],

		setCurrentCollections : function(current) {

			factory.currentCollections = current;

		},

		updateCurrentCollections : function(current) {

			factory.currentCollections = factory.currentCollections.concat(current);

		},

		getItemById : function(id) {

			var currentCollections = factory.getCurrentCollections();
				currentCollectionLth = currentCollections.length;

			for(var i=0; i<currentCollectionLth; i++) {

				var collection = currentCollections[i];

				if(collection['id'] == id) {

					return collection;

				}

			}

		},

		getCurrentCollections : function() {

			return factory.currentCollections;

		},

		resetCollections : function() {
			factory.currentCollections = [];
		}

	}

	return factory;

});