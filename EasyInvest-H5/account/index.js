/**
 * [description]
 * 账户
 * @FileName   account/index.js
 * @Author     lichanglong
 */
define([
	'butterfly/view',
	'butterfly',
	], 
	function(View, Butterfly, ViewTemplate){

	return View.extend({
		swipe:null,
		events: {
			'click .account-group-row':'navigateUrl'

		},
		render:function(){
			console.log('f')
		},
		onShow:function(){

		},
		navigateUrl:function(e){
			var me = this,
				url = $(e.currentTarget).attr('data-value').trim();
			if (url) {
				butterfly.navigate(url);
			}else{
				alert("正在完善，敬请期待！")
			}
		}
	}); //view define
});