/**
 * [description]
 * 商城
 * @FileName   mall/index.js
 * @Author     lichanglong
 */
define([
		'butterfly/view',
		'butterfly',
		'../mall/mall-client',
		'listview/listView',
		'../shared/js/datasource',
		'swipe',
		'iscrollprobe',

	],
	function(View, Butterfly, MallClient, ListView, DataSource) {

		return View.extend({
			events: {
				"click .go-back": "goBack",
				'click .menuLi': 'goodsList', //打开商品列表
			},
			menuScroll: null, //菜单iscroll
			goodsScroll: null, //商品iscroll
			goodsType: null, //商品类型
			// goodsTypeData: null,//商品类型数据
			// goodsData:null,//商品数据
			render: function() {
				console.log('render');
			},
			onShow: function() {

				this.initAdSwiper(); //广告
				this.getGoodsTypeData(); //获取商品类型列表
				this.getSellingGoods(); //获得热卖商品
				// this.initListView();//初始化listview
				// this.initGoodsIscroll();
				this.setMinHeight();
			},
			goodsList: function(e) {
				var me = this,
					typeId = $(e.currentTarget).attr('goods-id');
				me.$('.menuLi').removeClass('menu-action');
				$(e.currentTarget).addClass('menu-action')
				me.goodsScroll.scrollToElement(me.$('#' + typeId)[0],0);
				// console.log(me.$('#'+typeId)[0])
			},
			//初始化listView
			initListView: function() {
				var me = this;
				me.datasource = new DataSource({
					url: MallClient.GET_SELLING_GOODS_LIST_URL,
					pageParam: 'pageIndex',
				});

				var listEl = this.el.querySelector("#integral-list");
				var template = _.template(this.$("#selling-goods-list-template").html());

				me.listview = new ListView({
					id: 'selling-goods-list',
					el: listEl,
					autoLoad: 'true',
					itemTemplate: template,
					dataSource: this.datasource
				});
				me.listenTo(this.listview, 'itemSelect', this.onItemSelect);
			},
			//初始化菜单
			initMenu: function(menuData) {
				var me = this;
				var menuHtml = _.template(me.$('#mall-menu-template').html(), menuData);
				me.$('.menuUl').html('');
				me.$('.menuUl').append(menuHtml);
				// me.initMenuIscroll();

			},
			//初始化商品列表
			initGoodsList: function(goodsData) {
				var me = this;
				// debugger;
				goodsData.data = _.groupBy(goodsData.data, 'tid');
				var goodsListHtml = _.template(me.$('#selling-goods-list-template').html(), goodsData);
				me.$('.goods-list').html('');
				me.$('.goods-list').append(goodsListHtml);
				me.initGoodsIscroll();

			},
			//获取热卖商品
			getSellingGoods: function() {
				var me = this,
					data = {

					};

				MallClient.getSellingGoodsList({
					data: data,
					beforeSend: function() {
						console.log('请求获取热卖商品数据loading');
					},
					success: function(data) {
						if (data.result == 0) {
							me.initGoodsList(data);
							// console.warn(data);
						} else {
							console.log('请求获取热卖商品数据失败');
						}
					},
					error: function(error) {
						Dialog.showToast('获取热卖商品数据取失败,请检查网络');
					},
					complete: function() {
						console.log('请求获取热卖商品数据成功删除loading');
					}
				})
			},
			//获取商品类型数据
			getGoodsTypeData: function() {
				var me = this,
					data = {

					};

				MallClient.getGoodsType({
					data: data,
					beforeSend: function() {
						console.log('请求数据loading');
					},
					success: function(data) {
						if (data.result == 0) {
							me.initMenu(data);
							// console.log(JSON.stringify(data));
						} else {
							console.log('请求商品类型数据失败');
						}
					},
					error: function(error) {
						Dialog.showToast('商品类型数据取失败,请检查网络');
					},
					complete: function() {
						console.log('请求数据成功删除loading');
					}
				})
			},
			//初始化swiper滚动
			initAdSwiper: function() {
				var me = this;
				var m_el1 = this.$el.find('#adSwipe .swiper-container');

				//swipe替换swiper，修复swiper在Android点击事件响应不灵敏的问题
				console.log(me.$('#adSwipe .swiper-container')[0]);
				me.swipe1 = new Swipe(me.$('#adSwipe .swiper-container')[0], {
					continuous: true,
					auto: 500,
					callback: function(index) {
						// 修复swipe只有两张图片时手动滑动swipe底部的页码不同步的bug
						// me.adCount swipe中slide数量
						if (me.adCount <= index) {
							index = index - me.adCount;
						}
						me.$('.addImg-pagination > span.active').removeClass('active');
						$(me.$('.addImg-pagination > span')[index]).addClass('active');
					}
				});
			},
			//初始化iscroll menu
			initMenuIscroll: function() {
				var me = this;
				if (me.menuScroll) {
					me.menuScroll.refresh();
				} else {
					me.menuScroll = new IScroll(me.$('.leftMenu-box')[0], {
						mouseWheel: true,
						probeType: 3
					});
					me.menuScroll.on('scroll', function() {
						// console.log(this.y)
					})
				}
				me.menuScroll.refresh();

				// me.setScrollerMinHeight();
			},
			//获取商品类型的高度
			getBoodsTypeWidth:function(){

			},
			//初始化iscroll goods-list
			initGoodsIscroll: function() {
				var me = this;
				if (me.goodsScroll) {
					me.goodsScroll.refresh();
				} else {
					// debugger
					me.goodsScroll = new IScroll(me.$('.goods-list-box')[0], {
						// goodsScroll: true,
						probeType: 2
					});
					me.goodsScroll.on('scroll', function() {
						console.log(this.y)
						$(this.wrapper).find('.goods-list-group').height()
					})
					// me.goodsScroll.on('scrollEnd', function() {
					// 	debugger;
					// 	if (this.y > 100) {
					// 		// do something
					// 	}
					// });
				}
				me.goodsScroll.refresh();
				// me.setScrollerMinHeight();
			},
			// 用于做下拉刷新
			setMinHeight: function() {
				var minHeight = window.screen.height - 160;
				$('#scroller').css('min-height', minHeight);
				$('.scroller').css('min-height', minHeight);
			},
			setScrollerMinHeight: function() {
				var me = this;
				var wrapperHeight = this.menuScroll.wrapperHeight;
				var withpulldownHeight = me.$('#adSwipe').height();
				var minScrollerHeight = wrapperHeight + withpulldownHeight + 1;
				this.$el.find('#scroller').css('min-height', minScrollerHeight);
				setTimeout(function() { //延迟刷新iscroll
					me.menuScroll.refresh();
				}, 400);

			}
		}); //view define
	});