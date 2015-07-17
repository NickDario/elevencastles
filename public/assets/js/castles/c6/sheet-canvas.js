$(function(){

    function SheetCanvas (config) {

        //  source configurations
        this.canvas_id = config['canvas'] != null ? config['canvas'] : 'canvas';

        //  initial computations
        this.canvas    = null;
        this.container = null;
        this.ctx       = null;

        //  external attributes
        this.canvas_rect = null;

        //  input/outputs
        this.mpX = null;
        this.mpY = null;

        this.audio_file = '';
        this.audioCtx = null;
        this.audioAnalyser = null;
        this.audioSource = null;

        this.fireworks = [];
        this.fireworksCount = 0;
        this.explosions = [];
        this.explosionsCount = 0;

        this.blueness  = 0;
        this.scoreboard = null;
        this.currentScore = null;
        this.highScore    = null;
        this.path    = [];
        this.step    = 0;
    }


    SheetCanvas.prototype = {

        init : function()
        {
            this._initCanvas();
            this._initAudio();
            this.beginRendering();
        },

        _initAudio : function()
        {
            console.log('_initAudio');
            try{
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
            } catch(e){
                console.log('web audio is not supported by this browser');
            }

            var audio_files = document.getElementsByTagName('audio');
            this.audioSource = this.audioCtx.createMediaElementSource(audio_files[0]);
            this.audioGain = this.audioCtx.createGain();

            //this.audioSource.connect(this.audioAnalyser);
            this.audioSource.connect(this.audioGain);
            this.audioGain.connect(this.audioCtx.destination);

            this.audioAnalyser = this.audioCtx.createAnalyser();
            this.audioSource.connect(this.audioAnalyser);
            //this.audioAnalyser.fftSize = 2048;
            this.audioAnalyser.fftSize = 1024;
            //this.audioAnalyser.fftSize = 512;
            //this.audioAnalyser.fftSize = 128;
            this.audioBufferLength = this.audioAnalyser.frequencyBinCount;
            this.audioDataArray = new Uint8Array(this.audioBufferLength);
            //this.audioAnalyser.getByteTimeDomainData(this.audioDataArray);
            this.audioAnalyser.getByteFrequencyData(this.audioDataArray);

            console.log(this.audioSource);
            console.log(this.audioCtx);

            var that = this;
            //$(audio_files[0]).on('ended', function(){
            //    that._displayPath();
            //    that.path = {};
            //    that.fireworks = {};
            //});
            $(audio_files[0]).on('ended', $.proxy(that._displayPath, that));
        },

        //_init

        _initAnalyzer: function(){

        },

        _initCanvas : function()
        {
            console.log('_initCanvas');

            var that = this;    //  event handler reference

            //this.canvas    = document.getElementById(this.canvas_id);
            this.canvas    = document.getElementById("sheet-canvas");
            this.canvas_rect = this.canvas.getBoundingClientRect();
            this.ctx       = this.canvas.getContext("2d");
            this.container = this.canvas.parentNode;

            this.canvas.height= this.container.clientHeight;
            this.canvas.width = this.container.clientWidth;


            window.onresize = function(){
                that.canvas.height= that.container.clientHeight;
                that.canvas.width = that.container.clientWidth;
                that.canvas_rect = that.canvas.getBoundingClientRect();
            };

            document.addEventListener('mousemove', function(e){
                that.mpX = e.pageX - that.canvas_rect.left;
                that.mpY = e.pageY - that.canvas_rect.top;

            });

            this.scoreboard   = $('#scoreboard');
            this.currentScore = $('.current', this.scoreboard);
            this.highScore    = $('.high', this.scoreboard);
        },

        beginRendering : function(){
            console.log('beginRendering');
            //this.renderBarGraph();

            //this.renderExplosion();
            //this.renderBarGraph();

            this.renderMountain();
        },

        renderWaveForm : function(){

            window.requestAnimationFrame(this.renderWaveForm.bind(this));

            this.audioAnalyser.getByteTimeDomainData(this.audioDataArray);

            this.ctx.fillStyle = 'rgb(200, 200, 200)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'rgb(0, 0, 0)';

            this.ctx.beginPath();

            var sliceWidth = this.canvas.width * 1.0 / this.audioBufferLength;
            var x = 0;

            //console.log(this.audioDataArray);

            for(var i = 0; i < this.audioBufferLength; i++) {

                var v = this.audioDataArray[i] / 128.0;
                console.log(v);
                var y = v * this.canvas.height/2;

                if(i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            this.ctx.lineTo(this.canvas.width, this.canvas.height/2);
            this.ctx.stroke();
        },

        renderBarGraph : function() {

            window.requestAnimationFrame(this.renderBarGraph.bind(this));
            this.audioAnalyser.getByteFrequencyData(this.audioDataArray);

            for (var i = 0; i < this.audioBufferLength; i++) {
                var value = this.audioDataArray[i];
                var percent = value / 256;
                var height = this.canvas.height * percent;
                var offset = this.canvas.height - height - 1;
                var barWidth = this.canvas.width/this.audioBufferLength;
                this.ctx.fillStyle = 'rgb(' + (255-value) + ', ' + (255-value) + ',255)';

                this.ctx.fillRect(i * barWidth, offset, barWidth, height);
            }

            //window.setTimeout(this.renderBarGraph.bind(this), 1000);
        },

        renderExplosion : function(){
            window.requestAnimationFrame(this.renderExplosion.bind(this));
            //window.setTimeout(this.renderExplosion.bind(this), 500);
            this.audioAnalyser.getByteFrequencyData(this.audioDataArray);

            //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            //  update audio
            for(var i = 0; i < this.audioBufferLength;i ++) {
                if (this.audioDataArray[i] > 10) {
                    var barWidth = Math.floor(this.canvas.width/this.audioBufferLength) * 4;
                    var x_loc = i * barWidth / 2;

                    var value = this.audioDataArray[i];
                    var percent = value / 256;
                    var height = this.canvas.height * percent;
                    var y_loc = this.canvas.height - height - 1;

                    this._triggerFirework(x_loc, y_loc);
                }
            }


            //  update fireworks
            for(var x = this.fireworks.length; x--;){
                if(this.fireworks[x].y < 0){
                    this._triggerExplosion(this.fireworks[x].x);
                    this.fireworks.splice(x, 1);
                    this.fireworksCount --;
                } else {
                    var x_distance = (this.fireworks[x].x + this.fireworks[x].ox) - this.mpX;
                    var y_distance = (this.fireworks[x].y + this.fireworks[x].oy) - this.mpY;
                    var r_d = Math.sqrt((Math.pow(x_distance, 2) + Math.pow(y_distance, 2)));
                    if(r_d < 30){
                        this.fireworks[x].ox += (2*r_d)/x_distance;
                    } else {
                        //if(this.fireworks[x].ox > 0){
                        //    this.fireworks[x].ox -= 1;
                        //}
                        //if(this.fireworks[x].ox < 0){
                        //    this.fireworks[x].ox += 1;
                        //}
                        //
                        //if(this.fireworks[x].oy > 0){
                        //    this.fireworks[x].oy -= 1;
                        //}
                        //if(this.fireworks[x].oy < 0){
                        //    this.fireworks[x].oy += 1;
                        //}
                    }
                    this.ctx.beginPath();
                    //this.ctx.strokeStyle = 'rgb(' +this.fireworks[x].r+ ','+this.fireworks[x].g+','+this.fireworks[x].b+')';
                    this.ctx.strokeStyle = 'rgba(' +this.fireworks[x].r+ ','+this.fireworks[x].g+','+this.fireworks[x].b+','+this.fireworks[x].a+')';
                    this.fireworks[x].y -= 3;
                    //this.fireworks[x].a -= 0.005;
                    //this.fireworks[x].b -= 5;
                    this.fireworks[x].r += 1.25;
                    this.fireworks[x].g += 1.25;

                    //this.ctx.strokeStyle = 'rgba(' +this.fireworks[x].r+ ','+this.fireworks[x].g+','+this.fireworks[x].b+','+this.fireworks[x].a+')';
                    this.ctx.moveTo(this.fireworks[x].x + this.fireworks[x].ox,this.fireworks[x].y + this.fireworks[x].oy);
                    this.ctx.lineTo(this.fireworks[x].x + this.fireworks[x].ox,this.fireworks[x].y + this.fireworks[x].oy + 5);
                    this.ctx.stroke();
                }
            }

            for(var l = this.explosionsCount; l--;){

            }
        },


        renderMountain : function(){

            window.requestAnimationFrame(this.renderMountain.bind(this));
            this.audioAnalyser.getByteFrequencyData(this.audioDataArray);

            this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            var barWidth = this.canvas.width/(2*this.audioBufferLength);

            for(var i = this.audioBufferLength; i--;) {
                var value = this.audioDataArray[i];
                var percent = value / 256;
                var height = this.canvas.height * percent * .4;
                var offset = this.canvas.height - height - 1;
                this.ctx.fillStyle = 'rgb(' + (255-value) + ', ' + (255-value) + ',255)';
                this.ctx.fillRect(this.canvas.width/2 + (i * barWidth), offset-35, barWidth, height+35);
            }

            for(var i = this.audioBufferLength; i--;) {
                var value = this.audioDataArray[i];
                var percent = value / 256;
                var height = this.canvas.height * percent * .4;
                var offset = this.canvas.height - height - 1;
                this.ctx.fillStyle = 'rgb(' + (255-value) + ', ' + (255-value) + ',255)';
                this.ctx.fillRect(this.canvas.width/2 - (i * barWidth), offset-35, barWidth, height+35);
            }

            //this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            var canvas_middle = this.canvas.width/2;


            //  update audio
            barWidth = Math.floor(this.canvas.width/(2* this.audioBufferLength)) * 8;
            for(var i = 0; i < this.audioBufferLength;i ++) {
                if (this.audioDataArray[i] > 10) {
                    var x_loc =  i * (barWidth / 2);

                    var value = this.audioDataArray[i];
                    var percent = value / 256;
                    var height = this.canvas.height * percent;
                    var y_loc = this.canvas.height - height - 1;

                    this._triggerFirework(canvas_middle - x_loc, y_loc);
                    this._triggerFirework(canvas_middle + x_loc, y_loc);
                }
            }

            this.path[this.step] = [];
            //  update fireworks
            var alive = false;
            for(var x = this.fireworks.length; x--;){
                if(this.fireworks[x].y < 0){
                    this.path[this.step].push(this.fireworks[x]);
                    this._triggerExplosion(this.fireworks[x].x);
                    this.fireworks.splice(x, 1);
                    this.fireworksCount --;
                } else {
                    var x_distance = (this.fireworks[x].x + this.fireworks[x].ox) - this.mpX;
                    var y_distance = (this.fireworks[x].y + this.fireworks[x].oy) - this.mpY;
                    var r_d = Math.sqrt((Math.pow(x_distance, 2) + Math.pow(y_distance, 2)));
                    if(r_d < 30){
                        var rb_diff = this.fireworks[x].b - this.fireworks[x].r;
                        if(rb_diff > 0){
                            this.blueness += rb_diff;
                        }
                        alive = true;
                        this.fireworks.splice(x,1);
                        //this.fireworks[x].ox += (2*r_d)/x_distance;
                    }
                    this.ctx.beginPath();
                    //this.ctx.strokeStyle = 'rgb(' +this.fireworks[x].r+ ','+this.fireworks[x].g+','+this.fireworks[x].b+')';
                    this.ctx.strokeStyle = 'rgba(' +this.fireworks[x].r+ ','+this.fireworks[x].g+','+this.fireworks[x].b+','+this.fireworks[x].a+')';
                    this.fireworks[x].y -= 6;
                    //this.fireworks[x].a -= 0.005;
                    //this.fireworks[x].b -= 5;
                    this.fireworks[x].r += 3;
                    this.fireworks[x].g += 3;

                    //this.ctx.strokeStyle = 'rgba(' +this.fireworks[x].r+ ','+this.fireworks[x].g+','+this.fireworks[x].b+','+this.fireworks[x].a+')';
                    this.ctx.moveTo(this.fireworks[x].x + this.fireworks[x].ox,this.fireworks[x].y + this.fireworks[x].oy);
                    this.ctx.lineTo(this.fireworks[x].x + this.fireworks[x].ox,this.fireworks[x].y + this.fireworks[x].oy + 5);
                    this.ctx.stroke();
                }
            }

            //console.log(this.path);

            if(!alive){
                this.blueness = 0;
            }
            this.step ++;

            this.currentScore.text(this.blueness);
            if(this.blueness > this.highScore.text()){
                this.highScore.text(this.blueness);
            }

            for(var l = this.explosionsCount; l--;){

            }
        },

        _triggerFirework : function(x_loc, y_loc){
            this.fireworks.push({
                x : x_loc,
                y : y_loc,
                oy: 0,
                ox: 0,
                r : 0,
                g : 0,
                b : 255,
                a : 1
            });
            this.fireworksCount ++;
        },

        _triggerExplosion : function (location){

        },

        _displayPath : function() {

            window.onresize = function(){};

            this.renderMountain = null;
            this.canvas.height = 2 * this.step;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for(var y = 0; y < this.step; y ++) {
                for(var x in this.path[y]) {
                    this.ctx.fillStyle = 'rgb(' + this.path[y][x].r + ',' + this.path[y][x].g + ',' + this.path[y][x].b + ')';
                    console.log(y);
                    this.ctx.fillRect(this.path[y][x].x, y, 2, 2);
                }
            }

        }

    };


    var canvas = new SheetCanvas({
        canvas : 'sheet-canvas'
    });

    canvas.init();



});


