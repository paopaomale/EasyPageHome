define(["backbone","text!shared/profile/profile.json","dialog","json!shared/back-code.json"],function(a,b,c,d){var e=JSON.parse(b).serverUrl;return{basePath:e,pageSize:10,path_login:e+"/main/user/relogin",request:function(a){var b,c=decodeURI(location.href),d=c.substring(c.indexOf("?")+1,c.length).split("&");for(i=0;i<d.length;i++){var e=d[i].split("=")[0],f=d[i].split("=")[1];e===a&&(b=f)}return"undefined"==typeof b?"":b},ajax:function(a){var b=this,d=_.pick(a,["success","error"]),e={dataType:"json",type:!a.type&&a.type||"POST",timeout:15e3,error:function(){console.log("Call API error"),d.error(arguments)}};a=_.extend(e,a),"undefined"==typeof a.data&&(a.data={});var f=window.localStorage.getItem("token")||"";a.noToken?delete a.noToken:a.data.token=f;var g=_.extend(a,{success:function(e){if("-1"===e.result){window.localStorage.removeItem("token");var f=JSON.parse(localStorage.getItem("myInfo")),g=f?f.mobile:"";b.refreshToken({txtKey:window.localStorage.txtKey,mod:window.localStorage.mod,mobile:g,success:function(b){0==b.result?(window.localStorage.setItem("txtKey",b.data.password),window.localStorage.setItem("mod",b.data.key),window.localStorage.setItem("token",b.data.token),a.data.token=b.data.token,$.ajax(a)):(window.localStorage.removeItem("myInfo"),c.showToast("登录过期，请重新登录"),butterfly.navigate("my/login.html"))},error:function(a){c.showToast(a)}})}else"auth-fail"===e.other&&(localStorage.clear(),sessionStorage.clear()),d.success(e)},error:a.error});return $.ajax(g)},isNull:function(a){var b=!0;return"string"==typeof a&&(a=a.trim()),("undefined"!=typeof a&&a&&0!==a.length||"function"==typeof a)&&(b=!1),b},statusString:function(a){var b=d;return!b[a]&&"网络开小差了,请稍后再试"||b[a]},refreshToken:function(a){this.ajax({url:this.path_login,type:"post",noToken:!0,data:{mobile:a.mobile,password:a.txtKey,mod:a.mod},success:a.success,beforeSend:a.beforeSend,error:a.error,complete:a.complete})},haveToken:function(){var a=localStorage.getItem("token");return a?!0:(butterfly.navigate("my/login.html"),!1)}}});