/**
 * [description]
 * 登陆
 * @FileName   account/login.js
 * @Author     lichanglong
 */
define([
	'butterfly/view',
	'butterfly',
	], 
	function(View, Butterfly, ViewTemplate){

	return View.extend({
		events: {
			"click .go-back": "goBack"
		},
		render:function(){
			console.log('render');
		},
		onShow: function(){
			console.log('render');
		}
	}); //view define
});