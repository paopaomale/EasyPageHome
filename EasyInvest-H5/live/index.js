define(["butterfly/view","butterfly","shared/js/datasource","listview/ListView","swipe"],function(a,b,c,d,e){return a.extend({events:{"click #go":"close","click .navButton":"onNavButtonClick","click .btn":"btn"},btn:function(){alert("btn")},render:function(){a.prototype.render.call(this),console.log("render1111")},onShow:function(){this.initAdSwipe(),this.initListviewSwipe(),this.initListview(0),this.initNewsListView(1),this.initNewsListView(2),this.initNewsListView(3)},initListview:function(a){0===a?this.initLiveListview():this.initNewsListView(a)},initLiveListview:function(){var a=this;if(!this.liveListview){var b=new c({storage:"none",identifier:"liveDatasource",url:"../live/data/live-new-listview1.json",requestParams:{}}),e=this.$("#one-listview"),f=_.template(a.$("#listview-live-template").html());this.liveListview=new d({id:"liveListview",el:e,autoLoad:!0,itemTemplate:f,dataSource:b,isPullToRefresh:!1})}},initNewsListView:function(a){var b=this,e=a-1;if(!this["newsListview"+e]){this["newsDatasource"+e]=new c({storage:"none",identifier:"newsDatasource"+e,url:"../live/data/live-new-listview"+(e+2)+".json",requestParams:{channelId:e}});var f=this.$(".listview"+(e+2)),g=_.template(b.$("#listview-common-template").html());this["newsListview"+e]=new d({id:"newsListview"+e,el:f,autoLoad:!0,itemTemplate:g,dataSource:b["newsDatasource"+e],isPullToRefresh:!1})}},initAdSwipe:function(){this.adSwipe||(this.adSwipe=this.$(".adSwipe").Swipe({startSlide:0,speed:3e3,auto:1e3,continuous:!0,disableScroll:!1,stopPropagation:!1,closeEndMotion:!0}))},initListviewSwipe:function(){var a=this;this.listviewSwipe||(this.listviewSwipe=new Swipe(a.$(".listviewSwipe")[0],{startSlide:0,continuous:!1,closeEndMotion:!0,callback:function(b,c){a.navSlide(b)},transitionEnd:function(a,b){}}))},onNavButtonClick:function(a){var b=$(a.currentTarget),c=b.attr("data-value"),d=parseInt(c);this.listviewSwipe.slide(d,300)},navSlide:function(a){this.$(".navButton").removeClass("active").eq(a).addClass("active"),this.$(".scroll-lite").css("left",100*a+"%")}})});