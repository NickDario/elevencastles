/**
 * Created by ndario on 7/18/15.
 */

define(['etc/Sylvestor'], function(){

  CanvasGL = function(config){
    this.canvas_id = config['canvas_id'] != null ? config['canvas_id'] : 'mp2-canvas';
    this.canvas = null;
    this.ctx = null;

    return this;
  };

  /**
   * Initializes variables for handling html canvas with javascript.
   */
  CanvasGL.prototype.initCanvasGL = function()
  {
    this.canvas = document.getElementById(this.canvas_id);
    try {
      this.ctx = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
    } catch(e){
      alert(e.message);
    }

    // If we don't have a GL context, give up now
    if (!this.ctx) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      this.ctx = null;
    }
    if (this.ctx) {
      this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
      this.ctx.enable(this.ctx.DEPTH_TEST);                               // Enable depth testing
      this.ctx.depthFunc(this.ctx.LEQUAL);                                // Near things obscure far things
      this.ctx.clear(this.ctx.COLOR_BUFFER_BIT|this.ctx.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
    }

    this.container = this.canvas.parentNode;
    this.canvas_rect = this.canvas.getBoundingClientRect();
    this.canvas.height= this.container.clientHeight - 20;
    this.canvas.width = this.container.clientWidth - 20;
    this.horizAspect = this.canvas.width/this.canvas.height;
  };

  CanvasGL.prototype.initShaders = function()
  {
    //Matrix();

    var fragmentShader = this.getShader(this.ctx, "shader-fs");
    var vertexShader = this.getShader(this.ctx, "shader-vs");

    // Create the shader program

    shaderProgram = this.ctx.createProgram();
    this.ctx.attachShader(shaderProgram, vertexShader);
    this.ctx.attachShader(shaderProgram, fragmentShader);
    this.ctx.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!this.ctx.getProgramParameter(shaderProgram, this.ctx.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }

    this.ctx.useProgram(shaderProgram);

    vertexPositionAttribute = this.ctx.getAttribLocation(shaderProgram, "aVertexPosition");
    this.ctx.enableVertexAttribArray(vertexPositionAttribute);
  };

  CanvasGL.prototype.getShader = function(gl, id) {
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
      return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while (currentChild) {
      if (currentChild.nodeType == currentChild.TEXT_NODE) {
        theSource += currentChild.textContent;
      }

      currentChild = currentChild.nextSibling;
    }
    if (shaderScript.type == "x-shader/x-fragment") {
      shader = this.ctx.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = this.ctx.createShader(gl.VERTEX_SHADER);
    } else {
       // Unknown shader type
       return null;
    }

    this.ctx.shaderSource(shader, theSource);

    // Compile the shader program
    this.ctx.compileShader(shader);

    // See if it compiled successfully
    if (!this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
      alert("An error occurred compiling the shaders: " + this.ctx.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  };

  CanvasGL.prototype.initBuffers = function() {
    squareVerticesBuffer = this.ctx.createBuffer();
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, squareVerticesBuffer);

    var vertices = [
      1.0,  1.0,  0.0,
      -1.0, 1.0,  0.0,
      1.0,  -1.0, 0.0,
      -1.0, -1.0, 0.0
    ];

    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(vertices), this.ctx.STATIC_DRAW);
  };

  CanvasGL.prototype.drawScene = function() {
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, this.canvas.width/this.canvas.height, 0.1, 100.0);

    this.loadIdentity();
    this.mvTranslate([-0.0, 0.0, -6.0]);

    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, squareVerticesBuffer);
    this.ctx.vertexAttribPointer(vertexPositionAttribute, 3, this.ctx.FLOAT, false, 0, 0);
    this.setMatrixUniforms();
    this.ctx.drawArrays(this.ctx.TRIANGLE_STRIP, 0, 4);
  };

  CanvasGL.prototype.resize = function()
  {
    this.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
  };


  CanvasGL.prototype.loadIdentity = function() {
    mvMatrix = Matrix.I(4);
  }

  CanvasGL.prototype.multMatrix = function(m) {
    mvMatrix = mvMatrix.x(m);
  }

  CanvasGL.prototype.mvTranslate = function(v) {
    this.multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
  }

  CanvasGL.prototype.setMatrixUniforms = function() {
    var pUniform = this.ctx.getUniformLocation(shaderProgram, "uPMatrix");
    this.ctx.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = this.ctx.getUniformLocation(shaderProgram, "uMVMatrix");
    this.ctx.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  }

  return CanvasGL;
});
