define(["underscore","jquery","notification","components/task/Task","components/task/TaskQueue","components/downloadManager","dialog","iscroll"],function(a,b,c,d,e,f,g){var h=function(a){void 0===a&&(a=butterfly.config),this.appConfig=a,this.appKey=a.appKey,this.secret=a.appSecret,this.serverUrl=a.chameleonUrl,this.appRootPath=a.appRootPath,this.identifier=a.identifier,this.appVersion=a.version,this.androidDownloadUrl=a.androidDownloadUrl+"/bsl-web/mam/apps/download/"+this.identifier+"/android?appKey="+this.appkey,this.iOSDownloadUrl=a.iosDownloadUrl+"/bsl-web/mam/apps/download/"+this.identifier+"/ios?appKey="+this.appkey},i=d.extend({constructor:function(a){this.url=a},execute:function(a,c){this.ajax=b.ajax({url:this.url,success:function(b){a(JSON.parse(b))},error:c})},abort:function(){this.ajax.abort()}}),j=d.extend({storageDirectory:function(){return this.appConfig.appRootPath},wwwDirecotry:function(){return this.storageDirectory()+this.appConfig.appFolderName},constructor:function(a,b,c){this.fs=a,this.module=b,this.appConfig=c},execute:function(a,b){var c=this.appConfig.chameleonUrl+"/mam/api/mam/clients/files/"+this.module.bundle+"?appkey="+this.appConfig.appkey,d=this.wwwDirecotry()+this.module.identifier+".zip",e=this;f.onDownload(this.module.identifier,c,this.module.identifier,d,function(a,b){},function(c,g,h){console.log("DownLoad success"),zip.unzip(d,e.wwwDirecotry()+e.module.identifier.split(".")[1]+"/",function(){console.log("unzip success");var c=e.appConfig.appRootPath+this.appConfig.appFolderName+"/"+h.name;f.removeTask(e.module.identifier),f.saveState(),"iOS"===device.platform?e.fs.root.getFile(c,{},function(c){c.remove(function(){a()},b)},function(a){console.log("压缩包删除失败")}):window.resolveLocalFileSystemURI(c,function(c){c.remove(function(){a()},b)},function(a){console.log("压缩包删除失败")})})},function(){b(),console.log("下载失败")})},abort:function(){}});return a.extend(h.prototype,{storageDirectory:function(){return this.appConfig.appRootPath},wwwDirecotry:function(){return this.storageDirectory()+this.appConfig.appFolderName},errorHandler:function(a){var b="";switch(a.code){case FileError.QUOTA_EXCEEDED_ERR:b="QUOTA_EXCEEDED_ERR";break;case FileError.NOT_FOUND_ERR:b="NOT_FOUND_ERR";break;case FileError.SECURITY_ERR:b="SECURITY_ERR";break;case FileError.INVALID_MODIFICATION_ERR:b="INVALID_MODIFICATION_ERR";break;case FileError.INVALID_STATE_ERR:b="INVALID_STATE_ERR";break;default:b="Unknown Error"}console.log("Error: "+b)},checkUpdates:function(a,b,c){var d=this;d.checkAppUpdate(function(a){d.getUpdateMsgList(function(a){var e;if(a&&a.success){var f=window.innerHeight;e="<div id='update_wrapper' style='max-height:"+.5*f+"px; overflow: hidden;'><div class='scroll' style='position:relative'>"+a.features+"</div></div>"}d.checkModulesUpdate(function(a){b(),a.length>0?(g.createDialog({closeBtn:!1,buttons:{"更新应用":function(){"iOS"==device.platform?window.location.href=d.iOSDownloadUrl:navigator.ChameleonUtil.download(d.androidDownloadUrl,null,null),this.close()},"只更新模块":function(){butterfly.navigate("components/moduleManager/modulesManagePage.html?auto=true"),this.close()},"以后再说":function(){this.close()}},content:e?e:"检测到有应用与模块更新",title:"更新"}),e&&new IScroll("#update_wrapper")):(g.createDialog({closeBtn:!1,buttons:{"更新应用":function(){"iOS"==device.platform?window.location.href=d.iOSDownloadUrl:navigator.ChameleonUtil.download(d.androidDownloadUrl,null,null),this.close()},"以后再说":function(){this.close()}},content:e?e:"检测到有应用更新",title:"更新"}),e&&new IScroll("#update_wrapper"))},c)})},function(e){d.getUpdateMsgList(function(e){var f;if(e&&e.success){var h=window.innerHeight;f="<div id='update_wrapper' style='max-height:"+.5*h+"px; overflow: hidden;'><div class='scroll' style='position:relative'>"+e.features+"</div></div>"}d.checkModulesUpdate(function(c){if(b(),c.length>0)g.createDialog({closeBtn:!1,buttons:{"立即更新":function(){Backbone.history.navigate("components/moduleManager/modulesManagePage.html?auto=true",{trigger:!0}),this.close()},"以后再说":function(){this.close()}},content:f?f:"检测到有模块更新",title:"更新"}),f&&new IScroll("#update_wrapper");else{if(!a)return;g.createDialog({closeBtn:!1,buttons:{"确定":function(){this.close()}},content:"已经是最新模块",title:"提示"})}},c)})})},getUpdateMsgList:function(a){var c=this;b.ajax({type:"get",url:c.serverUrl+"/mam/api/mam/appMains/versionFeature?appId="+c.appConfig.identifier,timeOut:3e3,success:function(b){a(b)},error:function(b){a(null)}})},checkAppUpdate:function(a,b){var c=this;window.cordova&&c.getAppBuild(function(c){navigator.appInfo.getAppInfo(function(d){c>d.build?a(c):b(d.build)},function(a){console.log("Get app build error:"+a)})},function(){b()})},checkModulesUpdate:function(a,b){if(window.cordova){var c,d,e=this,f=2;e.getLocalModulesInfo(function(b){if(c=b,0==--f){var g=e.diffModules(c,d);a(g)}},b),e.getLastestModulesUpdateInfo(function(b){if(d=b,console.log("got remote: %s",JSON.stringify(d)),0==--f){var g=e.diffModules(c,d);a(g)}},b)}},getLastestModulesUpdateInfo:function(a,b){var c=this;c.getAppTokenFromServer(function(d){c.getModulesInfoFromServer(d,a,b)},b)},diffModules:function(b,c){var d=a.object(a.map(b,function(a){return a.identifier}),b),e=a.filter(c,function(a){var b=d[a.identifier];return b&&b.build<a.build||!b});return e},getLocalModulesInfo:function(b,d){var f=this;window.resolveLocalFileSystemURL(f.wwwDirecotry(),function(g){var h=g.createReader();h.readEntries(function(d){var h=a.chain(d).filter(function(a){return a.isDirectory}).value();f.loadModulesInfoFromDirectories(g,h,function(d){var g=a.map(d,function(a){return"../"+a+"/package.json"}),h=new e;g.forEach(function(a){var b=new i(a);h.add(b)});h.success(function(a){f.dependenciesModules(a,function(a){b(a)})}),h.fail(function(a){c.show({type:"error",message:"读取本地模块信息失败"})}),h.execute()})},d)})},loadModulesInfoFromDirectories:function(a,b,c){var d=[],e=b.length;b.forEach(function(b){a.getFile(b.name+"/package.json",{create:!1},function(a){d.push(b.name),0==--e&&c(d)},function(){0==--e&&c(d)})})},getAppBuild:function(a,c){var d=this;b.ajax({type:"get",url:d.serverUrl+"/mam/api/mam/clients/update/"+device.platform.toLowerCase()+"/"+d.appConfig.identifier+"/",data:{appKey:d.appKey},success:function(b){b&&a(b.build)},error:c})},getAppTokenFromServer:function(a,c){var d=this;b.ajax({type:"post",url:d.serverUrl+"/mam/api/mam/clients/apps/"+device.platform.toLowerCase()+"/"+d.appConfig.identifier+"/"+d.appVersion+"/validate",data:{appKey:d.appKey,secret:d.secret},success:function(b){a(b.token)},error:c})},getModulesInfoFromServer:function(a,c,d){var e=this;b.ajax({type:"get",url:e.serverUrl+"/mam/api/mam/clients/apps/modules/"+a,data:{timeStamp:(new Date).getTime()},success:function(a){c(a.modules)},error:d})},dependenciesModules:function(b,c){var d=a.clone(b);a.each(d,function(c){if(a.keys(c.dependencies).length>0){var e={identifier:a.keys(c.dependencies)[0],version:a.values(c.dependencies)[0]};a.each(b,function(a,b){a.identifier===e.identifier&&a.version<e.version&&(delete d[b],d.push(e))})}}),c(a.compact(d))},deleteModel:function(c){var d=c,e=this;window.cordova&&navigator.notification.confirm("是否删除此模块",function(c){("1"==c||1==c)&&b.ajax({url:e.appConfig.chameleonUrl+"/mam/api/mam/clients/apps/"+e.appConfig.identifier+"/guest/auth",data:{appKey:e.appConfig.appkey},success:function(b){var c=a.groupBy(b.priviliges,function(a){return a[1]}),e=a.keys(c);if(a.contains(e,d)){var f=c[d],g=a.find(f,function(a){return"UNAVAILABLE"==a[0]});void 0!=g?navigator.notification.alert("此模块无法删除",function(){},"提示","确定"):window.resolveLocalFileSystemURL(cordova.file.documentsDirectory+"app/"+d,function(a){a.removeRecursively(function(){navigator.notification.alert("删除成功，请重启应用。",function(){},"提示","确定"),window.history.go(-1)},function(a){console.log(a)})})}else navigator.notification.alert("此模块无法删除",function(){},"提示","确定")}})},"提示","确定,取消")},downloadModules:function(a){var b=this;b.loadingNotification=c.show({autoDismiss:!1,showSpin:!0,message:"正在下载中..."}),window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem,window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(d){var f=new e;a.forEach(function(a){var c=new j(d,a,b.appConfig);f.add(c)}),f.success(function(){console.log("queue success"),b.loadingNotification.remove();var c=g.createDialog({autoOpen:!1,closeBtn:!1,buttons:{"确定":function(){window.sessionStorage.setItem("updateCompleteModules",JSON.stringify(a)),window.localStorage.setItem("updateCompleteTime",(new Date).getTime()),window.history.go(-1),navigator.ChameleonUtil.removeWebviewCache(!0),this.close()}},content:"成功！请重新打开应用体验最新版本。",title:"更新完成"});c.open()}),f.fail(function(a){b.loadingNotification.remove(),c.show({type:"error",message:"下载失败"})}),f.execute()})}}),h});