/**
 * Created by ndario on 8/1/15.
 */

define(['etc/Sylvestor'], function(){

  var ProgramGL = function(ctx, config){
    this.ctx = ctx;

    this.program = null;
    this.vertexShader = null;
    this.fragmentShader = null;
    this.attributes = {};
    this.uniforms = {};
    this.enabled = true;

    this.pViewMatrix = null;
    this.pProjMatrix = null;
    this.pModelMatrix = null;

    this.updViewMatrix = false;
    this.updProjMatrix = false;
    this.updModelMatrix = false;

    this.data = {}; //  for draw

    if(config['vertexShader'] != null){
      this.vertexShader = config['vertexShader'];
    }

    if(config['fragmentShader'] != null){
      this.fragmentShader = config['fragmentShader'];
    }

    if(config['drawFunction'] != null) {
      this.setDrawFunction(config['drawFunction']);
    }

    if(this.vertexShader != null && this.fragmentShader != null) {
      this.initProgram();
    }

    return this;
  };

  ProgramGL.constructor = ProgramGL;

  ProgramGL.prototype.draw = null;
  ProgramGL.prototype.setDrawFunction = function(funct){
    this.draw = funct.bind(this);
  };

  ProgramGL.prototype.initProgram = function(){
    this.program = this.ctx.createProgram();
    this.ctx.attachShader(this.program, this.vertexShader);
    this.ctx.attachShader(this.program, this.fragmentShader);
    this.ctx.linkProgram(this.program);
    if(!this.ctx.getProgramParameter(this.program, this.ctx.LINK_STATUS)){
      console.log('Unable to initalize program');
      return false;
    }
    return true;
  };

  ProgramGL.prototype.setViewMatrix = function(viewMatrix){
    this.pViewMatrix = viewMatrix;
  };

  ProgramGL.prototype.setProjectionMatrix = function(projMatrix){
    this.pProjMatrix = projMatrix
  };

  ProgramGL.prototype.setModelMatrix = function(modelMatrix){
    this.pModelMatrix = modelMatrix;
  };

  ProgramGL.prototype.execute = function() {
    if(this.enabled == true){
      this.ctx.useProgram(this.program);
      this._retrieveAttributes();
      this._retrieveUniforms();
      this.draw();
    }
  };

  ProgramGL.prototype._retrieveAttributes = function(){
    var numAttributes = this.ctx.getProgramParameter(this.program, this.ctx.ACTIVE_ATTRIBUTES);
    for (var i=0; i<numAttributes; i++) {
      var nameAttrib = this.ctx.getActiveAttrib(this.program, i).name;
      this.attributes[nameAttrib] = this.ctx.getAttribLocation(this.program, nameAttrib);
    }
  };

  ProgramGL.prototype._retrieveUniforms = function(){
    var numUniforms = this.ctx.getProgramParameter(this.program, this.ctx.ACTIVE_UNIFORMS);
    for (var i=0; i<numUniforms; i++) {
      var nameUniform = this.ctx.getActiveUniform(this.program, i).name;
      this.uniforms[nameUniform] = this.ctx.getUniformLocation(this.program, nameUniform);
    }
  };

  /**
   * use this function to update attributes for the draw function
   */
  ProgramGL.prototype.updateData = function(attr, val){
    this.data[attr] = val;
  };

  ProgramGL.prototype.updateProgram = function(data){
    for( var i in data){
      this.data[i] = data[i];
    }
  };

  return ProgramGL;
});
