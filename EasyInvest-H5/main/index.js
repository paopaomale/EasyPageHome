/*
@ Author  江霖
*/
define([
        'butterfly/view',
        'butterfly',
        // 'main/whatsnew',
        'json!main/moduleConfig.json',
        // 'dialog',
        // 'modules-manager/module-manager',
        'shared/js/filter-html'
    ],
    // function (View, Butterfly, WhatsnewView, modules, dialog, ModuleManager) {
    function (View, Butterfly, modules) {

        return View.extend({
            pages: [],
            pageUrl: [],
            currentShowPage: parseInt(modules.mainPage),
            // isSetTimeOut: 0, //安卓返回键标识（第一次进来设置为1，第二次进来设置为2）
            events: {
                'click .tab-item': 'tabClick'
            },
            render: function () {
                var me = this;
                // me.guide();
                me.initFooter();
                // me.bindBackButton();

                sessionStorage.clear();
                return this;
            },
            onShow: function (options) {
                if (options && options.pageIndex >= 0) this.currentShowPage = options.pageIndex;
                this.$('#content').height = innerHeight - this.$('footer').height;
                this.showPage(this.currentShowPage, options);
                this.swicthIcon(this.currentShowPage);
            },
            preload: function (index, mod) {
                if (mod.preload) {
                    this.appendPage(index, false);
                }
            },
            // bindBackButton: function () {
            //     var me = this;
            //     window.changanBackbutton = function () {
            //         var hash = window.location.hash;
            //         if (hash === '' || hash === '#') {

            //             me.isSetTimeOut++;
            //             if (me.isSetTimeOut === 2) {
            //                 navigator.app.exitApp(); //退出程序
            //                 return;
            //             }
            //             dialog.showToast('再按一次退出应用');
            //             setTimeout(function () {
            //                 me.isSetTimeOut = 0;
            //             }, 3000);
            //         }else if(hash === '#main/container-self.html'){
            //             var iframe = $('#container-self #outerPage')[0];
            //             var frameHash = iframe.contentWindow.location.hash;
            //             if(frameHash.indexOf('#insurance/index.html')>-1){
            //                 butterfly.back(-2);
            //             }else{
            //                 butterfly.back();
            //             }
            //         } else {
            //             butterfly.back();
            //         }
            //     };
            //     document.addEventListener('backbutton', window.changanBackbutton, false);
            // },
            // 当前是否已经登录
            isLogin: function(){
                return window.localStorage.getItem('token') ? true : false;
            },
            tabClick: function (e) {
                var me = this,
                    target = e.target;

                if (target.className.indexOf('tab-item') === -1) target = this.$(target).parents('.tab-item')[0];
                var index = $(target).attr('data-navigator');
                if (parseInt(index) === this.currentShowPage) return;
                this.currentShowPage = parseInt(index);
                this.showPage(this.currentShowPage);
                this.swicthIcon(this.currentShowPage);
            },
            swicthIcon: function (index) {
                this.$('.tab-item').removeClass('actived');
                this.$('.tab-item').eq(index).addClass('actived');
            },
            initFooter: function () {
                var me = this;
                _.each(modules.data, function (mod, index) {
                    me.pageUrl.push(mod.PageUrl);
                    me.pages.push(null);
                    // var tp = _.template($('#footer-template').html(), {
                    //     rows: mod,
                    //     index: index
                    // });
                    // me.$('footer').append(tp);
                    var i = index;
                    me.preload(i, mod);
                });
            },
            appendPage: function (index, isShow) {
                var me = this;
                var i = index;
                require(['view!' + me.pageUrl[i] + '.html'], function (ViewClass) {
                    var view = new ViewClass();
                    me.pages[i] = view;
                    view.render();
                    if (isShow) {
                        $('#mainIndex #content').html(view.el);
                        view.onShow();
                    }
                }, function (e) {
                    console.error('Load View Eorror');
                })
            },
            showPage: function (index, options) {
                var me = this;
                if (me.pages[index]) {
                    $('#mainIndex #content').html(me.pages[index].el);
                    //显示时需要重新绑定事件，因为之前的页面被从Dom树中移除了
                    me.pages[index].delegateEvents();
                    me.pages[index].onShow(options);
                } else {
                    me.appendPage(index, true);
                }
            },
            // checkUpdates: function () {
            //     if (!window.localStorage.updatePromptTime || ((new Date().getTime()) - window.localStorage.updatePromptTime) > 3 * 60 * 1000) {
            //         window.localStorage.updatePromptTime = new Date().getTime(); //记录检查更新的时间

            //         if (window.cordova) {
            //             cordova.getAppVersion.getPackageName(function (app) {
            //                 //iOS平台把app名字先设定为固定的，因为iOS目前打包需要修改包名才能行
            //                 if(device.platform.toLowerCase()==='ios')app="cn.com.changan.caecapp";
            //                 new ModuleManager(app).checkUpdates(false, function () {
            //                     },
            //                     function (error) {
            //                         console.log('we got an error:%s', error);
            //                     });
            //             })
            //         }
            //     }
            // },
            // guide: function(){
            //     var me = this;
            //     // 引导页处理
            //     var firstOpen = JSON.parse(window.localStorage.getItem('firstOpen'));
            //     //第一次打开app, firstOpen为true  或者 firstOpen 不存在时
            //     if(firstOpen || firstOpen == null){
            //         window.localStorage.setItem('firstOpen',false);
            //         var whatsnew = new WhatsnewView();
            //         me.el.appendChild(whatsnew.render().el);
            //         whatsnew.open();
            //     }
            // }
        }); //view define
    });
