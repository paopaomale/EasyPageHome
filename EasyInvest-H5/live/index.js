define(["butterfly/view","butterfly","shared/js/datasource","listview/ListView","swipe","iscroll","live/live-client","dialog"],function(a,b,c,d,e,f,g,h){return a.extend({events:{"click #go":"close","click .navButton":"onNavButtonClick","click .btn":"onBtn","click .timeTableShadow,.closeTimeTable":"closeTimeTable","click .ILCTTimetable":"showTimeTable","click .item-common-content":"selectItem","touchstart .scroller":"onTouchStart","touchend .scroller":"onTouchEnd","touchmove .scroller":"onTouchMove"},render:function(){a.prototype.render.call(this),console.log("render1111")},onShow:function(){this.initListviewSwipe(),this.initAdSwipe(),this.initListview(0)},onBtn:function(a){var b=$(a.currentTarget).parents(".item-live-content").attr("data-id"),c=$(a.currentTarget).hasClass("room-btn");c?this.onBtnGoRoom(b):this.onBtnReserve(b)},onBtnGoRoom:function(a){butterfly.navigate("live/live-video.html")},onBtnReserve:function(a){var b={roomId:a};g.ajax({url:g.BOOKING_URL,data:b,beforeSend:function(){},success:function(a){a&&0===a.result?h.createDialog({buttons:{"知道了":function(){this.close()}},content:"您已预定成功，在直播开始前五分钟，我们将短信通知您，感谢您的关注"}):h.showToast("错误")},error:function(a){h.showToast("网络连接失败，请检查网络！")},complete:function(){}})},closeTimeTable:function(){this.$(".timeTableWarp").remove(),this.TTScroll=void 0},showTimeTable:function(a){var b=this;this.timeTableTemp||(this.timeTableTemp=$("#timeTable-template").html()),this.oneTimeTableTemp||(this.oneTimeTableTemp=$("#one-timeTable-template").html());var c=$(a.currentTarget).parents(".item-live-content").attr("data-id"),d={roomId:c};g.ajax({url:g.SCHEDULE_URL,data:d,beforeSend:function(){},success:function(a){if(a&&0===a.result&&a.data)if(a.data.length>1){var c=_.template(b.timeTableTemp,a);b.$el.append(c),b.initTimeTableScroll()}else if(1===a.data.length){var d=_.template(b.oneTimeTableTemp,a.data[0]);h.createDialog({buttons:{"知道了":function(){this.close()}},content:d})}else h.showToast("获取数据为空");else h.showToast()},error:function(a){h.showToast("网络连接失败，请检查网络！")},complete:function(){}})},selectItem:function(a){var b=$(a.currentTarget).attr("id");butterfly.navigate("main/main-message-detail.html",{id:b})},initTimeTableScroll:function(){this.TTScroll||(this.TTScroll=new IScroll(this.$(".timeTable .TTBContent")[0],{probeType:2,scrollX:!1,scrollY:!0,mouseWheel:!0,bounceTime:2,scrollbars:!0})),this.TTScroll.refresh()},initListview:function(a){0===a?this.initLiveListview():this.initNewsListView(a)},initLiveListview:function(){var a=this;if(!this.listview0){var b=new c({storage:"none",identifier:"Datasource0",url:"../live/data/live-new-listview1.json",requestParams:{time:"12"}}),e=this.$("#one-listview"),f=_.template(a.$("#listview-live-template").html());this.listview0=new d({id:"listview0",el:e,autoLoad:!0,itemTemplate:f,dataSource:b,isPullToRefresh:!1})}},initNewsListView:function(a){var b=this;if(!this["listview"+a]){this["Datasource"+a]=new c({storage:"none",identifier:"Datasource"+a,url:"../live/data/live-new-listview"+(a+1)+".json",requestParams:{channelId:a-1}});var e=this.$(".listview"+(a+1)),f=_.template(b.$("#listview-common-template").html());this["listview"+a]=new d({id:"listview"+a,el:e,autoLoad:!0,itemTemplate:f,dataSource:b["Datasource"+a],isPullToRefresh:!1})}},initAdSwipe:function(){this.adSwipe||(this.adSwipe=this.$(".adSwipe").Swipe({startSlide:0,speed:3e3,auto:1e3,continuous:!0,disableScroll:!1,stopPropagation:!1,closeEndMotion:!0}))},initListviewSwipe:function(){var a=this;this.listviewSwipe||(this.listviewSwipe=new Swipe(a.$(".listviewSwipe")[0],{startSlide:0,continuous:!1,closeEndMotion:!0,callback:function(b,c){a.navSlide(b),a.initListview(b)},transitionEnd:function(a,b){}}))},onNavButtonClick:function(a){var b=$(a.currentTarget),c=b.attr("data-value"),d=parseInt(c);this.listviewSwipe.slide(d,300)},navSlide:function(a){this.$(".navButton").removeClass("active").eq(a).addClass("active"),this.$(".scroll-lite").css("left",100*a+"%")},onTouchStart:function(a){this.touchFirst=!0,this.listviewSwipe&&this.listviewSwipe.pause(),this.swipeIndex=this.listviewSwipe.getPos(),this["listview"+this.swipeIndex]&&this["listview"+this.swipeIndex].IScroll&&(this["listview"+this.swipeIndex].IScroll.enabled=!1),this.lastX=a.originalEvent.touches[0].clientX,this.lastY=a.originalEvent.touches[0].clientY},onTouchMove:function(a){if(this.touchFirst===!0){this.clientX=a.originalEvent.touches[0].clientX,this.clientY=a.originalEvent.touches[0].clientY;var b=(Math.abs(this.clientX-this.lastX),Math.abs(this.clientY-this.lastY),Math.abs(this.clientX-this.lastX)/Math.abs(this.clientY-this.lastY));1>b||1===b?this["listview"+this.swipeIndex]&&this["listview"+this.swipeIndex].IScroll&&(this["listview"+this.swipeIndex].IScroll.enabled=!0,this.touchFirst=!1):b>1&&(this.listviewSwipe.resume(),this.touchFirst=!1)}},onTouchEnd:function(){delete this.touchFirst,this["listview"+this.swipeIndex]&&this["listview"+this.swipeIndex].IScroll&&(this["listview"+this.swipeIndex].IScroll.enabled=!0)}})});