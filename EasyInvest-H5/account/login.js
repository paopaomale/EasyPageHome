define(["butterfly/view","butterfly","../shared/js/loading","../account/account-client"],function(a,b,c,d,e){return a.extend({events:{"click .go-back":"goBack","input #userName,#userPassword":"isCloseHide","click .close-container":"clearInput","click #login-btn":"onLogin","click .register":"onRegister","click .forGetPassword":"onforGetPWD"},render:function(){var a=this;a.initLoading()},onShow:function(){console.log("render")},initLoading:function(){this.loading=new d({parentEl:this.$(".container")[0]})},onRegister:function(){butterfly.navigate("account/register.html")},onforGetPWD:function(){console.log("onforGetPWD")},onLogin:function(a){var b=this;b.$("#userName").val().trim(),b.$("#userPassword").val().trim();e.onLogin({data:data,complete:function(){this.loading&&this.loading.show()},success:function(a){console.log(a)},error:function(a){console.log("onLogin error!")},beforeSend:function(){this.loading&&this.loading.hide()}})},isCloseHide:function(a){var b=$(a.currentTarget);0!=b.val().trim().length?b.next().show():b.next().hide()},clearInput:function(a){$(a.currentTarget).prev().val("")}})});