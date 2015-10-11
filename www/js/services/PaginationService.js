WudApp.factory('PaginationService', function(){

	var factory = {

		pageDpla : 0, 
		pageSizeDpla : 0,
		startEDM : 0,
		rowsEDM : 0,

		incrementPageDpla : function() {
			factory.pageDpla++;
		},

		incrementStartEDM : function() {
			factory.startEDM = factory.rowsEDM + factory.startEDM;
		},

		resetPagination : function() {
			factory.pageDpla = 1;
			factory.pageSizeDpla = 6,
			factory.startEDM = 1, 
			factory.rowsEDM = 6;
		},

		getCurrentPagination : function() {
			return {
				dpla : '&page='+factory.pageDpla+'&page_size='+factory.pageSizeDpla,
				edm : '&start='+factory.startEDM+'&rows='+factory.rowsEDM+'&qt=false'
			}
		},

		updatePagination : function() {
			factory.incrementPageDpla();
			factory.incrementStartEDM();
		}

	};

	return factory;

});