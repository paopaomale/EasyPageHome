define([
    'backbone', 
    "text!shared/profile/profile.json", 
    'dialog',
    "json!shared/back-code.json"
    ], function (Backbone, json, Dialog, BackCode) {
// 不用text读取json哦，后面要改

    //   node.js代理接口
    //"text!changan/profile/profile-proxy.json";
    //   部署手机时用
    //"text!changan/profile/profile-development.json";

    var basePath = JSON.parse(json).serverUrl;
    return {
        basePath: basePath,
        pageSize: 10, //通用列表分页大小
        path_login: basePath + '/main/user/relogin',
        request: function (paras) {
            var url = decodeURI(location.href);
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var returnValue;
            for (i = 0; i < paraString.length; i++) {
                var tempParas = paraString[i].split('=')[0];
                var parasValue = paraString[i].split('=')[1];
                if (tempParas === paras)
                    returnValue = parasValue;
            }

            if (typeof(returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
        },

        ajax: function (params) {
            var me = this;

            var callbacks = _.pick(params, ['success', 'error']);

            var defaults = {
                dataType: "json",
                type: !params.type && params.type || "GET",
                timeout: 15000,
                error: function () {
                    console.log('Call API error');
                    callbacks.error(arguments);
                }
            };

            //带有默认值
            params = _.extend(defaults, params);
            if (typeof params.data === "undefined")params.data = {};
            var token = window.localStorage.getItem("token") || '';

            if (params.noToken) {
                delete params.noToken;
            } else {
                params.data['token'] = token;
            }

            //代理回调
            var paramsWithProxy = _.extend(params, {
                success: function (response) {
                    if (response.result === '-1') {
                        window.localStorage.removeItem('token');
                        var myinfo = JSON.parse(localStorage.getItem('myInfo'));
                        var mb = myinfo ? myinfo.mobile : '';
                        me.refreshToken({
                            txtKey: window.localStorage['txtKey'],
                            mod: window.localStorage['mod'],
                            mobile: mb,
                            success: function (data) {
                                if (data.result == 0) {
                                    //成功则继续刚才的请求
                                    window.localStorage.setItem("txtKey", data.data.password);
                                    window.localStorage.setItem("mod", data.data.key);
                                    window.localStorage.setItem("token", data.data.token);
                                    params.data.token = data.data.token;
                                    $.ajax(params);
                                } else {
                                    window.localStorage.removeItem('myInfo');
                                    Dialog.showToast('登录过期，请重新登录');
                                    butterfly.navigate('my/login.html');
                                }

                            },
                            error: function (err) {
                                Dialog.showToast(err);
                            }
                        });
                    } else {
                        if ("auth-fail" === response.other) {
                            localStorage.clear();
                            sessionStorage.clear();
                        }
                        callbacks.success(response);
                    }
                },
                error: params.error
            });
            return $.ajax(paramsWithProxy);
        },
        //判断是否为空
        isNull: function (data) {
            var def = true;
            if (typeof data == "string") {
                data = data.trim();
            }
            if ((typeof data !== "undefined" && data && data.length !== 0) || typeof data === "function") {
                def = false;
            }
            return def;
        },
        statusString: function (statuCode) {
            var statuCodeObj = BackCode;

            return !statuCodeObj[statuCode] && "网络开小差了,请稍后再试" || statuCodeObj[statuCode];
        },

        refreshToken: function (params) {
            var me = this;
            this.ajax({
                url: this.path_login,
                type: 'post',
                noToken: true,
                data: {
                    mobile: params.mobile,
                    password: params.txtKey,
                    mod: params.mod
                },
                success: params.success,
                beforeSend: params.beforeSend,
                error: params.error,
                complete: params.complete
            });
        },
        haveToken: function () {
            var token = localStorage.getItem('token');
            if (!token) {
                // Dialog.showToast('请先登录');
                butterfly.navigate('my/login.html');
                return false;
            }
            return true;
        }
    } //return
});
