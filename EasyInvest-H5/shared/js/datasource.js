define(["listview/DataSource","shared/js/client"],function(a,b){return a.extend({ajaxLoadData:function(a){var c=this;b.ajax({url:a.url,type:a.type||"POST",data:a.data,success:function(b){b&&b.success?(b.data&&(0===b.data.length||!b.data.data||b.data.data&&(b.data.total==b.data.data.length+c.size()||b.data.data.length<a.data[c.options.pageSizeParam]))&&c.setFinish(),a.success(b.data)):a.fail(b.data)},error:function(b,c){a.fail(b,c)}})}})});