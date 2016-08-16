define(["butterfly/view","butterfly","../mall/mall-client","listview/listView","../shared/js/datasource","swipe","iscrollprobe"],function(a,b,c,d,e){return a.extend({events:{"click .go-back":"goBack","click .menuLi":"goodsList"},menuScroll:null,goodsScroll:null,goodsType:null,render:function(){console.log("render")},onShow:function(){this.initAdSwiper(),this.getGoodsTypeData(),this.getSellingGoods(),this.setMinHeight()},goodsList:function(a){var b=this,c=$(a.currentTarget).attr("goods-id");b.$(".menuLi").removeClass("menu-action"),$(a.currentTarget).addClass("menu-action"),b.goodsScroll.scrollToElement(b.$("#"+c)[0],0)},initListView:function(){var a=this;a.datasource=new e({url:c.GET_SELLING_GOODS_LIST_URL,pageParam:"pageIndex"});var b=this.el.querySelector("#integral-list"),f=_.template(this.$("#selling-goods-list-template").html());a.listview=new d({id:"selling-goods-list",el:b,autoLoad:"true",itemTemplate:f,dataSource:this.datasource}),a.listenTo(this.listview,"itemSelect",this.onItemSelect)},initMenu:function(a){var b=this,c=_.template(b.$("#mall-menu-template").html(),a);b.$(".menuUl").html(""),b.$(".menuUl").append(c)},initGoodsList:function(a){var b=this;a.data=_.groupBy(a.data,"tid");var c=_.template(b.$("#selling-goods-list-template").html(),a);b.$(".goods-list").html(""),b.$(".goods-list").append(c),b.initGoodsIscroll()},getSellingGoods:function(){var a=this,b={};c.getSellingGoodsList({data:b,beforeSend:function(){console.log("请求获取热卖商品数据loading")},success:function(b){0==b.result?a.initGoodsList(b):console.log("请求获取热卖商品数据失败")},error:function(a){Dialog.showToast("获取热卖商品数据取失败,请检查网络")},complete:function(){console.log("请求获取热卖商品数据成功删除loading")}})},getGoodsTypeData:function(){var a=this,b={};c.getGoodsType({data:b,beforeSend:function(){console.log("请求数据loading")},success:function(b){0==b.result?a.initMenu(b):console.log("请求商品类型数据失败")},error:function(a){Dialog.showToast("商品类型数据取失败,请检查网络")},complete:function(){console.log("请求数据成功删除loading")}})},initAdSwiper:function(){var a=this;this.$el.find("#adSwipe .swiper-container");console.log(a.$("#adSwipe .swiper-container")[0]),a.swipe1=new Swipe(a.$("#adSwipe .swiper-container")[0],{continuous:!0,auto:500,callback:function(b){a.adCount<=b&&(b-=a.adCount),a.$(".addImg-pagination > span.active").removeClass("active"),$(a.$(".addImg-pagination > span")[b]).addClass("active")}})},initMenuIscroll:function(){var a=this;a.menuScroll?a.menuScroll.refresh():(a.menuScroll=new IScroll(a.$(".leftMenu-box")[0],{mouseWheel:!0,probeType:3}),a.menuScroll.on("scroll",function(){})),a.menuScroll.refresh()},getBoodsTypeWidth:function(){},initGoodsIscroll:function(){var a=this;a.goodsScroll?a.goodsScroll.refresh():(a.goodsScroll=new IScroll(a.$(".goods-list-box")[0],{probeType:2}),a.goodsScroll.on("scroll",function(){console.log(this.y),$(this.wrapper).find(".goods-list-group").height()})),a.goodsScroll.refresh()},setMinHeight:function(){var a=window.screen.height-160;$("#scroller").css("min-height",a),$(".scroller").css("min-height",a)},setScrollerMinHeight:function(){var a=this,b=this.menuScroll.wrapperHeight,c=a.$("#adSwipe").height(),d=b+c+1;this.$el.find("#scroller").css("min-height",d),setTimeout(function(){a.menuScroll.refresh()},400)}})});