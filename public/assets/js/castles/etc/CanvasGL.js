/**
 * Created by ndario on 7/21/15.
 *
 *
 */

define(['etc/glMatrix'], function(GM){

  var CanvasGL = function(config){

    this.canvas_id = config['canvas_id'] != null ? config['canvas_id'] : 'canvas';
    this.canvas = null;
    this.container = null;
    this.ctx = null;

    this.mpx = null;
    this.mpy = null;

    this.camerax = 0;
    this.cameray = 0;

    this.vsSrc = config['vsSrc'];
    this.fsSrc = config['fsSrc'];

    this.vs = null;
    this.fs = null;

    this.modelMatrix = null;
    this.viewMatrix = null;
    this.projMatrix = null;

    this.program = null;
    this.attributes = {};
    this.uniforms = {};

    this.step = 0;
    this.loading = true;

    this.points = [];
    this.transforms = {
      //  matrixid : [[x0, y0, z0], [x1, y1, z1]]
    };

    this.percent = 0;
    this.waiting = null;

    return this;
  };

  CanvasGL.prototype.initEventHandlers = function(){
    var that = this;
    document.addEventListener('mousemove', function(e){
      that.mpx = e.pageX - that.canvas_rect.left;
      that.mpy = e.pageY - that.canvas_rect.top;
    });


    this.canvas.addEventListener('webglcontextlost', this.handleContextLost, false);
    this.canvas.addEventListener('webglcontextrestored', this.handleContextRestored, false);
  };

  CanvasGL.prototype.handleContextLost = function()
  {

  };

  CanvasGL.prototype.handleContextRestored = function()
  {

  };

  CanvasGL.prototype.initCanvasGL = function(){
    this._initCanvasCtxContainer();
    if (this.ctx) {
      this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
      this.ctx.enable(this.ctx.DEPTH_TEST);                               // Enable depth testing
      this.ctx.depthFunc(this.ctx.LEQUAL);                                // Near things obscure far things
      this.ctx.clear(this.ctx.COLOR_BUFFER_BIT|this.ctx.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
    }

    this.initEventHandlers();

    this.vs = this.buildInShader(this.ctx, this.ctx.VERTEX_SHADER, this.vsSrc);
    this.fs = this.buildInShader(this.ctx, this.ctx.FRAGMENT_SHADER, this.fsSrc);

    this.program = this.ctx.createProgram();
    this.ctx.attachShader(this.program, this.vs);
    this.ctx.attachShader(this.program, this.fs);
    this.ctx.linkProgram(this.program);

    if(!this.ctx.getProgramParameter(this.program, this.ctx.LINK_STATUS)){
      alert('Unable to initialize shader program');
    }
    this.ctx.useProgram(this.program);

    this._getAttributes(this.program);
    this._getUniforms(this.program);

    this._clearCanvas();
    var that = this;

    var eye = GM.vec3.fromValues(0, 0, 0);
    var lookAt = GM.vec3.fromValues(0, 0, 0);
    var up = GM.vec3.fromValues(0, 1, 0);
    this.viewMatrix = GM.mat4.create();
    GM.mat4.lookAt(this.viewMatrix, eye, lookAt, up);
    this.ctx.uniformMatrix4fv(this.uniforms.uViewMatrix, false, this.viewMatrix);

    this.projMatrix = GM.mat4.create();
    GM.mat4.perspective(this.projMatrix, 45 * Math.PI / 180, this.canvas.width / this.canvas.height, 0, 100);
    this.ctx.uniformMatrix4fv(this.uniforms.uProjMatrix, false, this.projMatrix);

    this.modelMatrix = GM.mat4.create();
    GM.mat4.identity(this.modelMatrix);
    //GM.mat4.translate(this.modelMatrix, this.modelMatrix, [0.0, -1.0, -100.0]);
    GM.mat4.translate(this.modelMatrix, this.modelMatrix, [0.0, 0.0, 0.0]);
    this.ctx.uniformMatrix4fv(this.uniforms.uModelMatrix, false, this.modelMatrix);

    this.beginDraw();
  };

  CanvasGL.prototype.beginDraw = function(){
    window.requestAnimationFrame(this.draw.bind(this));
  };

  CanvasGL.prototype._initCanvasCtxContainer = function(){
    this.canvas = document.getElementById(this.canvas_id);
    this.container = this.canvas.parentNode;
    this.canvas_rect = this.canvas.getBoundingClientRect();
    this.canvas.height= this.container.clientHeight - 20;
    this.canvas.width = this.container.clientWidth - 20;

    try {
      this.ctx = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')
    } catch(e){
      alert(e.message);
    }

    if (!this.ctx) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      this.ctx = null;
    }
  };

  CanvasGL.prototype._getUniforms = function(program) {
    var numUniforms = this.ctx.getProgramParameter(program, this.ctx.ACTIVE_UNIFORMS);
    for (var i=0; i<numUniforms; i++) {
      var nameUniform = this.ctx.getActiveUniform(program, i).name;
      this.uniforms[nameUniform] = this.ctx.getUniformLocation(program, nameUniform);
    }
  };

  CanvasGL.prototype._getAttributes = function(program) {
    var numAttributes = this.ctx.getProgramParameter(program, this.ctx.ACTIVE_ATTRIBUTES);
    for (var i=0; i<numAttributes; i++) {
      var nameAttrib = this.ctx.getActiveAttrib(program, i).name;
      this.attributes[nameAttrib] = this.ctx.getAttribLocation(program, nameAttrib);
    }
  };

  CanvasGL.prototype._clearCanvas = function() {
    this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
  };

  CanvasGL.prototype.buildInShader = function(ctx, type, shaderSrc) {

    var shader = ctx.createShader(type);
    ctx.shaderSource(shader, shaderSrc);
    ctx.compileShader(shader);

    if(!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
      console.log(ctx.getShaderInfoLog(shader));
      throw new Error(ctx.getShaderInfoLog(shader));
    }

    return shader;
  };

  //  When binding multiple buffers to program.
  CanvasGL.prototype.initBuffer = function(attribute, data, elemPerVertx) {
    var buffer = this.ctx.createBuffer();
    if( !buffer ) throw new Error('Failed to create buffer.');
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, data, this.ctx.STATIC_DRAW);
    this.ctx.vertexAttribPointer(attribute, elemPerVertx, this.ctx.FLOAT, false, 0, 0);
    this.ctx.enableVertexAttribArray(attribute);
  };

  CanvasGL.prototype.draw = function() {
    this.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
    //this._clearCanvas();


    //this.transforms['modelmatrix'].push(this.modelMatrix);
    var xoff = -((this.mpx / this.canvas.width) - ((this.canvas.width / 2) / this.canvas.width)) / 5;
    var yoff = ((this.mpy / this.canvas.height) - ((this.canvas.height / 2) / this.canvas.height)) / 5;
    //if(Math.abs(this.modelMatrix[12] + toff) < Math.PI / 2){
    //  GM.mat4.translate(this.modelMatrix, this.modelMatrix, [toff, 0, 0]);
    //}
    if (Math.abs(this.modelMatrix[12] + xoff) > 10 ) {
      xoff = 0;
    }
    if (Math.abs(this.modelMatrix[13] + yoff) > 10) {
      yoff = 0;
    }

    this.camerax += xoff;
    this.cameray += yoff;

    GM.mat4.translate(this.modelMatrix, this.modelMatrix, [xoff, yoff, 0]);
    //GM.mat4.rotateY(this.modelMatrix, this.modelMatrix, Math.PI / 180);
    this.ctx.uniformMatrix4fv(this.uniforms.uModelMatrix, false, this.modelMatrix);

    this.step += 0.1;

    //Sin
    //this.ctx.vertexAttrib1f(this.attributes.fStep, this.step);
    //this.ctx.uniform1f(this.uniforms.pi2, Math.PI * 2);

    //Grid
    this.ctx.vertexAttrib1f(this.attributes.step, this.step);

    if(this.loading){
      for(var i = 0; i < 100; i ++) {
        this.points = this.points.concat([0,0, i, 50,0,i]);
      }

      var fData = new Float32Array(this.points);
      var bpe = fData.BYTES_PER_ELEMENT;
      var buffer = this.ctx.createBuffer();
      if(!buffer) throw new Error('Failed to create buffer');
      this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
      this.ctx.bufferData(this.ctx.ARRAY_BUFFER, fData, this.ctx.STATIC_DRAW);
      this.ctx.vertexAttribPointer(this.attributes.aPosition, 3, this.ctx.FLOAT, false, 3 * bpe, 0);
      this.ctx.enableVertexAttribArray(this.attributes.aPosition);
      this.loading = false;
    }

    this.ctx.drawArrays(this.ctx.LINES, 0, this.points.length / 3);
    window.requestAnimationFrame(this.draw.bind(this));

//
//  if(this.loading){
//    //  Sin wave
//    //var max = (Math.PI * 50);
//    //var flip = true;
//    /*for(var j = 0; j < 40; j ++){
//      this.percent = j / 40 * 100;
//      var z = 0;
//      if(flip) {
//        for (var x = 0; x < max; x += 0.1) {
//          this.points = this.points.concat([x, z, j, x, z, j+1]);
//        }
//      } else {
//        for (var x = max; x > 0; x -= 0.1) {
//          this.points = this.points.concat([x, z, j, x, z, j+1]);
//        }
//      }
//      flip = !flip;
//    }
//    this.updateSinPoints();
//*/
//
//    // Grid
//    //  Horizontal
//
//
//
//    //for(var x = 0; x < 1000; x++) {
//    //  this.points = this.points.concat([x,0,0]);
//    //  this.points = this.points.concat([x,0,-1000]);
//    //}
//    for(var z = 0; z < 1000; z ++) {
//      this.points = this.points.concat([-1000,z]);
//    }
//    this.updateGridPoints();
//
//    this.loading = false;
//  }
//    this.ctx.drawArrays(this.ctx.LINES, 0, this.points.length / 3);
//    window.requestAnimationFrame(this.draw.bind(this));
  };


  CanvasGL.prototype.updateSinPoints = function()
  {
    var fData = new Float32Array(this.points);
    var bpe = fData.BYTES_PER_ELEMENT;
    var buffer = this.ctx.createBuffer();
    if (!buffer) throw new Error('Failed to create buffer');
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, fData, this.ctx.STATIC_DRAW);
    //this.ctx.vertexAttribPointer(this.attributes.aPosition, 3, this.ctx.FLOAT, false, 4 * bpe, 0);
    //this.ctx.enableVertexAttribArray(this.attributes.aPosition);
    this.ctx.vertexAttribPointer(this.attributes.xPos, 1, this.ctx.FLOAT, false, 3 * bpe, 0);
    this.ctx.enableVertexAttribArray(this.attributes.xPos);
    //this.ctx.vertexAttribPointer(this.attributes.yPos, 1, this.ctx.FLOAT, false, 4 * bpe, bpe);
    //this.ctx.enableVertexAttribArray(t
    // his.attributes.yPos);
    this.ctx.vertexAttribPointer(this.attributes.zPos, 1, this.ctx.FLOAT, false, 3 * bpe, bpe);
    this.ctx.enableVertexAttribArray(this.attributes.zPos);
    //this.ctx.vertexAttribPointer(this.attributes.aPointSize, 1, this.ctx.FLOAT, false, 5 * bpe, 3 * bpe);
    //this.ctx.enableVertexAttribArray(this.attributes.aPointSize);
    //this.ctx.vertexAttribPointer(this.attributes.aColor, 3, this.ctx.FLOAT, false, 8 * bpe, 4 * bpe);
    //this.ctx.enableVertexAttribArray(this.attributes.aColor);
    this.ctx.vertexAttribPointer(this.attributes.fOffset, 1, this.ctx.FLOAT, false,  3 * bpe, 2 * bpe);
    this.ctx.enableVertexAttribArray(this.attributes.fOffset);
  };

  CanvasGL.prototype.updateGridPoints = function()
  {
    var fData = new Float32Array(this.points);
    var bpe = fData.BYTES_PER_ELEMENT;
    var buffer = this.ctx.createBuffer();
    if(!buffer) throw new Error('Failed to create buffer');
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, fData, this.ctx.STATIC_DRAW);
    this.ctx.vertexAttribPointer(this.attributes.xPos, 1, this.ctx.FLOAT, false, 3 * bpe, 0);
    this.ctx.enableVertexAttribArray(this.attributes.xPos);
    this.ctx.vertexAttribPointer(this.attributes.zPos, 1, this.ctx.FLOAT, false, 3 * bpe, bpe);
    this.ctx.enableVertexAttribArray(this.attributes.zPos);
  }

  CanvasGL.prototype._updateLoading = function(){
    console.log(this.percent);
    $('#loading .num').text(this.percent);
  };

  return CanvasGL;
});
