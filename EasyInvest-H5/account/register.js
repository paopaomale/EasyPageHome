/*
@ Author  江霖
*/
define([
	'butterfly/view',
	'butterfly',
	'text!account/register.html',
	'account/account-client',
	'notification'
	], 
	function(View, Butterfly, ViewTemplate, accountClient, Notification){

	return View.extend({
		events: {
			"click .go-back": "goBack",
			"click .register_box_row": "focusInput",
			"click .getCode": "getCode",
			"click #submite": "goRegister",
		},
		render:function(){
			console.log('render');
		},
		onShow: function(){
			console.log('render');
		},
		focusInput: function(e){
			$(e.currentTarget).find('input').focus()
		},
		getCode: function(e){
			e.stopPropagation()
			console.log("getCode");
			var phone = this.$('#phone input').val().replace(/(^\s*)|(\s*$)/g,"");

			if(phone === ""){
				 Notification.show({
                    type: 'info',
                    message: "手机号不能为空"
                });
				return
			}

			var data = {
				phone: phone
			}
			accountClient.ajax({
				url: accountClient.SMS_URL,
                type: "post",
                data: data,
                beforeSend: function() {
                },
                success: function(data) {
                    if (data && data.result === 0) {
                    }
                },
                error: function(error) {
                },
                complete: function() {
                }
			})
		},
		goRegister: function(){
			var me = this;
			console.log("goRegister");
			var name = this.$('#name input').val().replace(/(^\s*)|(\s*$)/g,"");
			var phone = this.$('#phone input').val().replace(/(^\s*)|(\s*$)/g,"");
			var code = this.$('#code input').val().replace(/(^\s*)|(\s*$)/g,"");
			var referral = this.$('#referral input').val().replace(/(^\s*)|(\s*$)/g,"");
			var password = this.$('#password input').val();
			var checkPassword = this.$('#check-password input').val();

			var data = {
				name:name,
				phone:phone,
				code:code,
				referral:referral,
				password:password,
			};

			if(!this.checkData(data,checkPassword)){
				return
			}

			accountClient.ajax({
				url: accountClient.REGISTER_URL,
                type: "post",
                data: data,
                beforeSend: function() {
                },
                success: function(data) {
                    if (data && data.result === 0) {
                    }
                },
                error: function(error) {
                },
                complete: function() {
                }
			})
		},
		checkData: function(data,checkPassword){
			// if(data.name === ""){
			// 	 Notification.show({
   //                  type: 'info',
   //                  message: "用户名不能为空"
   //              });
			// 	return false;
			// }
			if(data.phone === ""){
				 Notification.show({
                    type: 'info',
                    message: "手机号不能为空"
                });
				return false;
			}
			if(data.code === ""){
				 Notification.show({
                    type: 'info',
                    message: "验证码不能为空"
                });
				return false;
			}
			if(data.password === "" || checkPassword === ""){
				 Notification.show({
                    type: 'info',
                    message: "密码不能为空"
                });
				return false;
			}
			if(data.password !== checkPassword){
				 Notification.show({
                    type: 'info',
                    message: "两次输入的密码不一致"
                });
				return false;
			}
			return true;
		}
	}); //view define
});