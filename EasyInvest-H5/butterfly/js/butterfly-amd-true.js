require.config({baseUrl:"../",urlArgs:"v=1471440058655",packages:[{name:"butterfly",location:"butterfly/js",main:"butterfly"}],paths:{text:"butterfly/libs",domReady:"butterfly/libs",i18n:"butterfly/vendor/requirejs-i18n/i18n",json:"butterfly/libs",css:"butterfly/libs",view:"butterfly/libs",framework:"butterfly",jquery:"butterfly/libs",zepto:"butterfly/libs-dialog",underscore:"butterfly/libs",backbone:"butterfly/libs",fastclick:"butterfly/libs",iscroll:"butterfly/libs",iscrollprobe:"butterfly/libs-listview",moment:"butterfly/vendor/moment/moment",spin:"butterfly/vendor/spinjs/spin",swipe:"butterfly/vendor/swipe/swipe",snap:"butterfly/vendor/snap/snap","butterfly/fastclick":"butterfly/libs","listview/ListView":"butterfly/libs-listview","shared/js/datasource":"butterfly/libs-listview",components:"butterfly/js/components",listview:"butterfly/js/components/listview",dialog:"butterfly/libs-dialog",calendar:"butterfly/js/components/calendar/calendar",datepicker:"butterfly/js/components/datepicker/js/date",notification:"butterfly/js/components/notification",indicator:"butterfly/js/components/indicator"},waitSeconds:30,shim:{iscroll:{exports:"IScroll"},fastclick:{exports:"FastClick"},iscrollprobe:{exports:"iScroll"}}}),require(["domReady!","butterfly","iscroll","butterfly/fastclick"],function(a,b,c,d){navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)&&$("html").addClass("ipad ios7"),setTimeout(function(){window.scrollTo(0,1)},0),d.attach(document.body)});