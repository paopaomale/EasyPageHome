define(function(){"use strict";function a(a,b){switch(b){case"css":a.rel="stylesheet",a.type="text/css";break;case"html":a.rel="import"}return a}function b(a){var b=a.split("/").pop();return b.indexOf(".")<1?"":b.split(".").pop()}var c=Function("return this")(),d={load:function(d,e,f,g){if(g.isBuild)return void f();if(!document.head)throw new Error("DOM must be loaded before HTMLImports");var h=document.createElement("link");h=a(h,b(d));var i="",j=g.link||{};j.ignoreBaseUrl||(i=c.location.pathname+g.baseUrl),h.href=i+d,h.addEventListener("load",function(){f(h)}),h.addEventListener("error",function(){throw new Error("Unable to load link resource using requirejs-link plugin")}),document.head.appendChild(h)}};return d});