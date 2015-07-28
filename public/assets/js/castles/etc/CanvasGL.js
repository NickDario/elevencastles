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

    var eye = GM.vec3.fromValues(0, 0, 10);
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
    GM.mat4.translate(this.modelMatrix, this.modelMatrix, [0.0, -1.0, -10.0]);
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
  CanvasGL.prototype.initBuffer = function(data, elemPerVertx, attribute) {
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
    if (Math.abs(this.modelMatrix[12] + xoff) > Math.PI * 3) {
      xoff = 0;
    }
    if (Math.abs(this.modelMatrix[13] + yoff) > 5) {
      yoff = 0;
    }

    this.camerax += xoff;
    this.cameray += yoff;

    GM.mat4.translate(this.modelMatrix, this.modelMatrix, [xoff, yoff, 0]);
    //GM.mat4.rotateY(this.modelMatrix, this.modelMatrix, Math.PI / 180);
    this.ctx.uniformMatrix4fv(this.uniforms.uModelMatrix, false, this.modelMatrix);

    this.step += 0.1;
    if (this.step > 20) this.step = 0;


    this.ctx.vertexAttrib1f(this.attributes.fStep, this.step);

  if(this.loading){
    var max = (Math.PI * 40);
    for (var x = 0; x < max; x += 0.1) {
      this.percent = x/max;
      var h = Math.sin(x) * 2;
      var r = 0.5;
      var g = 0.1;
      var b = 0.1;
      var w = ((x) / (Math.PI * 2) - 10);
      var size = 3; //Math.abs(Math.cos(x)) * 20;
      var z = 0;
      for(var i = 0; i < 20; i ++){
        this.points = this.points.concat([w, h, z, size, r, g, b, i]);
      }
    }
    this.updatePoints();

    //this.ctx.enableVertexAttribArray(this.attributes.uProjMatrix);
    //this.ctx.enableVertexAttribArray(this.attributes.uViewMatrix);
    //this.ctx.enableVertexAttribArray(this.attributes.uModelMatrix);

    // Multiple
    //var fPositions = new Float32Array(positions);
    //var fColors = new Float32Array(colors);
    //var fSizes = new Float32Array(sizes);
    //this.initBuffer(fPositions, 2, this.attributes.aPosition);
    //this.initBuffer(fColors, 3, this.attributes.aPointSize);
    //this.initBuffer(fSizes, 1, this.attributes.aColor);


    //points.push({x : 0.0, y : 0.5, sz: 10.0, r: 1.0, g: 0.0, b: 0.0});

    //for(var i=0; i < points.length; i++) {
    //  this.ctx.vertexAttrib4f(this.attributes.aPosition, points[i].x, points[i].y, 0.0, 1.0);
    //  this.ctx.vertexAttrib1f(this.attributes.aPointSize, points[i].sz);
    //  this.ctx.vertexAttrib3f(this.attributes.aColor, points[i].r, points[i].g, points[i].b);
    //}
    this.loading = false;
  }
    this.ctx.drawArrays(this.ctx.POINTS, 0, this.points.length / 8);
    window.requestAnimationFrame(this.draw.bind(this));
  };

  CanvasGL.prototype.addPoints = function(points)
  {
    this.points.concat(points);
  };

  CanvasGL.prototype.updatePoints = function()
  {
    var fData = new Float32Array(this.points);
    var bpe = fData.BYTES_PER_ELEMENT;
    var buffer = this.ctx.createBuffer();
    if (!buffer) throw new Error('Failed to create buffer');
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, fData, this.ctx.STATIC_DRAW);
    this.ctx.vertexAttribPointer(this.attributes.aPosition, 3, this.ctx.FLOAT, false, 8 * bpe, 0);
    this.ctx.enableVertexAttribArray(this.attributes.aPosition);
    this.ctx.vertexAttribPointer(this.attributes.aPointSize, 1, this.ctx.FLOAT, false, 8 * bpe, 3 * bpe);
    this.ctx.enableVertexAttribArray(this.attributes.aPointSize);
    this.ctx.vertexAttribPointer(this.attributes.aColor, 3, this.ctx.FLOAT, false, 8 * bpe, 4 * bpe);
    this.ctx.enableVertexAttribArray(this.attributes.aColor);
    this.ctx.vertexAttribPointer(this.attributes.fOffset, 1, this.ctx.FLOAT, false, 8 * bpe, 7 * bpe);
    this.ctx.enableVertexAttribArray(this.attributes.fOffset);
  };

  return CanvasGL;
});
