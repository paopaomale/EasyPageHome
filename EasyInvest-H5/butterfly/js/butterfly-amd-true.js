require.config({baseUrl:"../",urlArgs:"v=1470843535068",packages:[{name:"butterfly",location:"butterfly/js",main:"butterfly"}],paths:{text:"butterfly/libs",domReady:"butterfly/libs",i18n:"butterfly/vendor/requirejs-i18n/i18n",json:"butterfly/libs",css:"butterfly/libs",view:"butterfly/libs",framework:"butterfly",jquery:"butterfly/libs",zepto:"butterfly/vendor/zepto/zepto",underscore:"butterfly/libs",backbone:"butterfly/libs",fastclick:"butterfly/libs",iscroll:"butterfly/vendor/iscroll/iscroll-lite",iscrollprobe:"butterfly/vendor/iscroll/iscroll-probe",moment:"butterfly/vendor/moment/moment",spin:"butterfly/vendor/spinjs/spin",swipe:"butterfly/vendor/swipe/swipe",snap:"butterfly/vendor/snap/snap",components:"butterfly/js/components",listview:"butterfly/js/components/listview",dialog:"butterfly/js/components/dialog/dialog",calendar:"butterfly/js/components/calendar/calendar",datepicker:"butterfly/js/components/datepicker/js/date",notification:"butterfly/js/components/notification",indicator:"butterfly/js/components/indicator"},waitSeconds:30,shim:{iscroll:{exports:"IScroll"},fastclick:{exports:"FastClick"},iscrollprobe:{exports:"iScroll"}}}),require(["domReady!","butterfly","iscroll","fastclick"],function(a,b,c,d){navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)&&$("html").addClass("ipad ios7"),setTimeout(function(){window.scrollTo(0,1)},0),d.attach(document.body)});