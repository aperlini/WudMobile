wudApp.factory('OptionsMenuService', function(){

	var factory = {

		menuElements : [
			{
				title : 'timeline',
				state : false,
				status : false,
				icon : 'icon-hourglass-1'
			},
			{
				title : 'mediatypes',
				state : false,
				status : false,
				icon : 'icon-doc'
			},
			{ 
				title : 'languages',
				state : false,
				status : false,
				icon : 'icon-globe-4'
			},
			{
				title : 'favorites',
				state : false,
				status : false,
				icon : 'icon-heart-empty'
			}
		],

		subcontentState : false,
		lastSelectedElem : '',

		getSubcontentState : function() {

			return factory.subcontentState;

		},

		setOptionsMenuState : function(current) {
			
			// if last elem selected is the same as current = togglestate
			if(factory.lastSelectedElem == current) {

				factory.subcontentState = !factory.subcontentState;
 
			} else {

				factory.subcontentState = true;				

			}

			for(var i=0; i<factory.menuElements.length; i++) {

				// reset any previous state
				factory.menuElements[i]['state'] = false;

				if(factory.menuElements[i]['title'] == current) {

					// set state current elem
					factory.menuElements[i]['state'] = true;

				}

			}

			// set last selected element
			factory.lastSelectedElem = current;
			
			if(factory.subcontentState == false) { 
				factory.resetOptionMenuState();
			}

		},

		getOptionsMenu : function() {
			return factory.menuElements;
		},

		getOptionsStateByMenuTitle : function(title) {

			for(var i=0; i<factory.menuElements.length; i++) {

				if(factory.menuElements[i]['title'] == title) {

					// get state current title
					return factory.menuElements[i]['state'];

				}

			}

		},

		resetOptionMenuState : function() {
			for(var i=0; i<factory.menuElements.length; i++) {
				factory.menuElements[i]['state'] = false;
			}
		},

		closeSubcontent : function() {
			factory.resetOptionMenuState();
			factory.subcontentState = false;
		},

		/* timeline */

		timelineValues : '0;2000',

		timelineVal : '',
		isTimelineActive : false,

		getTimelineValues : function() {

			return factory.timelineVal;

		},

		resetTimelineValues : function() {

			return '0;2000'

		},

		getStatusTimeline : function() {

			return factory.isTimelineActive;

		},

		setTimeline : function(data) {

			var values = data.toString().split(";"),
				valueMin = values[0],
				valueMax = values[1];

			if(valueMin > 0 || valueMax < 2000) {

				factory.isTimelineActive = true;

				factory.menuElements[0]['status'] = true;

				factory.timelineVal = {min : valueMin, max : valueMax};

			} else {

				factory.isTimelineActive = false;

				factory.menuElements[0]['status'] = false;

			}
			
		},

		getTimeline : function() {
			return {
				min : factory.timelineVal.from,
				max : factory.timelineVal.to
			};
		},

		/* mediatypes */

		mediatypesElements : [
			{
				title : 'text',
				state : false,
				icon : 'icon-doc-text'
			},
			{
				title : 'image',
				state : false,
				icon : 'icon-picture'
			},
			{
				title : 'video',
				state : false,
				icon : 'icon-videocam'
			},
			{
				title : 'sound',
				state : false,
				icon : 'icon-volume-off'
			}
		],

		isMediatypesActive : false,

		setMediatypesStatus : function(val) {

			if(val) {
				factory.menuElements[1]['status'] = true;
				factory.isMediatypesActive = true;
			} else {
				factory.menuElements[1]['status'] = false;
				factory.isMediatypesActive = false;
			}			

		},

		getStatusMediatypes : function() {

			return factory.isMediatypesActive;

		},

		getMediatypesElements : function() {
			return factory.mediatypesElements;
		},

		resetMediatypesElements : function() {
			for(var i=0; i<factory.mediatypesElements.length; i++) {
				factory.mediatypesElements[i]['state'] = false;
			}
		},

		/* languages */

		languagesElements : [

			{
				title : 'english',
				img : 'gb.png',
				state : false
			},
			{
				title : 'french',
				img : 'fr.png',
				state : false
			},
			{
				title : 'german',
				img : 'de.png',
				state : false
			},
			{
				title : 'spanish',
				img : 'es.png',
				state : false
			}

		],

		isLanguagesActive : false,

		getLanguagesElements : function() {
			return factory.languagesElements;
		},

		setLanguagesState : function(current) {
			for(var i=0; i<factory.languagesElements.length; i++) {
				factory.languagesElements[i]['state'] = false;
				if(factory.languagesElements[i]['title'] == current) {
					factory.languagesElements[i]['state'] = true;
					factory.menuElements[2]['status'] = true;
					factory.isLanguagesActive = true;
				}
			}
		},

		resetLanguagesState : function() {
			for(var i=0; i<factory.languagesElements.length; i++) {
				factory.languagesElements[i]['state'] = false;
			}

			factory.menuElements[2]['status'] = false;
			factory.isLanguagesActive = false;
		},

		getStatusLanguages : function() {

			return factory.isLanguagesActive;

		}
		/* favorites */

	};

	return factory;

});