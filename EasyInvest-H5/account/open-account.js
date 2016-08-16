/**
 * [description]
 * 开通账户
 * @FileName   account/open-account.js
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