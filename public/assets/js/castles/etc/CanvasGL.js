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

    this.vertShaderSrc = config['vertShaderSrc'] != null ? config['vertShaderSrc'] : [];
    this.fragShaderSrc = config['fragShaderSrc'] != null ? config['fragShaderSrc'] : [];

    this.vertShaders = [];
    this.fragShaders = [];

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
    this.initWebGL();
    if (this.ctx) {
      this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
      this.ctx.enable(this.ctx.DEPTH_TEST);                               // Enable depth testing
      this.ctx.depthFunc(this.ctx.LEQUAL);                                // Near things obscure far things
      this.ctx.clear(this.ctx.COLOR_BUFFER_BIT|this.ctx.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
    }
    this.initEventHandlers();
    this.initShaders();
    this.initProgram();
    this._getAttributes(this.program);
    this._getUniforms(this.program);
    this._clearCanvas();

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
    GM.mat4.translate(this.modelMatrix, this.modelMatrix, [0.0, 0.0, -50.0]);
    this.ctx.uniformMatrix4fv(this.uniforms.uModelMatrix, false, this.modelMatrix);

    this.beginDraw();
  };

  CanvasGL.prototype.beginDraw = function(){
    window.requestAnimationFrame(this.draw.bind(this));
  };

  CanvasGL.prototype.initWebGL = function(){
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

  CanvasGL.prototype.initShaders = function()
  {
    for(var i = 0; i < this.fragShaderSrc.length; i ++){
      this.vertShaders.push(this.buildInShader(this.ctx, this.ctx.VERTEX_SHADER, this.vertShaderSrc[i]));
    }
    for(var j = 0; j < this.fragShaderSrc.length; j ++) {
      this.fragShaders.push(this.buildInShader(this.ctx, this.ctx.FRAGMENT_SHADER, this.fragShaderSrc[j]));
    }
  };

  CanvasGL.prototype.initProgram = function()
  {
    this.program = this.ctx.createProgram();
    for(var i = 0; i < this.vertShaders.length; i ++) {
      this.ctx.attachShader(this.program, this.vertShaders[i]);
    }
    for(var j = 0; j < this.fragShaders.length; j ++) {
      this.ctx.attachShader(this.program, this.fragShaders[j]);
    }

    this.ctx.linkProgram(this.program);
    if(!this.ctx.getProgramParameter(this.program, this.ctx.LINK_STATUS)){
      alert('Unable to initialize shader program');
    }

    this.ctx.useProgram(this.program);
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

    var xoff = -((this.mpx / this.canvas.width) - ((this.canvas.width / 2) / this.canvas.width)) / 5;
    var yoff = ((this.mpy / this.canvas.height) - ((this.canvas.height / 2) / this.canvas.height)) / 5;

    if (Math.abs(this.modelMatrix[12] + xoff) > 10 ) {
      xoff = 0;
    }
    if (Math.abs(this.modelMatrix[13] + yoff) > 10) {
      yoff = 0;
    }

    this.camerax += xoff;
    this.cameray += yoff;

    GM.mat4.translate(this.modelMatrix, this.modelMatrix, [xoff, yoff, 0]);
    this.ctx.uniformMatrix4fv(this.uniforms.uModelMatrix, false, this.modelMatrix);

    this.step += 0.1;

    //Grid
    this.ctx.vertexAttrib1f(this.attributes.step, this.step);

    if(this.loading){
      for(var i = 0; i < 100; i ++) {
        this.points = this.points.concat([-50,0, i, 50,0,i]);
        //this.points.push([-50,0, i]);
        //this.points.push([ 50,0,i]);
        //this.boints.push([]);
      }

      var fData = new Float32Array(this.points);
      var bpe = fData.BYTES_PER_ELEMENT;
      this.initBuffer(this.attributes.aPosition, fData, 3);
      //this.initBuffer(this.attributes.bPosition, fData, 3);
      //var buffer = this.ctx.createBuffer();
      //if(!buffer) throw new Error('Failed to create buffer');
      //this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
      //this.ctx.bufferData(this.ctx.ARRAY_BUFFER, fData, this.ctx.STATIC_DRAW);
      //this.ctx.vertexAttribPointer(this.attributes.aPosition, 3, this.ctx.FLOAT, false, 3 * bpe, 0);
      //this.ctx.enableVertexAttribArray(this.attributes.aPosition);
      this.loading = false;
    }

    this.ctx.drawArrays(this.ctx.LINES, 0, this.points.length / 3);
    window.requestAnimationFrame(this.draw.bind(this));
  };


  CanvasGL.prototype._updateLoading = function(){
    console.log(this.percent);
    $('#loading .num').text(this.percent);
  };

  return CanvasGL;
});
