define(["butterfly/view","butterfly","main/main-client"],function(a,b,c){return a.extend({events:{"click .go-back":"goBack"},render:function(){var a;this.renderHtml(a)},onShow:function(){},renderHtml:function(a){var b=this,d={id:a};c.ajax({url:c.INFO_DETAIL_URL,data:d,beforeSend:function(){},success:function(a){a&&0===a.result&&a.data&&(b.$(".content-title").html(a.data.title),b.$(".content-time").html(a.data.createTime),b.$(".content-body").html(a.data.content))},error:function(a){},complete:function(){}})}})});