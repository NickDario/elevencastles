/**
 * Created by ndario on 7/21/15.
 */

define(['etc/Sylvestor'], function(Sylvestor){

  var CanvasGL = function(config){

    this.canvas_id = config['canvas_id'] != null ? config['canvas_id'] : 'canvas';
    this.canvas = null;
    this.container = null;
    this.ctx = null;

    this.vsSrc = config['vsSrc'];
    this.fsSrc = config['fsSrc'];

    this.vs = null;
    this.fs = null;

    this.program = null;
    this.attributes = {};
    this.uniforms = {};


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
    this._initShaderVars();


  console.log('pause');
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

  CanvasGL.prototype._initShaderVars = function(){
    var numAttributes = this.ctx.getProgramParameter(this.program, this.ctx.ACTIVE_ATTRIBUTES);
    for (var i=0; i<numAttributes; i++) {
      var nameAttrib = this.ctx.getActiveAttrib(this.program, i).name;
      this.attributes[nameAttrib] = this.ctx.getAttribLocation(this.program, nameAttrib);
    }

    var numUniforms = this.ctx.getProgramParameter(this.program, this.ctx.ACTIVE_UNIFORMS);
    for (i=0; i<numUniforms; i++){
      var nameUniform = this.ctx.getActiveUniform(this.program, i).name;
      this.uniforms[nameUniform] = this.ctx.getUniformLocation(this.program, nameUniform);
    }
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

  CanvasGL.prototype.initBuffer = function(){

  };

  CanvasGL.prototype.initShader = function(){

  };


  return CanvasGL;
});
