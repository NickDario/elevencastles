define(['etc/Canvas', 'etc/Audio'], function(Canvas, Audio){

  var MusicPath = function(config){

    //this.canvas = new Canvas(config);
    //this.audio = new Audio(config);
    Canvas.call(this, config);
    Audio.call(this, config);

    this.memory = [];
    this.memoryCount = 0;

    this.riseOffset = .05; //percent
    this.weight     = 150; // inversely related to rate of rise
    this.ch2 = 0;

    this.r_bucket = 30;
    this.bucket = 0;
    this.f_bucket = 2000;



    this.blueness  = 0;
    this.scoreboard = null;
    this.currentScore = null;
    this.highScore    = null;
    this.path    = [];
    this.step    = 0;
    this.pathcanvas_id = config['pathcanvas_id'];

    return this;
  };

  MusicPath.constructor = MusicPath;
  $.extend(MusicPath.prototype, Canvas.prototype);
  $.extend(MusicPath.prototype, Audio.prototype);
  MusicPath.prototype.init = function()
  {
    this.setupCanvas();
    this.setupPathCanvas();
    this.setupAudio();
    this.setupAudioControls();
    this.setupScoreboard();
    $(this.audio_file).trigger('play');
  };

  MusicPath.prototype.setupPathCanvas = function()
  {
    this.pathcanvas = new Canvas({canvas_id:this.pathcanvas_id});
    this.pathcanvas.initCanvas();
  };

  MusicPath.prototype.setupCanvas = function()
  {
    this.initCanvas();
    this.initMouse();
    this.initDynamicCanvas();
  };

  MusicPath.prototype.setupAudio = function()
  {
    this.initAudioWithFreq();
    this.onFin(function(){
      this._displayPath();
      this.cleanupAudioWithFreq();
      $(this).trigger('complete');
    });
  };

  MusicPath.prototype.setupAudioControls = function()
  {
    var that = this;
    $(this.audio_file).on('pause', function(){
      that.cancelDynamicCanvas();
      that.stopRender();
      that._displayPath();
    });
    $(this.audio_file).on('play', function(){
      that._hidePath();
      that.setupCanvas();
      that.start();
    });
    $(this.audio_file).on('seeked', function(){});
    $('canvas').on('mousedown', function(){
      if(that.rendering){
        $(that.audio_file).trigger('pause');
      } else {
        $(that.audio_file).trigger('play');
      }
    });
  };

  MusicPath.prototype.setupScoreboard = function()
  {
    this.scoreboard   = $('.scoreboard');
    this.currentScore = $('.current', this.scoreboard);
    this.highScore    = $('.high', this.scoreboard);
  };

  MusicPath.prototype.start = function()
  {
    this.beginRender(this.renderMountain);
  };

  MusicPath.prototype.renderMountain = function(){

    this.audioAnalyser.getByteFrequencyData(this.audioDataArray);
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

    this._drawMouse();

    var canvasMid = this.canvas.width/2;
    var canvasHeight = this.canvas.height;
    var barWidth = canvasMid/this.audioBufferLength;
    var memorySpread = 3;
    for(var i = this.audioBufferLength; i--;){
      var value = this.audioDataArray[i];
      var percent = value / 256;

      var barHeight = canvasHeight * percent * .4;
      var barOffset = canvasHeight - barHeight - 1;
      this.ctx.fillStyle = 'rgb(' + (255-value) + ', ' + (255-value) + ',255)';
      this.ctx.fillRect(canvasMid + (i * barWidth), barOffset-15, barWidth, barHeight+15);
      this.ctx.fillRect(canvasMid - (i * barWidth), barOffset-15, barWidth, barHeight+15);

      if(value > 10){
        var fwHeight = canvasHeight * percent;
        var fwOffset = canvasHeight - fwHeight - 1;
        var x_loc =  i * (barWidth * memorySpread);
        this._createMemory(canvasMid - x_loc, fwOffset);
        this._createMemory(canvasMid + x_loc, fwOffset);
      }
    }

    this.path[this.step] = [];
    var alive = false;
    for(var x = this.memory.length; x--;){
      var memory = this.memory[x];
      if(memory.y < 0){
        this.path[this.step].push(memory);
        this.memory.splice(x, 1);
        this.memoryCount --;
      } else {
        var x_distance = (memory.x + memory.ox) - this.mpX;
        var y_distance = (memory.y + memory.oy) - this.mpY;
        var r_d = Math.sqrt((x_distance*x_distance) + (y_distance* y_distance));
        if(r_d < this.r_bucket){
          var rb_diff = memory.b - memory.r;
          if(rb_diff > 0){
            this.bucket += rb_diff/255;
          }
          alive = true;
          this.memory.splice(x,1);
        }
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(' +memory.r+ ','+memory.g+','+memory.b+','+memory.a+')';

        memory.y -= this.canvas.height/this.weight;
        var dt = this.canvas.height - memory.y;
        memory.r += Math.ceil(255*dt/this.canvas.height/20);
        memory.g += Math.ceil(255*dt/this.canvas.height/20);

        this.ctx.moveTo(memory.x + memory.ox,memory.y + memory.oy);
        this.ctx.lineTo(memory.x + memory.ox,memory.y + memory.oy + 5);
        this.ctx.stroke();
      }
    }
    this.step ++;

    if(!alive){
      this.bucket -= 100;
    }
    if(this.bucket >= this.f_bucket){ // count points when buckets full.
      this.bucket = this.f_bucket;
      this.blueness ++;
    } else if(this.bucket <= 0){  //  reset if bucket empties
      this.bucket = 0;
      this.blueness = 0;
    }


    this.currentScore.text(this.blueness);
    if(this.blueness > this.highScore.text()){
      this.highScore.text(this.blueness);
    }
  };

  MusicPath.prototype._drawMouse = function()
  {
    var life = this.bucket/this.f_bucket;
    var r = 0, g = Math.floor(122 * life), b = Math.floor(200 * life);

    this.ctx.moveTo(this.mpX + this.r_bucket, this.mpY);
    this.ctx.strokeStyle = 'rgba(255,255,255,'+ (life + 0.2) +')';
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = 'rgba('+r+','+ g+','+b+','+life+')';
    this.ctx.arc(this.mpX, this.mpY, this.r_bucket, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.lineWidth = 1;
  };


  MusicPath.prototype._createMemory = function(x_loc, y_loc){
    this.memory.push({
      x : x_loc,
      y : y_loc,
      oy: 0,
      ox: 0,
      r : 0,
      g : 0,
      b : 255,
      a : 1
    });
    this.memoryCount ++;
  };



  MusicPath.prototype._displayPath = function()
  {
    this.container.style.display = 'none';
    this.pathcanvas.container.style.display = 'block';
    this.cancelDynamicCanvas();
    this.stopRender();

    this.pathcanvas.canvas.height = this.step;
    this.pathcanvas.ctx.clearRect(0, 0, this.pathcanvas.canvas.width, this.pathcanvas.canvas.height);

    for(var y = 0; y < this.step; y ++) {
      for(var x in this.path[y]) {
        this.pathcanvas.ctx.fillStyle = 'rgb(' + this.path[y][x].r + ',' + this.path[y][x].g + ',' + this.path[y][x].b + ')';
        this.pathcanvas.ctx.fillRect(this.path[y][x].x, y, 2, 2);
      }
    }
  };

  MusicPath.prototype._hidePath = function()
  {
    this.pathcanvas.container.style.display = 'none';
    this.container.style.display = 'block';
  };

  return MusicPath;
});
