//过滤掉html标签以防止js注入.
String.prototype.filterHtml=function(){
    return this.replace(/</g,'').replace(/>/g,'').replace(/'/g,'"');
}