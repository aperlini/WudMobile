wudApp.factory('ModalService', function(){

	var factory = {

		onerror :  {
			title : 'Oups : "Unavailable Services"',
			message : '<strong>Message : </strong><p>Please come back later</p>'
		},

		onnoresults : {
			title : 'Oups : "no matching results"',
			message : '<strong>Message : </strong><p>0 results</p>'
		},

		onload : {
			title : 'Loading data...',
			message : '<div id="loader-wrap"><img src="img/ajax-loader.gif" alt=""></div>'
		}

	};

	return factory;

});