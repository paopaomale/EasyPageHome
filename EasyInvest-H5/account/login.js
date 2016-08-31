define(["butterfly/view","butterfly","../shared/js/loading","../account/account-client","dialog"],function(a,b,c,d,e){return a.extend({events:{"click .go-back":"goBack","input #userName,#userPassword":"isCloseHide","click .close-container":"clearInput","click #login-btn":"onLogin","click .register":"onRegister","click .forGetPassword":"onforGetPWD"},render:function(){var a=this;a.initLoading()},onShow:function(){console.log("render")},initLoading:function(){this.loading=new c({parentEl:this.$(".container")[0]})},onRegister:function(){butterfly.navigate("account/register.html")},onforGetPWD:function(){butterfly.navigate("account/reset-pwd-before.html",{isPopupView:!0})},onLogin:function(a){var b=this,c=b.$("#userName").val().trim(),f=b.$("#userPassword").val().trim(),g={username:c,password:f};return""==g.username||""==g.password?(e.showToast("手机号码或密码不能为空！"),!1):g.username.length<11?(e.showToast("手机号码长度不正确！"),!1):void d.onLogin({data:g,noToken:!0,type:"post",complete:function(){this.loading&&this.loading.show()},success:function(a){0==a.result?(e.showToast("登录成功"),b.loadingSuccess(a),localStorage.setItem("account",c),localStorage.setItem("password",f)):e.showToast(a.error)},beforeSend:function(){this.loading&&this.loading.hide()}})},loadingSuccess:function(a){localStorage.setItem("myInfoData",JSON.stringify(a)),localStorage.setItem("token",a.data.token),butterfly.navigate("#",{navigateSource:"loginSuccess"})},isCloseHide:function(a){var b=$(a.currentTarget);0!=b.val().trim().length?b.next().show():b.next().hide()},clearInput:function(a){$(a.currentTarget).prev().val(""),$(a.currentTarget).hide()}})});