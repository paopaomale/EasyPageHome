!function(a,b){"function"==typeof define&&define.amd?define(["exports","underscore","backbone"],function(c,d,e){return b(a,d,e)}):b(a,a._,a.Backbone)}(this,function(a,b,c){var d=["slideInLeft","slideInRight","slideOutLeft","slideOutRight","slideInUp","slideInDown","slideOutUp","slideOutDown","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig"],e={animate:function(a,b){var c=this;this.$el.addClass("animated "+a),this.$el.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){a===event.animationName&&(c.$el.removeClass("animated "+a),b&&b())})}};return e=d.reduce(function(a,b){return fn_name="animate"+b.charAt(0).toUpperCase()+b.substring(1),a[fn_name]=function(a){this.animate(b,a)},a},e)});