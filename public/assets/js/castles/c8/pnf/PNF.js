/**
 * Created by ndario on 4/26/15.
 */
define(['etc/Canvas', 'c8/pnf/Geomorph'], function(Canvas, Geomorph){

    var PNF = function(config){
        Canvas.call(this, config);

        this.lineCount = config['lineCount'] != null ? config['lineCount'] : 10;
        this.lines = [];

        this.geo1  = {};
        this.geo2  = {};

        this.ball1 = {};

        this.showvectors = false;
        this.animating   = false;
    };

    PNF.constructor = PNF;
    $.extend(PNF.prototype, Canvas.prototype);

    PNF.prototype.init = function()
    {
        this.initCanvas();
        this.initMouse();
        this.initPlayers();
        this.initLines();
        this.initCircles();
        this.initEventHandlers();

        this.start();
    };

    PNF.prototype.initPlayers = function()
    {
        var that = this;
        that.geo1 = that._createNewPlayer();
        that.geo2 = that._createNewPlayer();
        window.setTimeout(function(){
            that.geo1.alive = true;
        }, 500);
        window.setTimeout(function(){
            //that.geo2.alive = true;
        }, 2500);
    };

    PNF.prototype.initCircles = function()
    {
        var that = this;
        that.ball1 = that._createBall({
            cx : this.canvas.width * Math.floor(Math.random() * 2),
            cy : this.canvas.height * Math.floor(Math.random() * 2)
        });
    };

    PNF.prototype.initLines = function()
    {
        for(var i = this.lineCount; i --;) {
            this.lines.push(this._createLine());
        }
    };

    PNF.prototype.initEventHandlers = function()
    {
        var that = this;
        $('#show-vectors').on('click', function(){
            $(this).toggleClass('on');
            that.showvectors = !that.showvectors;
        });
        $('#info').on('click', function(){
            $(this).toggleClass('on');
            if(that.animating){
                that.stop()
            } else if(that.animating === false){
                that.start()
            }
        });
    };


    PNF.prototype._createLine = function()
    {
        return new Geomorph({
            edges: 2,
            spinrate : (Math.random() *.02) - .01
        });
    };

    PNF.prototype._createNewPlayer = function()
    {
        return new Geomorph({
            edges: 3,
            spinrate:0.09
        });
    };

    PNF.prototype._createBall = function(config)
    {
        config.edges = 0;
        config.dampen = 0.02;
        return new Geomorph(config);
    };

    PNF.prototype._promoteGeomorph = function(geo)
    {
        if(geo.edges < 11){
            geo.addEdge();
            geo.spinRate -= 0.01;
        }
    };

    PNF.prototype._demoteGeomorph = function(geo)
    {
        if(geo.edges > 3){
            geo.removeEdge();
            geo.spinRate += 0.01;
        }
    };

    PNF.prototype._lineMove = function(line)
    {
        if(line.cx < 0 || this.canvas.width < line.cx){
            line.setReflection({x:1, y:0});
        }
        if(line.cy < 0 || this.canvas.height < line.cy){
            line.setReflection({x:0, y:1});
        }
        line.move();
    };

    PNF.prototype.start = function()
    {
        this.beginRender(this.gameloop);
        this.animating = true;
    };

    PNF.prototype.stop = function()
    {
        this.stopRender();
        this.animating = false;
    };

    PNF.prototype.gameloop = function()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var i;
        if(this.geo1.alive){
            this.geo1.fillcolor = 'rgba(0, 155, 255, 0.4)';
            this.geo1.drawInContext(this.ctx);
            this.geo1.moveToCoordinates(this.mpX,this.mpY);
            for(i = this.lines.length; i--;){
                if(this.geo1.checkIntersect(this.lines[i])){
                    this.lines[i] = this._createLine();
                    this._promoteGeomorph(this.geo1);
                }
            }
            if(this.geo1.edges > this.geo2.edges){
                if(this.geo1.checkIntersect(this.geo2)){
                    this._demoteGeomorph(this.geo1);
                }
            }
        }

        if(this.ball1.checkIntersect(this.geo1)){
            this._demoteGeomorph(this.geo1);
        }
        this.ball1.setTarget(this.geo1.getCenter());
        //this.ball1.drawVectors(this.ctx);
        this.ball1.easeDirectionToTarget(1);
        this.ball1.move();
        this.ball1.fillcolor = 'rgba(0,0,255,.4)';
        this.ball1.drawInContext(this.ctx);
        if(this.showvectors){
            this.ball1.drawVectors(this.ctx);
        }


        if(this.geo2.alive){
            this.geo2.fillcolor = 'rgba(255, 0, 155, 0.4)';
            this.geo2.moveToCoordinates(this.canvas.width/2, this.canvas.height/2);
            this.geo2.drawInContext(this.ctx);
            for(i = this.lines.length; i--;){
                if(this.geo2.checkIntersect(this.lines[i])){
                    this.lines[i] = this._createLine();
                    this._promoteGeomorph(this.geo2);
                }            }
            if(this.geo2.edges > this.geo1.edges){
                if(this.geo2.checkIntersect(this.geo1)){
                    this._demoteGeomorph(this.geo2);
                }
            }
        }

        var c = this.lines.length;
        for(i = c; i --;) {
            if(this.lines[i].alive == false){
                this.lines[i].moveToCoordinates(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height
                );
                this.lines[i].setDirection({x:(Math.random() * 5) - 2.5, y:(Math.random() * 5) - 2.5});
                this.lines[i].alive = true;
            }
            if(this.showvectors){
                this.lines[i].drawVectors(this.ctx);
            }
            this.lines[i].fillcolor = 'rgba(55, 185, 135, 0.4)';
            this._lineMove(this.lines[i]);
            this.lines[i].drawInContext(this.ctx);
        }


        //this.geo2.drawInContext(this.ctx, {x:0,y:0});
    };



    return PNF;
});