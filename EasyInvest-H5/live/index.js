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
	'live/live-client',
	'dialog'
	], 
	function(View, Butterfly, DataSource, ListView, swipe, iscroll, liveClient, Dialog){

	return View.extend({
		events: {
			"click #go": "close",
            "click .navButton": "onNavButtonClick", //swiper按钮切换
            "click .btn": "onBtn",
            "click .timeTableShadow,.closeTimeTable": "closeTimeTable",
            "click .ILCTTimetable": "showTimeTable",
            "click .item-common-content": 'selectItem',
            'touchstart .scroller': 'onTouchStart',
            'touchend .scroller': 'onTouchEnd',
            'touchmove .scroller': 'onTouchMove'

		},
		render:function(){
			View.prototype.render.call(this);
			// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			// 初始化 时间表的IScroll
			// this.initTimeTableScroll();
			console.log('render1111');
		},
		onShow: function(){
			this.initListviewSwipe();
			this.initAdSwipe();
			this.initListview(0);
			// 刷新 时间表的IScroll
			// this.initTimeTableScroll();
		},
		onBtn: function(e){
			var roomId = $(e.currentTarget).parents('.item-live-content').attr('data-id');
			var isRoom = $(e.currentTarget).hasClass('room-btn');
			if(isRoom){
				this.onBtnGoRoom(roomId);
			} else {
				this.onBtnReserve(roomId);
			}
		},
		onBtnGoRoom: function(roomId){
			butterfly.navigate('live/live-video.html');
		},
		onBtnReserve: function(roomId){
			var data = {
				roomId: roomId
			}
			liveClient.ajax({
				url: liveClient.BOOKING_URL,
                data: data,
                beforeSend: function() {
                },
                success: function(data) {
                    if (data && data.result === 0 ) {
                    	Dialog.createDialog({
				            buttons: {
				                '知道了': function () {
				                    this.close();
				                }
				            },
				            content: '您已预定成功，在直播开始前五分钟，我们将短信通知您，感谢您的关注'
				        });
                    } else {
                	Dialog.showToast('错误')
                    	
                    }
                },
                error: function(error) {
                	Dialog.showToast('网络连接失败，请检查网络！')
                },
                complete: function() {
                }
			})
		},
		closeTimeTable: function(){
			this.$('.timeTableWarp').remove();
			this.TTScroll = undefined;
		},
		// 显示 直播时间表
		showTimeTable: function(e){
			var me = this;
			// 缓存timeTableTemp，第一次执行
			if(!this.timeTableTemp){
				this.timeTableTemp = $('#timeTable-template').html()
			}
			if(!this.oneTimeTableTemp){
				this.oneTimeTableTemp = $('#one-timeTable-template').html()
			}
			var roomId = $(e.currentTarget).parents('.item-live-content').attr('data-id');
			var data = {
				roomId: roomId
			}
			liveClient.ajax({
				url: liveClient.SCHEDULE_URL,
                data: data,
                beforeSend: function() {
                },
                success: function(data) {
                    if (data && data.result === 0 && data.data) {
                    	if( data.data.length > 1){
                    		var geneHtml = _.template(me.timeTableTemp,data);
	                    	me.$el.append(geneHtml);
	                    	me.initTimeTableScroll();
                    	} else if (data.data.length === 1){
                    		var html = _.template(me.oneTimeTableTemp,data.data[0]);
							Dialog.createDialog({
					            buttons: {
					                '知道了': function () {
					                    this.close();
					                }
					            },
					            content: html
					        });
                    	} else {
                			Dialog.showToast('获取数据为空')
                    	}
                    	
                    } else {
                		Dialog.showToast()
                    }
                },
                error: function(error) {
                	Dialog.showToast('网络连接失败，请检查网络！')

                },
                complete: function() {
                }
			})
		},
		// 选择item
		selectItem: function(e){
			var id = $(e.currentTarget).attr('id');
			butterfly.navigate('main/main-message-detail.html',{
				id: id
			});
		},
		// 初始化 时间表的IScroll
		initTimeTableScroll: function(){
			if (!this.TTScroll) {
				//bounceTime 为0，无法触发scrollEnd
				this.TTScroll = new IScroll(this.$('.timeTable .TTBContent')[0], {
					probeType: 2,
					scrollX: false,
				    scrollY: true,
				    mouseWheel: true,
				    bounceTime: 2,
				    scrollbars: true
				});
			}
			//存在 则只刷新
			this.TTScroll.refresh();
		},
		// 初始化 listview
		initListview: function(i){
			if(i===0){
				this.initLiveListview();
			} else {
				this.initNewsListView(i);
			}
		},
		// 初始化 直播listview
		initLiveListview: function(){
			var me = this;
			if(!this.listview0){
				var liveDatasource = new DataSource({
					storage: 'none',
					identifier: 'Datasource0',
					url: '../live/data/live-new-listview1.json',
					requestParams: {
						time:'12'
					}
				});
				var listEl = this.$('#one-listview');
				var template = _.template(me.$("#listview-live-template").html());
				this.listview0 = new ListView({
					id: 'listview0',
					el: listEl,
					autoLoad: true,
					itemTemplate: template,
					dataSource: liveDatasource,
					isPullToRefresh: false
				});
			}
		},
		// 初始化 资讯类listview
		initNewsListView: function(i){
	        var me = this;
			if(!this['listview'+i]){
				this['Datasource'+i] = new DataSource({
					storage: 'none',
					identifier: 'Datasource'+i,
					url: '../live/data/live-new-listview'+(i+1)+'.json',
					requestParams: {
						channelId: i-1
					}
				});
				var listEl = this.$('.listview'+(i+1));
				var template = _.template(me.$("#listview-common-template").html());
				this['listview'+i] = new ListView({
					id: 'listview'+i,
					el: listEl,
					autoLoad: true,
					itemTemplate: template,
					dataSource: me['Datasource'+i],
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
		//初始化 istviewSwipe
		initListviewSwipe: function(){
			var me = this;
			if (!this.listviewSwipe) {
				this.listviewSwipe = new Swipe(me.$('.listviewSwipe')[0] ,{
					startSlide: 0,
					continuous: false,
                    closeEndMotion: true,
					callback: function(index, element) {
						//nav的滑动
						me.navSlide(index);
						me.initListview(index);
					},
					transitionEnd: function(index, element) {}
				});
			}
		},
		//swiper按钮切换
		onNavButtonClick: function(e){
			var el = $(e.currentTarget);
			var value = el.attr("data-value");
			var index = parseInt(value);
			//listviewSwipe的滑动
			this.listviewSwipe.slide(index, 300);
		},
		//nav的滑动  其实就是一个css动画和添加active
		navSlide: function(index){
			this.$('.navButton').removeClass('active').eq(index).addClass('active');
			this.$('.scroll-lite').css('left',index*100+'%');
		},
		// 下面三个方法 解决  上下左右同时滑动
		onTouchStart: function(events) {
	        this.touchFirst = true;
	        if (this.listviewSwipe) {
	            this.listviewSwipe.pause();
	        }
	        this.swipeIndex = this.listviewSwipe.getPos();
	        if (this['listview'+this.swipeIndex] && this['listview'+this.swipeIndex].IScroll) {
	        	this['listview'+this.swipeIndex].IScroll.enabled = false;
	        }

	        this.lastX = events.originalEvent.touches[0].clientX;
	        this.lastY = events.originalEvent.touches[0].clientY;
	    },
	    onTouchMove: function(events) {
	        var me = this;
	        if (this.touchFirst === true) {

	            this.clientX = events.originalEvent.touches[0].clientX;
	            this.clientY = events.originalEvent.touches[0].clientY;

	            var changeX = Math.abs(this.clientX - this.lastX);
	            var changeY = Math.abs(this.clientY - this.lastY);
	            var tan = Math.abs(this.clientX - this.lastX) / Math.abs(this.clientY - this.lastY);

	            if(tan < 1 || tan === 1){//上下
	        		if (this['listview'+this.swipeIndex] && this['listview'+this.swipeIndex].IScroll) {
	            		this['listview'+this.swipeIndex].IScroll.enabled = true;
	                	this.touchFirst = false;
	        		}
	            }else if(tan > 1){//左右
	            	this.listviewSwipe.resume();
	            	this.touchFirst = false;
	            }
	        }
	    },
	    onTouchEnd: function() {
	        delete this.touchFirst;
	        if (this['listview'+this.swipeIndex] && this['listview'+this.swipeIndex].IScroll) {
	        	this['listview'+this.swipeIndex].IScroll.enabled = true;
	        }
	    },

	}); //view define
});