WudApp.factory('ItemsService', function(){

	var factory = {

		currentSearch : '',
		currentItemsDpla : 0,
		totalItemsDpla : 0,
		currentItemsEDM : 0,
		totalItemsEDM : 0,
		allCurrentItems : 0,

		/* SEARCH */
		setCurrentSearch : function(current) {

			factory.currentSearch = current;

		},

		getCurrentSearch : function() {
			return factory.currentSearch;
		},

		/* EDM */
		setCurrentItemsEDM : function(items) {
			factory.currentItemsEDM == 0 ? factory.currentItemsEDM = items : factory.currentItemsEDM += items;
		},

		setTotalItemsEDM : function(total) {
			factory.totalItemsEDM = total;
		},

		updateInfoEDM : function(edmObj) {
			factory.setCurrentItemsEDM(edmObj['limit']);
			factory.setTotalItemsEDM(edmObj['total']);
		},

		getInfoEDM : function() {
			return {
				items : factory.currentItemsEDM,
				total : factory.totalItemsEDM
			}
		},

		/* DPLA */ 
		setCurrentItemsDPLA : function(items) {

			if(items['limit'] >= items['total']) {

				factory.currentItemsDpla = items['total'];

			} else {

				if((factory.currentItemsDpla + items['limit']) >= items['total']) {

					factory.currentItemsDpla += items['total'] % items['limit'];

				} else {

					factory.currentItemsDpla += items['limit']; 

				}
				
			}
	 
		},

		setTotalItemsDPLA : function(item) {
			factory.totalItemsDpla = item['total'];
		},

		updateInfoDPLA : function(dplaObj) {
			factory.setTotalItemsDPLA(dplaObj);
			factory.setCurrentItemsDPLA(dplaObj);
		},

		getInfoDPLA : function() {
			return {
				items : factory.currentItemsDpla,
				total : factory.totalItemsDpla
			}
		},

		sortObjectsByScore : function(p_array) {
			return p_array.sort(function(a, b){ return parseFloat(b.score) - parseFloat(a.score) });
		},

		/* ALL */
		resetItemsCount : function() {
			factory.currentItemsDpla = 0,
			factory.totalItemsDpla = 0,
			factory.currentItemsEDM = 0,
			factory.totalItemsEDM = 0,
			factory.allCurrentItems = 0;
		}, 

		getInfo : function() {
			return {
				items : factory.currentItemsDpla + factory.currentItemsEDM,
				total : factory.totalItemsDpla + factory.totalItemsEDM,
				edm : factory.totalItemsEDM,
				dpla : factory.totalItemsDpla,
				search : factory.currentSearch
			}
		}

	}

	return factory;

});