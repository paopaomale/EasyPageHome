(function(root, factory) {

	if (typeof define === 'function' && define.amd) {
		define(['exports', 'underscore', 'jquery', 'backbone', 'view'], function(exports, _, $, Backbone, ViewPlugin){
			root.Butterfly = factory(root, exports, _, $, Backbone, ViewPlugin);
		});

	} else {
		root.Butterfly = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$), Backbone);
	}

})(this, function(root, Butterfly, _, $, Backbone, ViewPlugin){

	// Plugin System
	// ---------------

	// use a plugin in all view instances
	Backbone.View.use = function(Plugin) {
		_.extend(this.prototype, Plugin);
		return this;
	}

	// use plugin in this view instance
	Backbone.View.prototype.use = function(Plugin) {
		_.extend(this, Plugin);
		return this;
	}

	//Butterfly start
	Butterfly.VERSION = '1.1';

  // Butterfly.Router
  // ---------------
  //
  var Router = Butterfly.Router = Backbone.Router.extend({
		routes: {
			'*path(?*queryString)': 'any',
		},
		any: function(path, queryString){
			console.log('route: %s ? %s', path, queryString);

			if(queryString) {
				queryString = decodeURI(queryString);
				var queryObj = JSON.parse('{"' + queryString.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
				this.routingOptions = $.extend({}, queryObj, this.routingOptions);
				this.routingOptions['queryString'] = queryString;
			}

			root.butterfly.route(path, this.routingOptions);
			delete this.routingOptions;
		}
	});

  // hack of Backbone.history.navigate
  // so when call Backbone.history.navigate, we can pass options to our route
  var backboneNavigate = Backbone.history.navigate;
  Backbone.history.navigate = function(fragment, options) {
  	root.butterfly.navigate(fragment, options);
  }

  Butterfly.history = Backbone.history;

  // hack of window.history
  // so we can pass options to our route.
  // like this: window.history.go('somepage',options)
  // or like this: window.history.go(-1, options)
  // or like this: window.history.back(options)
  var browserGo = window.history.go;
  var browserBack = window.history.back;
  window.history.go = function(dest,options) {
  	root.butterfly.back(dest, options);
  };
  window.history.back = function(options) {
  	root.butterfly.back(undefined, options);
  };


  // Butterfly.Application
  // ---------------
  //
	var Application = Butterfly.Application = function(el){
		this.el = el;
	};
	_.extend(Application.prototype, Backbone.Events);
	_.extend(Application.prototype, {

		navigate: function(fragment, options){
			//default options
			options = options || {trigger: true};
			//default trigger
			options.trigger = (options.trigger == undefined) ? true : options.trigger;
			//pass params 
			this.router.routingOptions = options; 
            /**
            * 这里修改是为了满足这样的需求：
            * navigate到一个新的页面的时候，如果这个页面中rootView.stack里面
            * 那么就直接回到这个页面，并且把它上面的页面都移除
            */
            butterfly.rootView.stack.reverse();
            var targetIndex; 
            _.find(butterfly.rootView.stack,function(v,index){ 
                if(v.path.slice(1)==fragment){
                	//此处修改，为了跳转页面为popupView情况正常跳转。
                	if(v.options) v.options.isPopupView = false;
                    targetIndex=index;
                    return v.path.slice(1)==fragment;
                } 
            }); 
            butterfly.rootView.stack.reverse(); 
            if(targetIndex) { 
               window.history.go(-targetIndex,options); 
            }else {
               backboneNavigate.call(Backbone.history, fragment, options);
            }   
		},

		back: function(dest, options) {
            /*本出修改是为了实现在android环境下，
            * 点击返回建的回退时，能够在当前View里面能有回调函数，
            * 而不需要在绑定返回键的回调里面做判断hash的操作
            */
            var currentView=this.rootView.stack[this.rootView.stack.length-1].view;
            if(currentView.onBacking&&location.hash===this.rootView.stack[this.rootView.stack.length-1].path){
            	/**
            	 * 使用onBacking,新增可选参数params。当回退页面时候可传入参数给回退页面。
            	 * 主要用于回退页面与当前页面有状态修改时。
            	 */
                currentView.onBacking(function(doIt,params){
                	if(typeof params != "undefined"){
                		options = $.extend({}, params, options);
                	}
                    doIt&&this.doBack(dest,options);
                }.bind(this));
            }else{
                this.doBack(dest,options);
            }
		},
        doBack:function(dest,options){
          var t = typeof dest;
          if(t === "string") {
				// Todo: ugly but no choice now!
				if(this.rootView.backTo) {
					this.rootView.backTo(dest,options);
				}else {
					console.error('root view不支持backTo方法');
				}
			}else if(t === "number") {
				this.router.routingOptions = options;
				browserGo.call(window.history, dest);
			}else {
				this.router.routingOptions = options;
				browserBack.call(window.history);
			}  
        },
		route: function(path, options){
			if (this.rootView.route) {
				this.rootView.route(path, options);
			}else {
				console.error('rootView不支持route方法');
			} 
		},

		//launch application
		fly: function(){
			var me = this;

			this.scanRootView(function(view) {
				me.rootView = view;
				me.router = new Butterfly.Router();

				var pathname = window.location.pathname;
				var rootPath = pathname.substr(0, pathname.lastIndexOf('/'));
				console.log("start history with root: [%s]", rootPath);
				Backbone.history.start({
					pushState: false,
					root: rootPath
				});

//				view.render(); //注释掉,是为了解决进入应用的首页时,render会被调用两次的BUG
				view.show();

			}, function(err) {

				console.error("fail to load root view: %s", err);
				throw err;
			});

			return this;
		},

		scanRootView: function(success, fail){
			var me = this;

			var rootView = this.el.querySelector('[data-view]');
			if (!rootView) {
				throw new Error('root view not found');
			}

			// 向前兼容,默认给rootView添加has-subview属性
			rootView.setAttribute('has-subview','true');

			ViewPlugin.loadView(rootView, function(View){

				var view = new View();

				success(view);

			}, fail);
		}

	});

	Butterfly.Application.extend = Backbone.Router.extend;

	var run = function(AppClass) {
		root.butterfly = new AppClass(document.body);
		root.butterfly.fly();
	};

	$(function(){
		var path = $(document.body).attr('application');
		if(path) {
			require([path], function(MyApp) {
				if(!_.isFunction(MyApp) || !_.isFunction(MyApp.prototype.fly)) {
					var error = '自定义Application必须从Butterfly.Application继承';
					throw new Error(error);
				}else {
					run(MyApp);
				}
			});
		}else {
			run(Application);
		}
	});

	return Butterfly;
});
