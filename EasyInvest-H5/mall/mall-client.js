define(['shared/js/client'], function (BaseClient) {
    return _.extend(BaseClient, {
        GET_GOODS_TYPE_URL:'../mall/json/goods-type.json',//获取商品类型
        GET_SELLING_GOODS_LIST_URL:'../mall/json/selling-goods-list.json',//获取热卖商品列表
        GET_GOODS_LIST_URL:'../mall/json/goods-type.json',//获取商品列表
        GET_GOODS_DETAIL_URL:'../mall/json/goods-type.json',//获取商品详情数据
        
        getSellingGoodsList:function(params){//获取热卖商品列表
            this.ajax({
                url: this.GET_SELLING_GOODS_LIST_URL,
                data: params.data,
                success: params.success,
                error: params.error,
                complete: params.complete,
                beforeSend: params.beforeSend,
            });
        },
        getGoodsType:function(params){//获取商品类型
        	this.ajax({
				url: this.GET_GOODS_TYPE_URL,
				data: params.data,
				success: params.success,
				error: params.error,
				complete: params.complete,
				beforeSend: params.beforeSend,
			});
        },
       
    })
})