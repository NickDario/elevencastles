/**
 * Created by ndario on 7/18/15.
 */


//define(['etc/CanvasGL', 'etc/Audio'], function(CanvasGL, Audio) {
define(['etc/CanvasGL/CanvasGL', 'etc/Audio'], function(CanvasGL, Audio) {

  var MP2 = function(config) {
    CanvasGL.call(this, config);
    Audio.call(this, config);

    this.step = 0;

    return this;
  };


  MP2.constructor = MP2;
  $.extend(MP2.prototype, CanvasGL.prototype);
  $.extend(MP2.prototype, Audio.prototype);

  MP2.prototype.init = function(){

    this.createProgramGL(
      0,
      "\
       precision mediump float;    \
       \
       attribute vec3 aPosition;\
       \
       void main() {\
          gl_Position = vec4(aPosition, 1.0);\
          gl_PointSize = 10.0;\
        }\
      ","                     \
        precision mediump float;    \
        \
        void main () {              \
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);    \
        }                           \
      ",
      function(){
        var verts = new Float32Array([-0.5 + this.data.xPos, 0.0, 0.0, 0.0 + this.data.xPos, 0.0, 0.0, 0.5 + this.data.xPos, 0.0, 0.0]);
        var buff  = this.ctx.createBuffer();
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buff);
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, verts, this.ctx.STATIC_DRAW);
        this.ctx.bindAttribLocation(this.program, 0, 'aPosition');
        this.ctx.vertexAttribPointer(0, 3, this.ctx.FLOAT, false, 0, 0);
        this.ctx.enableVertexAttribArray(0);
        this.ctx.drawArrays(this.ctx.LINE_STRIP, 0, 3);
      });


    this.createProgramGL(
        1,
        "\
         precision mediump float;    \
         \
         attribute vec3 aPosition;\
         \
         void main() {\
            gl_Position = vec4(aPosition, 1.0);\
            gl_PointSize = 10.0;\
          }\
        ","                     \
        precision mediump float;    \
        \
        void main () {              \
          gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);    \
        }                           \
      ",
      function(){

        var verts = new Float32Array([0.0, -0.5 + this.data.yPos, 0.0, 0.0, 0.0 + this.data.yPos, 0.0, 0.0, 0.5 + this.data.yPos, 0.0]);
        var buff  = this.ctx.createBuffer();
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buff);
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, verts, this.ctx.STATIC_DRAW);
        this.ctx.bindAttribLocation(this.program, 0, 'aPosition');
        this.ctx.vertexAttribPointer(0, 3, this.ctx.FLOAT, false, 0, 0);
        this.ctx.enableVertexAttribArray(0);
        this.ctx.drawArrays(this.ctx.LINE_STRIP, 0, 3);


      });

    setInterval(this.draw.bind(this), 10);
  };

  MP2.prototype.draw = function(){
    this.step += 0.01;



    this.programs[0].updateProgram({
      xPos : Math.sin(this.step)
    });
    this.programs[1].updateProgram({
      yPos : Math.cos(this.step)
    });
    this.execute();
  };

  return MP2;
});