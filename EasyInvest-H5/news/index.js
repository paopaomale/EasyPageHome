define([
	'butterfly/view',
	'butterfly',
	'text!news/index.html'
	], 
	function(View, Butterfly, ViewTemplate){

	return View.extend({
		swipe:null,
		events: {
			"click #go": "close"
		},
	}); //view define
});