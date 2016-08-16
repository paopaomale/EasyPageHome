/**
 * [description]
 * 我的积分
 * @FileName   account/my-integral.js
 * @Author     lichanglong
 */
define([
		'butterfly/view',
		'butterfly',
		'listview/listView',
		'../shared/js/datasource',
		'../account/account-client'
	],
	function(View, Butterfly, ListView, DataSource, AccountClient) {

		return View.extend({
			events: {
				"click .go-back": "goBack"
			},
			render: function() {
				console.log('render');
				this.initListView();
			},
			onShow: function() {
				console.log('render');
			},
			initListView: function() {
				var me = this;
				me.datasource = new DataSource({
					storage: 'session',
					identifier: 'my-message',
					url: AccountClient.GET_INTEGRAL_LIST_URL,
					pageParam: 'pageIndex',
				});

				var listEl = this.el.querySelector("#integral-list");
				var template = _.template(this.$("#integral-list-template").html());

				me.listview = new ListView({
					id: 'integral-list',
					el: listEl,
					autoLoad: 'true',
					itemTemplate: template,
					dataSource: this.datasource
				});
				me.listenTo(this.listview, 'itemSelect', this.onItemSelect);
			}
		}); //view define
	});