define(["shared/js/client"],function(a){return _.extend(a,{AUTH_SMS_URL:a.basePath+"/auth/sms",AUTH_CHECKSMS_URL:a.basePath+"/auth/checksms",USER_REGISTER_URL:a.basePath+"/user/register",USER_PHONE_URL:a.basePath+"/auth/phone",USER_FORGET_URL:a.basePath+"/user/forget",GET_MESSAGE_URL:a.basePath+"/message/get",GET_INTEGRAL_LIST_URL:a.basePath+"/points/get",GET_MY_GOOODS_LIST_URL:a.basePath+"/product/deal",GET_ADDRESS_DATA_URL:a.basePath+"/user/address/get",SET_DEFAULT_ADDRESS_URL:"../account/json/setDefaultAddress.json",DELETE_ADDRESS_URL:a.basePath+"/user/address/del",EDIT_ADDRESS_URL:a.basePath+"/user/address/modify",ADD_ADDRESS_URL:a.basePath+"/user/address/add",GET_BIND_GOODS_LIST:a.basePath+"/product/my",GET_ALL_GOODS_LIST:a.basePath+"/product/get",BIND_GOODS:a.basePath+"/product/bind",UNBIND_GOODS_URL:a.basePath+"/product/unbind",ON_LOGIN_URL:a.basePath+"/user/login",MODIFY_INFO_URL:a.basePath+"/user/updatemyinfo",addAdress:function(a){this.ajax({url:this.ADD_ADDRESS_URL,data:a.data,type:"POST",beforeSend:a.beforeSend,success:a.success,error:a.error,complete:a.complete})},modifyInfo:function(a){this.ajax({url:this.MODIFY_INFO_URL,data:a.data,beforeSend:a.beforeSend,success:a.success,error:a.erro,complete:a.complete})},onLogin:function(a){this.ajax({url:this.ON_LOGIN_URL,data:a.data,noToken:a.noToken||"",type:a.type||"POST",success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},unbindGoods:function(a){this.ajax({url:this.UNBIND_GOODS_URL,data:a.data,type:"POST",success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},bindGoods:function(a){this.ajax({url:this.BIND_GOODS,data:a.data,type:"POST",success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},getAllGoodsList:function(a){this.ajax({url:this.GET_ALL_GOODS_LIST,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},getBindGoodsList:function(a){this.ajax({url:this.GET_BIND_GOODS_LIST,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},editShippingAddress:function(a){this.ajax({url:this.EDIT_ADDRESS_URL,data:a.data,type:"POST",success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},getAddressManagementData:function(a){this.ajax({url:this.GET_ADDRESS_DATA_URL,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},setDefaultAddress:function(a){this.ajax({url:this.SET_DEFAULT_ADDRESS_URL,data:a.data,success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})},deleteAddress:function(a){this.ajax({url:this.DELETE_ADDRESS_URL,data:a.data,type:"POST",success:a.success,error:a.error,complete:a.complete,beforeSend:a.beforeSend})}})});