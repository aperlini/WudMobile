WudApp.factory('ModalService', function($sce){

	var factory = {

		msg : '',

		setMsg : function(title, body) {

			factory.msg = '<strong>'+title+'</strong> : ' + body;

		},

		getMsg : function() {

			return factory.msg;

		}

	};

	return factory;

});