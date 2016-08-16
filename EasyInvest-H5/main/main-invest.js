/*
@ Author  江霖
*/
define([
	'butterfly/view',
	'butterfly',
	'shared/js/datasource',
	'listview/ListView',
	'swipe',
	'iscroll',
	'main/main-client',
	'dialog',
	], 
	function(View, Butterfly, DataSource, ListView, swipe, iscroll, mainClient, Dialog){

	return View.extend({
		events: {
			"click .contentWarp": "selectItem",
		},
		render:function(){
			console.log('render1111');
		},
		onShow: function(){
			this.initAdSwipe();
			this.initListview();
		},
		
		// 初始化 listview
		initListview: function(){
			var me = this;
			if(!this.listview){
				var Datasource = new DataSource({
					storage: 'none',
					identifier: 'investDatasource',
					url: mainClient.DETAIL_URL,
					requestParams: {
						channelId: '123'
					}
				});
				var listEl = this.$('#CBListview');
				var template = _.template(me.$("#listview-template").html());
				this.listview = new ListView({
					id: 'investListview',
					el: listEl,
					autoLoad: true,
					itemTemplate: template,
					dataSource: Datasource,
					isPullToRefresh: false
				});
			}
		},

		//初始化 广告swipe
		initAdSwipe: function(){
			if(!this.adSwipe){
				this.adSwipe = this.$('.adSwipe').Swipe({
	                startSlide: 0,
	                speed: 3000,
	                auto: 1000,
	                continuous: true,
	                disableScroll: false,
	                stopPropagation: false,
	                closeEndMotion: true
	            });
			}
		},

		// 选择item
		selectItem: function(e){
			var id = $(e.currentTarget).attr('id');
			butterfly.navigate('main/main-message-detail.html',{
				id: id
			});
		}
		
	}); //view define
});