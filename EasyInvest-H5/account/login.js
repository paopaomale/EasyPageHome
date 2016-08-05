/**
 * [description]
 * 绑定产品
 * @FileName   account/bind-goods.js
 * @Author     lichanglong
 */
define([
	'butterfly/view',
	'butterfly',
	'text!news/index.html'
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