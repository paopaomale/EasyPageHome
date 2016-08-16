define(['shared/js/client'], function (BaseClient) {
    return _.extend(BaseClient, {
        SMS_URL: BaseClient.basePath + '/auth/sms',
        REGISTER_URL: BaseClient.basePath + '/user/register',
        GET_MESSAGE_URL:'../account/json/my-message.json',//获取我的消息
        GET_INTEGRAL_LIST_URL:'../account/json/my-message.json',//获取我的积分列表
        GET_MY_GOOODS_LIST_URL:'../account/json/my-goods.json',//获取我的投资产品列表
        GET_GOODS_TYPE:'../account/json/goods-type.json',//获取商品类型
        getGoodsType:function(params){//获取商品类型
        	this.ajax({
				url: this.GET_GOODS_TYPE,
				data: params.data,
				success: params.success,
				error: params.error,
				complete: params.complete,
				beforeSend: params.beforeSend,
			});
        }
    })
})