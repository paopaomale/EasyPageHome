require.config({baseUrl:"../",urlArgs:"v=1470534849698",packages:[{name:"butterfly",location:"butterfly/js",main:"butterfly"}],paths:{text:"butterfly/libs",domReady:"butterfly/libs",i18n:"butterfly/vendor/requirejs-i18n/i18n",json:"butterfly/libs",css:"butterfly/libs",view:"butterfly/libs",framework:"butterfly",jquery:"butterfly/libs",zepto:"butterfly/vendor/zepto/zepto",underscore:"butterfly/libs",backbone:"butterfly/libs",fastclick:"butterfly/libs",iscroll:"butterfly/vendor/iscroll/iscroll-lite",moment:"butterfly/vendor/moment/moment",spin:"butterfly/vendor/spinjs/spin",swipe:"butterfly/vendor/swipe/swipe",snap:"butterfly/vendor/snap/snap",components:"butterfly/js/components",listview:"butterfly/js/components/listview",dialog:"butterfly/js/components/dialog/dialog",calendar:"butterfly/js/components/calendar/calendar",datepicker:"butterfly/js/components/datepicker/js/date",notification:"butterfly/notification",indicator:"butterfly/js/components/indicator"},waitSeconds:30,shim:{iscroll:{exports:"IScroll"},fastclick:{exports:"FastClick"}}}),require(["domReady!","butterfly","fastclick"],function(a,b,c){navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)&&$("html").addClass("ipad ios7"),setTimeout(function(){window.scrollTo(0,1)},0),c.attach(document.body)});