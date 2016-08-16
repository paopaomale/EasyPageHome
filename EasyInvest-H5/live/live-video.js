/*
@ Author  江霖
*/
define([
	'butterfly/view',
	'butterfly',
	'shared/js/datasource',
	'listview/ListView',
	'swipe',
	], 
	function(View, Butterfly, DataSource, ListView, swipe){

	return View.extend({
		events: {
		},
		render:function(){
			View.prototype.render.call(this);
			console.log('render1111');
		},
		onShow: function(){
		}

	}); //view define
});