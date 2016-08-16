/**
 * [description]
 * 我的消息
 * @FileName   account/my-message.js
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
					url: AccountClient.GET_MESSAGE_URL,
					pageParam: 'pageIndex',
				});

				var listEl = this.el.querySelector("#message-list");
				var template = _.template(this.$("#message-list-template").html());

				me.listview = new ListView({
					id: 'my-message',
					el: listEl,
					autoLoad: 'true',
					itemTemplate: template,
					dataSource: this.datasource
				});
				me.listenTo(this.listview, 'itemSelect', this.onItemSelect);
			}
		}); //view define
	});