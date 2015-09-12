/**
 * Created by ndario on 8/30/15.
 */

define(['etc/Canvas'], function(Canvas){


  var Life = function(config){
    Canvas.call(this, config);
    this.square_size = 5;
    this.sqcount_x = 0;
    this.sqcount_y = 0;

    this.playing = true;
    this.generation = 150; // ms
    this.epoch = 0;

    this.squares = [];
    this.future = [];
    this.locked = [];

    this.pattern = '';
  };

  Life.constructor = Life;
  $.extend(Life.prototype, Canvas.prototype);

  Life.prototype.init = function(){
    this.initCanvas();
    this.initMouse();
    this.initGrid();
    this.initSquares();
    this.initClick();
    this.start();

    return this;
  };

  Life.prototype.initGrid = function(){
    this.ctx.lineWidth = '1px';
    this.ctx.strokeStyle = 'rgba(100,100,100,1)';
    this.sqcount_y = 0;
    for(var y = 0; y < this.canvas.height; y += this.square_size){
      this.ctx.moveTo(0,y);
      this.ctx.lineTo(this.canvas.width,y);
      this.sqcount_y ++;
    }

    this.sqcount_x = 0;
    for(var x = 0; x < this.canvas.width; x += this.square_size){
      this.ctx.moveTo(x,0);
      this.ctx.lineTo(x,this.canvas.height);
      this.sqcount_x ++;
    }
    this.ctx.stroke();
  };

  Life.prototype.initSquares = function() {
    for(var x = 0; x < this.sqcount_x; x ++) {
      for(var y = 0; y < this.sqcount_y; y ++) {
        if(this.squares[x] == null){
          this.squares[x] = [];
        }
        this.squares[x][y] = Math.random() > 0.05 ? 0 : 1;
      }
    }
  };

  Life.prototype._growGrid = function(){
    this.squares.unshift([]);
    this.squares.push([]);
    for(var x in this.squares){
      this.squares[x].unshift([]);
      this.squares[x].push([]);
      for(var y in this.squares[x]){
        this.squares[x][y] = this.squares[x][y] != null ? this.squares[x][y] : 0;
      }
    }
  };

  Life.prototype.initClick = function(){
    var life = this;
    this.canvas.addEventListener('mousedown', function(){
      life.clicked = true;
    });
    document.addEventListener('mouseup', function(){
      life.clicked = false;
    });
  };

  Life.prototype.coordToSquare = function(coords){
    return {
      x: Math.floor(coords.x / this.square_size),
      y: Math.floor(coords.y / this.square_size)
    };
  };

  Life.prototype.squareToCoord = function(sqCoords){
    return {
      x: sqCoords.x * this.square_size,
      y: sqCoords.y * this.square_size,
    }
  };

  Life.prototype.newGeneration = function(){
    var timeNow = new Date().getTime();
    if(timeNow - this.epoch >= this.generation){
      this.epoch = timeNow;
      return true;
    }
    return false;
  };

  Life.prototype.fadeAllSquares = function(){
    for(var x in this.squares){
      for(var y in this.squares[x]){
        if(this.squares[x][y] > 0){
          this.squares[x][y] -= 0.1;
        }
      }
    }
  };

  Life.prototype.drawSquares = function(){
    for(var x in this.squares){
      for(var y in this.squares[x]){
        if(this.squares[x][y] > 0){
          var coords = this.squareToCoord({x:x, y:y});
          this.ctx.fillStyle = 'rgba(255, 255, 255, '+ this.squares[x][y] +')';
          this.ctx.fillRect(coords.x, coords.y, this.square_size, this.square_size);
        }
      }
    }
  };

  Life.prototype.step = function(){
    this.future = [];
    for(var x in this.squares){
      for(var y in this.squares[x]){
        var adj = this.countAdjacent({x:parseInt(x), y:parseInt(y)});
        if(this.future[x] == null) {
          this.future[x] = [];
        }
        if(adj == 3) {
          this.future[x][y] = 1;
        } else if(adj == 2) {
          this.future[x][y] = Math.floor(this.squares[x][y]);
        } else {
          this.future[x][y] = 0;
        }
      }
    }
    this.squares = this.future;
  };

  Life.prototype.nextStep = function(){
    this.step();
    this.draw();
  };

  Life.prototype.reset = function(){
    this.initSquares();
    this.draw();
  };

  Life.prototype.clear = function(){
    for(var x = 0; x < this.sqcount_x; x ++) {
      for(var y = 0; y < this.sqcount_y; y ++) {
        if(this.squares[x] == null){
          this.squares[x] = [];
        }
        this.squares[x][y] = 0;
      }
    }
    this.draw();
  };

  Life.prototype.countAdjacent = function(sqcoords){
    var xmo = sqcoords.x == 0 ? this.sqcount_x-1 : sqcoords.x - 1;
    var xpo = sqcoords.x == this.sqcount_x-1 ? 0 : sqcoords.x + 1;
    var ymo = sqcoords.y == 0 ? this.sqcount_y-1 : sqcoords.y - 1;
    var ypo = sqcoords.y == this.sqcount_y-1 ? 0 : sqcoords.y + 1;

    return (Math.floor(this.squares[xmo][ymo]) +
          Math.floor(this.squares[xmo][sqcoords.y]) +
          Math.floor(this.squares[xmo][ypo]) +
          Math.floor(this.squares[sqcoords.x][ymo]) +
          Math.floor(this.squares[sqcoords.x][ypo]) +
          Math.floor(this.squares[xpo][ymo]) +
          Math.floor(this.squares[xpo][sqcoords.y]) +
          Math.floor(this.squares[xpo][ypo]));
  };

  Life.prototype._setRelativeSquare = function(startcoords, endcoords, val){
    return this.squares[startcoords.x + endcoords.x][startcoords.y + endcoords.y] = val;
  };

  Life.prototype._checkRelativeSquare = function(startcoords, endcoords){
    return this.squares[startcoords.x + endcoords.x][startcoords.y + endcoords.y]
  };

  Life.prototype.createLifePattern = function(name, center, color){
    switch(name){
      case 'glider':
        this._createGlider(center, color);
        break;
      case 's-spaceship':
        this._createSpaceship(center, 0, color);
        break;
      case 'm-spaceship':
        this._createSpaceship(center, 1, color);
        break;
      case 'l-spaceship':
        this._createSpaceship(center, 2, color);
        break;
      case 'shuttle':
        this._createShuttle(center, color);
        break;
      case 'glider-gun':
        this._createGliderGun(center, color);
        break;
    }
  };

  Life.prototype._createGlider = function(center, color){
      this._setRelativeSquare(center, {x:0,y:1}, color);
      this._setRelativeSquare(center, {x: 1, y: 0}, color);
      this._setRelativeSquare(center, {x: 1, y: -1}, color);
      this._setRelativeSquare(center, {x: 0, y: -1}, color);
      this._setRelativeSquare(center, {x: -1, y: -1}, color);
  };

  Life.prototype._createSpaceship = function(center, size, color){
    this._setRelativeSquare(center, {x:2,y:1}, color);
    this._setRelativeSquare(center, {x:2,y:0}, color);
    this._setRelativeSquare(center, {x:2,y:-1}, color);
    this._setRelativeSquare(center, {x:1, y:2}, color);
    this._setRelativeSquare(center, {x:1,y:-1}, color);
    this._setRelativeSquare(center, {x:0,y:-1}, color);
    this._setRelativeSquare(center, {x:-1,y:-1}, color);
    if(size == 0) {
      this._setRelativeSquare(center, {x:-2,y:0}, color);
    } else if(size == 1) {
      this._setRelativeSquare(center, {x:-2,y:-1}, color);
      this._setRelativeSquare(center, {x:-3,y:0}, color);
    } else if(size == 2) {
      this._setRelativeSquare(center, {x:-2,y:-1}, color);
      this._setRelativeSquare(center, {x:-3,y:-1}, color);
      this._setRelativeSquare(center, {x:-4,y:0}, color);
    }
  };

  Life.prototype._createShuttle = function(center, color){
    this._setRelativeSquare(center,{x:-11,y:0}, color);
    this._setRelativeSquare(center,{x:-11,y:-1}, color);
    this._setRelativeSquare(center,{x:-10,y:0}, color);
    this._setRelativeSquare(center,{x:-10,y:-1}, color);
    this._setRelativeSquare(center,{x:-7,y:1}, color);
    this._setRelativeSquare(center,{x:-7,y:0}, color);
    this._setRelativeSquare(center,{x:-7,y:-1}, color);
    this._setRelativeSquare(center,{x:-6,y:1}, color);
    this._setRelativeSquare(center,{x:-6,y:0}, color);
    this._setRelativeSquare(center,{x:-6,y:-1}, color);
    this._setRelativeSquare(center,{x:-2,y:3}, color);
    this._setRelativeSquare(center,{x:-2,y:2}, color);
    this._setRelativeSquare(center,{x:-2,y:-2}, color);
    this._setRelativeSquare(center,{x:-2,y:-3}, color);
    this._setRelativeSquare(center,{x:-1,y:-2}, color);
    this._setRelativeSquare(center,{x:-1,y:-1}, color);
    this._setRelativeSquare(center,{x:-1,y:0}, color);
    this._setRelativeSquare(center,{x:-1,y:1}, color);
    this._setRelativeSquare(center,{x:-1,y:2}, color);
    this._setRelativeSquare(center,{x:0,y:1}, color);
    this._setRelativeSquare(center,{x:0,y:0}, color);
    this._setRelativeSquare(center,{x:0,y:-1}, color);
    this._setRelativeSquare(center,{x:1,y:0}, color);
    this._setRelativeSquare(center,{x:9,y:0}, color);
    this._setRelativeSquare(center,{x:9,y:-1}, color);
    this._setRelativeSquare(center,{x:10,y:0}, color);
    this._setRelativeSquare(center,{x:10,y:-1}, color);
  };

  Life.prototype._createGliderGun = function(center, color){
    this._setRelativeSquare(center,{x:-18,y:0},color);
    this._setRelativeSquare(center,{x:-18,y:-1},color);
    this._setRelativeSquare(center,{x:-17,y:0},color);
    this._setRelativeSquare(center,{x:-17,y:-1},color);

    this._setRelativeSquare(center,{x:-7,y:0},color);
    this._setRelativeSquare(center,{x:-7,y:-1},color);
    this._setRelativeSquare(center,{x:-7,y:-2},color);
    this._setRelativeSquare(center,{x:-6,y:1},color);
    this._setRelativeSquare(center,{x:-6,y:-3},color);
    this._setRelativeSquare(center,{x:-5,y:2},color);
    this._setRelativeSquare(center,{x:-5,y:-4},color);
    this._setRelativeSquare(center,{x:-4,y:1},color);
    this._setRelativeSquare(center,{x:-4,y:-3},color);
    this._setRelativeSquare(center,{x:-3,y:0},color);
    this._setRelativeSquare(center,{x:-3,y:-1},color);
    this._setRelativeSquare(center,{x:-3,y:-2},color);
    this._setRelativeSquare(center,{x:-2,y:0},color);
    this._setRelativeSquare(center,{x:-2,y:-1},color);
    this._setRelativeSquare(center,{x:-2,y:-2},color);

    this._setRelativeSquare(center,{x:3,y:0},color);
    this._setRelativeSquare(center,{x:3,y:1},color);
    this._setRelativeSquare(center,{x:3,y:2},color);
    this._setRelativeSquare(center,{x:4,y:-1},color);
    this._setRelativeSquare(center,{x:4,y:0},color);
    this._setRelativeSquare(center,{x:4,y:2},color);
    this._setRelativeSquare(center,{x:4,y:3},color);
    this._setRelativeSquare(center,{x:5,y:-1},color);
    this._setRelativeSquare(center,{x:5,y:0},color);
    this._setRelativeSquare(center,{x:5,y:2},color);
    this._setRelativeSquare(center,{x:5,y:3},color);
    this._setRelativeSquare(center,{x:6,y:-1},color);
    this._setRelativeSquare(center,{x:6,y:0},color);
    this._setRelativeSquare(center,{x:6,y:1},color);
    this._setRelativeSquare(center,{x:6,y:2},color);
    this._setRelativeSquare(center,{x:6,y:3},color);
    this._setRelativeSquare(center,{x:7,y:4},color);
    this._setRelativeSquare(center,{x:7,y:3},color);
    this._setRelativeSquare(center,{x:7,y:-1},color);
    this._setRelativeSquare(center,{x:7,y:-2},color);

    this._setRelativeSquare(center,{x:12,y:0},color);
    this._setRelativeSquare(center,{x:12,y:-1},color);

    this._setRelativeSquare(center,{x:16,y:1},color);
    this._setRelativeSquare(center,{x:16,y:2},color);
    this._setRelativeSquare(center,{x:17,y:1},color);
    this._setRelativeSquare(center,{x:17,y:2},color);
  };

  Life.prototype._hasLock = function(x,y){
    for(var c in this.locked){
      if(this.locked[c].x == x && this.locked[c].y == y){
        return true;
      }
    }
    return false;
  };

  Life.prototype.start = function(){
    this.beginRender(this.draw);
  };

  Life.prototype.stop = function(){
    this.stopRender();
  };

  Life.prototype.pause = function(){
    this.playing = false;
  };

  Life.prototype.play = function(){
    this.playing = true;
  };


  Life.prototype.draw = function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(this.square_size > 30){
      this.initGrid();
    }

    if(this.clicked){
      var c = this.coordToSquare({
        x:this.mpX,
        y:this.mpY
      });
      if(!this._hasLock(c.x, c.y)) {
        this.locked.push({x: c.x, y: c.y});
        if (this.pattern) {
          this.createLifePattern(this.pattern, c, 1);
        } else {
          this.squares[c.x][c.y] = this.squares[c.x][c.y] == 1 ? 0 : 1;
        }
      }

    } else if(this.playing){
      this.locked = [];
      var c = this.coordToSquare({
        x:this.mpX,
        y:this.mpY
      });
      if(this.pattern){
        //this.createLifePattern(this.pattern, c, 0.1);
      } else if(!(this.squares[c.x][c.y] == 1)){
        //this.squares[c.x][c.y] = 0.1;
      }
    } else {
      this.locked = [];
    }

    if(this.newGeneration() && this.playing){
      this.step();
    }

    //this.square_size = (this.square_size + 1) % 10;
    //this.fadeAllSquares();
    this.drawSquares();
  };

  return Life;
});