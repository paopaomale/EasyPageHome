define([],function() {
        var defaults = {
            'swipeStr': '',
            'listviewStrArr': []
        };

        var ListviewTouch = {
            // swipeStr, listviewStr, 
            init: function(viewObj, param){
                this.options = _.extend({}, defaults, param);
                this.swipeStr = this.options.swipeStr;
                this.listviewStrArr = this.options.listviewStrArr;
                this.bindEvent(viewObj);
            },

            bindEvent: function(viewObj){
                viewObj.on('touchstart .scroller', this.onTouchStart)
                viewObj.on('touchend .scroller', this.onTouchEnd)
                viewObj.on('touchmove .scrollert', this.onTouchMove)
            },

            onTouchStart: function(events) {
                this.touchFirst = true;
                if (viewObj[this.swipeStr]) {
                    viewObj[this.swipeStr].pause();
                }
                this.swipeIndex = viewObj[this.swipeStr].getPos();
                if (viewObj[this.listviewStrArr[this.swipeIndex]] && viewObj[this.listviewStrArr[this.swipeIndex]].IScroll) {
                    viewObj[this.listviewStrArr[this.swipeIndex]].IScroll.enabled = false;
                }

                this.lastX = events.originalEvent.touches[0].clientX;
                this.lastY = events.originalEvent.touches[0].clientY;
            },
            onTouchMove: function(events) {
                var me = this;
                if (this.touchFirst === true) {

                    this.clientX = events.originalEvent.touches[0].clientX;
                    this.clientY = events.originalEvent.touches[0].clientY;

                    var changeX = Math.abs(this.clientX - this.lastX);
                    var changeY = Math.abs(this.clientY - this.lastY);
                    var tan = Math.abs(this.clientX - this.lastX) / Math.abs(this.clientY - this.lastY);

                    if(tan < 1 || tan === 1){//上下
                        if (viewObj[this.listviewStrArr[this.swipeIndex]] && viewObj[this.listviewStrArr[this.swipeIndex]].IScroll) {
                            viewObj[this.listviewStrArr[this.swipeIndex]].IScroll.enabled = true;
                            this.touchFirst = false;
                        }
                    }else if(tan > 1){//左右
                        viewObj[this.swipeStr].resume();
                        this.touchFirst = false;
                    }
                }
            },
            onTouchEnd: function() {
                delete this.touchFirst;
                if (viewObj[this.listviewStrArr[this.swipeIndex]] && viewObj[this.listviewStrArr[this.swipeIndex]].IScroll) {
                    viewObj[this.listviewStrArr[this.swipeIndex]].IScroll.enabled = true;
                }
            }
        }
        
      
        return ListviewTouch;
    }
);
