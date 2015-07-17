/**
 * Created by ndario on 5/17/15.
 */

define(
['etc/VectorND', 'etc/SegmentND', 'c8/senses/Senses', 'c8/senses/Flanges'],
function(Vector, Segments, Sense, Flanges)
{
    var Vehicle = function(config)
    {
        this.uuid = 0;
        this.center = new Vector(0,0);
        if(config['center'] != null){
            this.center.setVector(config['center']);
        }

        this.config = config;

        this.direction  = new Vector;

        this.tailColor = config['tailcolor'] ? config['tailcolor'] : 'rgba(25, 125, 155, 0.75)';
        this.bodyColor = config['bodycolor'] ? config['bodycolor'] : 'rgba(255, 255, 255, 1)';

        this.senses_count = config['senses_count'] != null ? config['senses_count'] : 2;
        this.senses = {};

        this.radialSize = config['radius'] != null ? config['radius'] : 20;

        this.alive = false;
        this.body_segments = [];
        this.body_points = [];

        this.init();
    };

    Vehicle.constructor = Vehicle;
    Vehicle.prototype.drawInContext = function(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.center.getX(), this.center.getY());

        ctx.strokeStyle  = this.tailColor;
        ctx.fillStyle    = this.bodyColor;
        ctx.strokeWeight = 20;
        ctx.strokeWidth  = 20;

        ctx.lineTo(this.center.getX() - this.direction.getNormalized(10).getX(), this.center.getY() - this.direction.getNormalized(10).getY());
        ctx.moveTo(this.center.getX(), this.center.getY());

        this._createBody();
        ctx.moveTo(this.getCX()+this.direction.getX(), this.getCY() + this.direction.getY());
        for(var i = 0; i < this.body_points.length; i ++) {
            if(i){
                ctx.lineTo(this.body_points[i].x, this.body_points[i].y);
            } else {
                ctx.moveTo(this.body_points[i].x, this.body_points[i].y);
            }
        }

        //for(var i = 0; i < this.body_segments.length; i ++){
            //this.body_segments[i].drawInContext(ctx);
        //}

        ctx.fill();
        ctx.stroke();
    };

    Vehicle.prototype.init = function()
    {
        this._initIdentity();
        this._initRandomSenses();
    };

    Vehicle.prototype._initIdentity = function()
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

    Vehicle.prototype._initRandomSenses = function()
    {
        for(var i = 0; i < this.senses_count; i ++){
            this.senses[i] = new Flanges({
                center      : this.center,
                offset      : (2*Math.PI)/(i+1),
                radius      : 50,
                arc         : Math.PI / 2,
                flange_count : 5
            });
        }
    };

    Vehicle.prototype._createBody = function()
    {
        this._createPoints();
        this._createSegmentsFromPoints();
    };

    Vehicle.prototype._createPoints = function()
    {
        this.body_points = [];
        var c = 2*Math.PI;
        for(var x = 0; x < c; x += c/4){
            //  Create Points
            var va = this.direction.getVectorAtAngle(x);
            va.normalize(3);
            this.body_points.push({
                x: this.getCX() + va.getX(),
                y: this.getCY() + va.getY()
            });
        }
    };

    Vehicle.prototype._createSegmentsFromPoints = function()
    {
        this.body_segments = [];
        for(var i = 0; i < this.body_points.length; i ++){

            var o = this.body_points[i];
            var u = this.body_points[i+1] || this.body_points[0];

            this.body_segments.push(new Segments(o,{
                x: u.x - o.x,
                y: u.y - o.y
            }));
        }
    };

    Vehicle.prototype.getSegments = function()
    {
        return this.body_segments;
    };

    Vehicle.prototype.getCX = function()
    {
        return this.center.getX();
    };

    Vehicle.prototype.getCY = function()
    {
        return this.center.getY();
    };

    Vehicle.prototype.moveToPoint = function(v)
    {
        this.center.setVector(v);
    };

    Vehicle.prototype.move = function()
    {
        this.center.addVector(this.direction);
        for(var i = 0; i < this.senses_count; i++){
            this.senses[i].resetFlanges(this.center, this.direction);
        }
    };

    Vehicle.prototype.behavior = function()
    {
        for(var i = 0; i < this.senses_count; i ++){
            this.direction.addVector(this.senses[i].sensation);
        }
    };

    Vehicle.prototype.sense = function(vehicle)
    {
        for(var i = 0; i < this.senses_count; i ++){
            this.senses[i].sense(vehicle);
            this.senses[i].sensation.normalize();
        }
    };

    return Vehicle

});