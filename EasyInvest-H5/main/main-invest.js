define([
	'butterfly/view',
	'butterfly',
	'text!main/main-invest.html'
	], 
	function(View, Butterfly, ViewTemplate){

	return View.extend({
		swipe:null,
		events: {
			"click #go": "close"
		},
	}); //view define
});