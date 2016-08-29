define(["butterfly/view","butterfly","shared/js/datasource","listview/ListView","swipe","iscroll","live/live-client","dialog","moment"],function(a,b,c,d,e,f,g,h,i){return a.extend({events:{"click #go":"close","click .navButton":"onNavButtonClick","click .btn":"onBtn","click .timeTableShadow,.closeTimeTable":"closeTimeTable","click .ILCTTimetable":"showTimeTable","touchstart .scroller":"onTouchStart","touchend .scroller":"onTouchEnd","touchmove .scroller":"onTouchMove"},render:function(){a.prototype.render.call(this)},onShow:function(){this.initAdSwipe(),this.initListviewSwipe(),this.initListview(0)},onBtn:function(a){var b=$(a.currentTarget),c=b.parents(".item-live-content"),d=c.attr("data-id"),e=c.attr("data-url"),f=b.hasClass("room-btn");f?this.onBtnGoRoom(d,e,b):this.onBtnReserve(d,e,b)},onBtnGoRoom:function(a,b,c){return""===b?void h.showToast("没有权限进入该直播间",1500):void butterfly.navigate("live/live-video.html",{roomId:a,url:b})},onBtnReserve:function(a,b,c){var d=c.hasClass("booked");if(!d){if(!g.haveToken())return h.showToast("请先登录后再预订直播间"),void butterfly.navigate("account/login.html");if(""===b)return void h.showToast("没有权限预定该直播",1500);var e={roomId:a};g.ajax({url:g.BROADCAST_BOOKING_URL,data:e,beforeSend:function(){},success:function(a){a&&0===a.result?(h.createDialog({buttons:{"知道了":function(){this.close()}},content:"您已预定成功，在直播开始前五分钟，我们将短信通知您，感谢您的关注"}),c.addClass("booked").html("已预定")):h.showToast("错误")},complete:function(){}})}},closeTimeTable:function(){this.$(".timeTableWarp").remove(),this.TTScroll=void 0},showTimeTable:function(a){var b=this;this.timeTableTemp||(this.timeTableTemp=$("#timeTable-template").html()),this.oneTimeTableTemp||(this.oneTimeTableTemp=$("#one-timeTable-template").html());var c=$(a.currentTarget).parents(".item-live-content").attr("data-id"),d={roomId:c};g.ajax({url:g.BROADCAST_SCHEDULE_URL,method:"GET",data:d,beforeSend:function(){},success:function(a){if(a&&0===a.result&&a.data)if(a.data.length>1){var c=_.template(b.timeTableTemp,a);b.$el.append(c),b.initTimeTableScroll()}else if(1===a.data.length){var d=_.template(b.oneTimeTableTemp,a.data[0]);h.createDialog({buttons:{"知道了":function(){this.close()}},content:d})}else h.showToast("时间表为空");else h.showToast()},complete:function(){}})},selectItem:function(a){var b=$(a.currentTarget).attr("id");butterfly.navigate("main/main-message-detail.html",{id:b})},initTimeTableScroll:function(){this.TTScroll||(this.TTScroll=new IScroll(this.$(".timeTable .TTBContent")[0],{probeType:2,scrollX:!1,scrollY:!0,mouseWheel:!0,bounceTime:2,scrollbars:!0})),this.TTScroll.refresh()},initListview:function(a){0===a?this.initLiveListview():this.initNewsListView(a)},initLiveListview:function(){var a=this;if(this.listview0)this.listview0.IScroll&&this.listview0.IScroll.refresh();else{var b=new c({storage:"none",identifier:"Datasource0",url:g.BROADCAST_ROOMS_URL,requestParams:{time:"12"}}),e=this.$("#one-listview"),f=_.template(a.$("#listview-live-template").html());this.listview0=new d({id:"listview0",el:e,autoLoad:!0,itemTemplate:f,dataSource:b,isPullToRefresh:!0})}},initNewsListView:function(a){var b=this;if(this["listview"+a])this["listview"+a].IScroll&&this["listview"+a].IScroll.refresh();else{this["Datasource"+a]=new c({storage:"none",identifier:"Datasource"+a,url:g.BROADCAST_INFO_URL,requestParams:{channelId:a-1,roomId:null}});var e=this.$(".listview"+(a+1));if(2===a)var f=_.template(b.$("#listview-common-needAuthor-template").html());else var f=_.template(b.$("#listview-common-template").html());this["listview"+a]=new d({id:"listview"+a,el:e,autoLoad:!0,itemTemplate:f,dataSource:b["Datasource"+a],isPullToRefresh:!0})}},geneAdSwipeImg:function(a){for(var b='<%var img%><div class="adContent"><img width="100%" src="<%=window._serverBasePath + img%>"/></div>',c="",d=a.length,e=0;d>e;e++)c+=_.template(b,a[e]);return c},initAdSwipe:function(){var a=this;if(a.adSwipe)a.adSwipe.setup();else{var b={channelId:"3"};g.ajax({url:g.BANNER_TOP3_URL,data:b,method:"GET",beforeSend:function(){},success:function(b){if(b&&0===b.result&&b.data&&b.data.length){var c=a.geneAdSwipeImg(b.data);a.$(".adSwipe .swipe-wrap").html(c)}else a.$(".adSwipe .swipe-wrap").html('<div class="adContent"><img width="100%" src="../live/img/adSwipe1.png"/></div>')},error:function(b){a.$(".adSwipe .swipe-wrap").html('<div class="adContent"><img width="100%" src="../live/img/adSwipe1.png"/></div>')},complete:function(){setTimeout(function(){a.adSwipe=new Swipe(a.$(".adSwipe")[0],{startSlide:0,speed:3e3,auto:1e3,continuous:!0,disableScroll:!1,stopPropagation:!1,closeEndMotion:!0})},0)}})}},initListviewSwipe:function(){var a=this;this.listviewSwipe?this.listviewSwipe.setup():this.listviewSwipe=new Swipe(a.$(".listviewSwipe")[0],{startSlide:0,continuous:!1,closeEndMotion:!0,callback:function(b,c){a.navSlide(b),a.initListview(b)},transitionEnd:function(a,b){}})},onNavButtonClick:function(a){var b=$(a.currentTarget),c=b.attr("data-value"),d=parseInt(c);this.listviewSwipe.slide(d,300)},navSlide:function(a){this.$(".navButton").removeClass("active").eq(a).addClass("active"),this.$(".scroll-lite").css("left",100*a+"%")},onTouchStart:function(a){this.touchFirst=!0,this.listviewSwipe&&this.listviewSwipe.pause(),this.swipeIndex=this.listviewSwipe.getPos(),this["listview"+this.swipeIndex]&&this["listview"+this.swipeIndex].IScroll&&(this["listview"+this.swipeIndex].IScroll.enabled=!1),this.lastX=a.originalEvent.touches[0].clientX,this.lastY=a.originalEvent.touches[0].clientY},onTouchMove:function(a){if(this.touchFirst===!0){this.clientX=a.originalEvent.touches[0].clientX,this.clientY=a.originalEvent.touches[0].clientY;var b=(Math.abs(this.clientX-this.lastX),Math.abs(this.clientY-this.lastY),Math.abs(this.clientX-this.lastX)/Math.abs(this.clientY-this.lastY));1>b||1===b?this["listview"+this.swipeIndex]&&this["listview"+this.swipeIndex].IScroll&&(this["listview"+this.swipeIndex].IScroll.enabled=!0,this.touchFirst=!1):b>1&&(this.listviewSwipe.resume(),this.touchFirst=!1)}},onTouchEnd:function(){delete this.touchFirst,this["listview"+this.swipeIndex]&&this["listview"+this.swipeIndex].IScroll&&(this["listview"+this.swipeIndex].IScroll.enabled=!0)}})});