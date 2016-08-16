/*
@ Author  江霖
*/
define([
	'butterfly/view',
	'butterfly',
	'text!account/guide-login.html'
	], 
	function(View, Butterfly, ViewTemplate){

	return View.extend({
		events: {
			"click .go-back": "goBack",
			"click .login": "goLogin",
			"click .register": "goRegister",
		},
		render:function(){
			console.log('render');
		},
		onShow: function(){
			console.log('render');
		},
		goLogin: function(){
			butterfly.navigate('account/login.html');
		},
		goRegister: function(){
			butterfly.navigate('account/register.html');
		}
	}); //view define
});