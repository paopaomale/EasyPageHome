require.config({
	baseUrl: '../',
	urlArgs:'v=1471335481591',
	packages: [{
		name: 'butterfly',
		location: 'butterfly/js',
		main: 'butterfly'
	}],
	paths: {
		// require.js plugins
		text: 'butterfly/libs',
		domReady: 'butterfly/libs',
		i18n: 'butterfly/vendor/requirejs-i18n/i18n',
        json:'butterfly/libs',
		css: 'butterfly/libs',
		view: 'butterfly/libs',

		framework: 'butterfly',

		// lib
		jquery: 'butterfly/libs',
		zepto: 'butterfly/vendor/zepto/zepto',
		underscore: 'butterfly/libs',
		backbone: 'butterfly/libs',
		fastclick: 'butterfly/libs',
		iscroll: 'butterfly/vendor/iscroll/iscroll-lite',
		iscrollprobe:'butterfly/vendor/iscroll/iscroll-probe',
		moment: 'butterfly/vendor/moment/moment',
		spin: 'butterfly/vendor/spinjs/spin',
		swipe: 'butterfly/vendor/swipe/swipe',
		snap: 'butterfly/vendor/snap/snap',
		
		// components
		components: 'butterfly/js/components',
		listview: 'butterfly/js/components/listview',
		dialog: 'butterfly/js/components/dialog/dialog',
		calendar: 'butterfly/js/components/calendar/calendar',
		datepicker: 'butterfly/js/components/datepicker/js/date',
		notification: 'butterfly/js/components/notification',
		indicator: 'butterfly/js/components/indicator'

	},
	waitSeconds: 30,
	shim: {
		iscroll: {exports: 'IScroll'},
		fastclick: {exports: 'FastClick'},
		iscrollprobe: {exports: 'iScroll'}
	}
});

// 注释iscroll,并删除多次引用fastclick
require(['domReady!', 'butterfly', 'iscroll', 'fastclick'],
	function(domReady, Butterfly, IScroll, FastClick){

		//ios7 issue fix
		if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
  		$('html').addClass('ipad ios7');
		}
		//iOS scroll to top
		setTimeout(function() {window.scrollTo(0, 1);}, 0);


		//enable fastclick
		FastClick.attach(document.body);

		//this will stop the page from scrolling without IScroll
		// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
});
