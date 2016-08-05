define([
	'butterfly/view',
	'butterfly',
	], 
	function(View, Butterfly, ViewTemplate){

	return View.extend({
		swipe:null,
		events: {
			"click #go": "close"
		},
	}); //view define
});