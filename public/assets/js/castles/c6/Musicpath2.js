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
    this.initCanvasGL();
    this.initShaders();
    this.initBuffers();

    var that = this;
    setInterval(that.drawScene.bind(this), 15);
  };


  return MP2;
});