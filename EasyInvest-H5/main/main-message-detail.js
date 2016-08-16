/*
@ Author  江霖
*/
define([
  'butterfly/view',
  'butterfly'
  ], 
  function(View, Butterfly){

  return View.extend({
    events: {
        "click .go-back": "goBack"
    },
    render:function(){
      console.log('render1111');
    },
    onShow: function(){
    }
  }); //view define
});