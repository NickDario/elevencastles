/**
 * Created by ndario on 5/24/15.
 */

define(
['etc/VectorND', 'etc/SegmentND', 'c8/senses/Senses', 'c8/senses/Flanges'],
function(Vector, Segments, Sense, Flanges)
{
    var Vehicle2 = function(config)
    {
        this.uuid = 0;
        this.center = new Vector(0,0);
        if(config['center'] != null){
            this.center.setVector(config['center']);
        }

        this.config = config;



        //  Meta-attributes
        this.direction  = config['direction'] != null ? config['direction'] : new Vector;
        this.enthusiasm = config['enthusiasm'] != null ? config['enthusiasm'] : 2;
        this.momentum  = config['momentum'] != null ? config['momentum'] : 5;

        this.radialSize = 0;    //  computed based on the largest sensory radius

        //  Senses
        this.senses_count = config['senses_count'] != null ? config['senses_count'] : 2;
        this.senses = {};


        //  Physical Attributes
        this.form      = config['form'] != null ? config['form'] : Vehicle2.FORMS['circle'];
        this.tailColor = config['tailcolor'] != null ? config['tailcolor'] : 'rgba(25, 125, 155, 0.75)';
        this.tailSize  = 10;
        this.bodyColor = config['bodycolor'] != null ? config['bodycolor'] : 'rgba(255, 255, 255, 1)';
        this.bodySize  = 5;
        this.body_segments = null;
        this.body_points = null;

        this.alive = false;

        this.init();
    };

    Vehicle2.constructor = Vehicle2;

    Vehicle2.FORMS = {
        diamond : 0,
        circle : 1
    };

    Vehicle2.prototype.drawInContext = function(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.center.getX(), this.center.getY());

        ctx.strokeStyle  = this.tailColor;
        ctx.fillStyle    = this.bodyColor;
        ctx.strokeWeight = 20;
        ctx.strokeWidth  = 20;

        ctx.moveTo(this.center.getX(), this.center.getY());
        ctx.lineTo(
            this.center.getX() - this.direction.getNormalized(this.tailSize).getX(),
            this.center.getY() - this.direction.getNormalized(this.tailSize).getY()
        );

        switch(this.form){
            case Vehicle2.FORMS['circle']:
                this.drawAsCircle(ctx);
                break;
            case Vehicle2.FORMS['diamond']:
                this.drawAsDiamond(ctx);
                break;
            default:
                this.drawAsCircle(ctx);
        }

        ctx.fill();
        ctx.stroke();
    };

    Vehicle2.prototype.drawAsCircle = function(ctx)
    {
        ctx.moveTo(this.center.getX(), this.center.getY());
        ctx.arc(this.center.getX(), this.center.getY(), 3, 0, 2*Math.PI);
    };

    Vehicle2.prototype.drawAsDiamond = function(ctx)
    {
        ctx.moveTo(this.getCX()+this.direction.getX(), this.getCY() + this.direction.getY());
        for(var i = 0; i < this.body_points.length; i ++) {
            if(i){
                ctx.lineTo(this.body_points[i].x, this.body_points[i].y);
            } else {
                ctx.moveTo(this.body_points[i].x, this.body_points[i].y);
            }
        }
    };

    Vehicle2.prototype.drawSensesInContext = function(ctx)
    {
        for(var l = 0; l < this.senses_count; l++){
            for(var m = 0; m < this.senses[l].flange_count; m++) {
                if(this.senses[l].negative){
                    ctx.strokeStyle = 'rgb(255,150,0)'
                } else {
                    ctx.strokeStyle = 'rgb(0,255,150)'
                }
                this.senses[l].flanges[m].drawInContext(ctx);
            }
        }
    };


    Vehicle2.prototype.init = function()
    {
        this._initIdentity();
        this._updateBody();
        this._initRandomSenses();
    };

    Vehicle2.prototype._initIdentity = function()
    {
        // http://www.broofa.com/Tools/Math.uuid.htm

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
        var uuid = new Array( 36 );
        var rnd = 0, r;

        this.uuid = function () {

            for ( var i = 0; i < 36; i ++ ) {
                if ( i == 8 || i == 13 || i == 18 || i == 23 ) {
                    uuid[ i ] = '-';
                } else if ( i == 14 ) {
                    uuid[ i ] = '4';
                } else {
                    if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[ i ] = chars[ ( i == 19 ) ? ( r & 0x3 ) | 0x8 : r ];
                }
            }

            return uuid.join( '' );

        }();
    };

    Vehicle2.prototype._updateBody = function()
    {
        if(this.form == Vehicle2.FORMS['diamond']){
            this.body_points = [];
            var c = 2*Math.PI;
            for(var x = 0; x < c; x += c/4) {
                //  Create Points
                var va = this.direction.getVectorAtAngle(x);
                va.normalize(3);
                this.body_points.push({
                    x: this.getCX() + va.getX(),
                    y: this.getCY() + va.getY()
                });
            }
            this.body_segments = [];
            for(var i = 0; i < this.body_points.length; i ++){

                var o = this.body_points[i];
                var u = this.body_points[i+1] || this.body_points[0];

                this.body_segments.push(new Segments(o,{
                    x: u.x - o.x,
                    y: u.y - o.y
                }));
            }
        }
    };

    Vehicle2.prototype._initRandomSenses = function()
    {
        this.senses_count = 2 + Math.floor(Math.random() * 5);

        for(var i = 0; i < this.senses_count; i ++){
            var arc = (Math.PI / 2) * Math.random();
            this.senses[i] = new Flanges({
                negative   : Math.random() * this.senses_count < i,
                center       : this.center,
                offset       : (2*Math.PI)/(i + 1),
                radius       : 20 + Math.floor(Math.random() * 30),
                arc          : arc,
                flange_count : Math.floor(arc/(Math.PI/20))
            });
            this.radialSize = this.senses[i].radius > this.radialSize
                ? this.senses[i].radius
                : this.radialSize;
        }
    };

    Vehicle2.prototype.getCX = function()
    {
        return this.center.getX();
    };

    Vehicle2.prototype.getCY = function()
    {
        return this.center.getY();
    };

    Vehicle2.prototype.moveToPoint = function(v)
    {
        this._updateBody();
        this.center.setVector(v);
    };

    Vehicle2.prototype.move = function()
    {
        this._updateBody();
        this.center.addVector(this.direction);
        for(var i = 0; i < this.senses_count; i++){
            this.senses[i].resetFlanges(this.center, this.direction);
        }
    };

    Vehicle2.prototype.behavior = function()
    {
        var m = this.direction.getMagnitude();
        var v = this.direction.vectorSubtract(this.direction.getNormalized(this.enthusiasm)).scalarMultiply(1/this.momentum);
        if( m != this.enthusiasm){
            this.direction.subtractVector(v);
        }

        for(var i = 0; i < this.senses_count; i ++){
            this.direction.addVector(this.senses[i].sensation);
        }
        this.move();
    };

    Vehicle2.prototype.sense = function(vehicle, type)
    {
        for(var i = 0; i < this.senses_count; i ++){
            this.senses[i].sense(vehicle, type);
            this.senses[i].sensation.normalize();
        }
    };

    return Vehicle2

});