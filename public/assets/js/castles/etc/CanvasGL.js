/**
 * Created by ndario on 7/18/15.
 */

define(['etc/Sylvestor'], function(){

  CanvasGL = function(config){
    this.canvas_id = config['canvas_id'] != null ? config['canvas_id'] : 'mp2-canvas';
    this.canvas = null;
    this.ctx = null;

    this.squareRotation = 0.0;
    this.lastSquareUpdateTime = null;
    this.mvMatrixStack = [];

    this.squareXOffset = 0.0;
    this.squareYOffset = 0.0;
    this.squareZOffset = 0.0;

    this.xIncValue = 0.1;
    this.yIncValue = -0.2;
    this.zIncValue = 0.15;

    return this;
  };

  /**
   * Initializes variables for handling html canvas with javascript.
   */
  CanvasGL.prototype.initCanvasGL = function()
  {
    this.canvas = document.getElementById(this.canvas_id);
    this.container = this.canvas.parentNode;
    this.canvas_rect = this.canvas.getBoundingClientRect();
    this.canvas.height= this.container.clientHeight - 20;
    this.canvas.width = this.container.clientWidth - 20;

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

  };

  CanvasGL.prototype.initShaders = function()
  {
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

    vertexColorAttribute = this.ctx.getAttribLocation(shaderProgram, "aVertexColor");
    this.ctx.enableVertexAttribArray(vertexColorAttribute);
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
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
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

    var colors = [
      1.0, 1.0, 1.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0
    ];

    squareVerticesColorBuffer = this.ctx.createBuffer();
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, squareVerticesColorBuffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(colors), this.ctx.STATIC_DRAW);
  };

  CanvasGL.prototype.drawScene = function() {
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, this.canvas.width/this.canvas.height, 0.1, 100.0);

    this.loadIdentity();
    this.mvTranslate([0.0, 0.0, -6.0]);

    this.mvPushMatrix();
    this.mvRotate(this.squareRotation, [1, 0, 0]);
    //this.mvTranslate([this.squareXOffset, this.squareYOffset, this.squareZOffset]);

    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, squareVerticesBuffer);
    this.ctx.vertexAttribPointer(vertexPositionAttribute, 3, this.ctx.FLOAT, false, 0, 0);
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, squareVerticesColorBuffer);
    this.ctx.vertexAttribPointer(vertexColorAttribute, 4, this.ctx.FLOAT, false, 0, 0);

    this.setMatrixUniforms();
    this.ctx.drawArrays(this.ctx.TRIANGLE_STRIP, 0, 4);

    this.mvPopMatrix();

    var currentTime = (new Date).getTime();
    if(this.lastSquareUpdateTime){
      var delta = currentTime - this.lastSquareUpdateTime;

      this.squareRotation += (30*delta) / 1000.0;
      this.squareXOffset += this.xIncValue * ((30*delta) / 1000.0);
      this.squareYOffset += this.yIncValue * ((30*delta) / 1000.0);
      this.squareZOffset += this.zIncValue * ((30*delta) / 1000.0);

      if(Math.abs(this.squareYOffset) > 2.5){
        this.xIncValue = -this.xIncValue;
        this.yIncValue = -this.yIncValue;
        this.zIncValue = -this.zIncValue;
      }
    }

    this.lastSquareUpdateTime = currentTime;
  };

  CanvasGL.prototype.resize = function()
  {
    this.ctx.viewport(0, 0, this.canvas.width, this.canvas.height);
  };


  CanvasGL.prototype.loadIdentity = function() {
    mvMatrix = Matrix.I(4);
  }

  CanvasGL.prototype.multiMatrix = function(m) {
    mvMatrix = mvMatrix.x(m);
  }

  CanvasGL.prototype.mvTranslate = function(v) {
    this.multiMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
  }

  CanvasGL.prototype.setMatrixUniforms = function() {
    var pUniform = this.ctx.getUniformLocation(shaderProgram, "uPMatrix");
    this.ctx.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = this.ctx.getUniformLocation(shaderProgram, "uMVMatrix");
    this.ctx.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  }

  CanvasGL.prototype.mvPushMatrix = function(m) {
    if(m) {
      this.mvMatrixStack.push(m.dup());
      mvMatrix = m.dup;
    } else {
      this.mvMatrixStack.push(mvMatrix.dup());
    }
  }

  CanvasGL.prototype.mvPopMatrix = function() {
    if(!this.mvMatrixStack.length) {
      throw("Can't pop from an empty matrix stack.");
    }

    mvMatrix = this.mvMatrixStack.pop();
    return mvMatrix;
  }

  CanvasGL.prototype.mvRotate = function(angle, v) {
    var inRadians = angle * Math.PI / 180.0;
    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    this.multiMatrix(m);
  }

  return CanvasGL;
});
