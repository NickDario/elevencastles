/**
 * Created by ndario on 7/18/15.
 */


define(['etc/CanvasGL', 'etc/Audio'], function(CanvasGL, Audio) {

  var MP2 = function(config) {
    CanvasGL.call(this, config);
    Audio.call(this, config);

    return this;
  };


  MP2.constructor = MP2;
  $.extend(MP2.prototype, CanvasGL.prototype);
  $.extend(MP2.prototype, Audio.prototype);

  MP2.prototype.init = function(){
    this.initCanvasGL();//{
    //  canvas_id : 'mp2-canvas',
    //  vsSrc : "                   \
    //    attribute vec4 aPosition; \
    //    void main() {             \
    //       gl_Position = aPosition;\
    //       gl_PointSize = 10.0;   \
    //    }                         \
    //  ",
    //  fsSrc : "                   \
    //    precision mediump float;  \
    //    uniform vec4 uFragColor;  \
    //    void main () {            \
    //      gl_FragColor = uFragColor;\
    //    }                         \
    //  ",
    //});
  };


  return MP2;
});