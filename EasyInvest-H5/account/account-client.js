define(["shared/js/client"],function(a){return _.extend(a,{SMS_URL:a.basePath+"/auth/sms",REGISTER_URL:a.basePath+"/user/register",GET_MESSAGE_URL:"../account/json/my-message.json",GET_INTEGRAL_LIST_URL:"../account/json/my-message.json",GET_MY_GOOODS_LIST_URL:"../account/json/my-goods.json",GET_GOODS_TYPE:"../account/json/goods-type.json",GET_ADDRESS_DATA_URL:"../account/json/address-data.json",SET_DEFAULT_ADDRESS_URL:"../account/json/setDefaultAddress.json",DELETE_ADDRESS_URL:"../account/json/setDefaultAddress.json",EDIT_ADDRESS_URL:"../account/json/setDefaultAddress.json",GET_BIND_GOODS_LIST:"../account/json/getGoodsList.json",GET_ALL_GOODS_LIST:"../account/json/getAllGoodsList.json",BIND_GOODS:"../account/json/setDefaultAddress.json",UNBIND_GOODS_URL:"../account/json/setDefaultAddress.json",ON_LOGIN_URL:a.basePath+"/user/login",MODIFY_INFO_URL:a.basePath+"/user/updatemyinfo",modifyInfo:function(a){this.ajax({url:this.MODIFY_INFO_URL,data:a.data,beforeSend:a.beforeSend,success:a.success,error:a.erro,complete:a.complete})},onLogin:function(a){this.ajax({url:this.ON_LOGIN_URL,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},unbindGoods:function(a){this.ajax({url:this.BIND_GOODS,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},bindGoods:function(a){this.ajax({url:this.BIND_GOODS,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},getAllGoodsList:function(a){this.ajax({url:this.GET_ALL_GOODS_LIST,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},getBindGoodsList:function(a){this.ajax({url:this.GET_BIND_GOODS_LIST,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},editShippingAddress:function(a){this.ajax({url:this.EDIT_ADDRESS_URL,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},getGoodsType:function(a){this.ajax({url:this.GET_GOODS_TYPE,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},getAddressManagementData:function(a){this.ajax({url:this.GET_ADDRESS_DATA_URL,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},setDefaultAddress:function(a){this.ajax({url:this.SET_DEFAULT_ADDRESS_URL,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},deleteAddress:function(a){this.ajax({url:this.DELETE_ADDRESS_URL,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})}})});