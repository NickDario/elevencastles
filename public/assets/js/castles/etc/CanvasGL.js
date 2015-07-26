/**
 * Created by ndario on 7/21/15.
 */

define(['etc/glMatrix'], function(GM){

  var CanvasGL = function(config){

    this.canvas_id = config['canvas_id'] != null ? config['canvas_id'] : 'canvas';
    this.canvas = null;
    this.container = null;
    this.ctx = null;

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


    return this;
  };


  CanvasGL.prototype.initCanvasGL = function(){
    this._initCanvasCtxContainer();
    if (this.ctx) {
      this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
      this.ctx.enable(this.ctx.DEPTH_TEST);                               // Enable depth testing
      this.ctx.depthFunc(this.ctx.LEQUAL);                                // Near things obscure far things
      this.ctx.clear(this.ctx.COLOR_BUFFER_BIT|this.ctx.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
    }

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
    GM.mat4.perspective(this.projMatrix, 45 * Math.PI / 180, this.canvas.width /this.canvas.height, -10, 10);
    this.ctx.uniformMatrix4fv(this.uniforms.uProjMatrix, false, this.projMatrix);

    this.modelMatrix = GM.mat4.create();
    GM.mat4.identity(this.modelMatrix);

    setInterval(that.draw.bind(this), 15);
  };

  CanvasGL.prototype.beginDraw = function(){
    this.modelMatrix = GM.mat4.create();
    return this.draw.bind(this, modelMatrix);
  }

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

  CanvasGL.prototype.draw = function()
  {
    this.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
    this._clearCanvas();

    GM.mat4.rotateY(this.modelMatrix, this.modelMatrix, Math.PI / 180);
    this.ctx.uniformMatrix4fv(this.uniforms.uModelMatrix, false, this.modelMatrix);

    this.step += 0.01;
    if(this.step > 0.1) this.step = 0;
    //  Interleaving
    var data = [];
    for(var x = 0; x < Math.PI * 16; x += 0.1){
      var r = Math.sin(x);
      var g = Math.cos(x);
      var b = Math.sin(x/Math.PI);
      var h = Math.sin(x + this.step);
      var w = ((x+this.step) / (Math.PI * 2) - 4);
      var size = 3; //Math.abs(Math.cos(x)) * 20;
      //var z = Math.cos(x) * 2;
      var z = 0;
      data = data.concat([w,h,z,size,r,g,b]);
    }
    var fData = new Float32Array(data);
    var bpe = fData.BYTES_PER_ELEMENT;
    var buffer = this.ctx.createBuffer();
    if( !buffer) throw new Error('Failed to create buffer');
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, fData, this.ctx.STATIC_DRAW);
    this.ctx.vertexAttribPointer(this.attributes.aPosition, 3, this.ctx.FLOAT, false, 7 * bpe, 0);
    this.ctx.enableVertexAttribArray(this.attributes.aPosition);
    this.ctx.vertexAttribPointer(this.attributes.aPointSize, 1, this.ctx.FLOAT, false, 7 * bpe, 3 * bpe);
    this.ctx.enableVertexAttribArray(this.attributes.aPointSize);
    this.ctx.vertexAttribPointer(this.attributes.aColor, 3, this.ctx.FLOAT, false, 7 * bpe, 4 * bpe);
    this.ctx.enableVertexAttribArray(this.attributes.aColor);

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
    this.ctx.drawArrays(this.ctx.POINTS, 0, data.length / 7);
  };


  return CanvasGL;
});
