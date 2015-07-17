/**
 * Created by ndario on 5/18/15.
 */

define(
['c8/senses/Senses', 'etc/SegmentND', 'etc/VectorND'],
function(Sense, Segment, Vector)
{

    /**
     * Flange Sense
     *
     * uses radial vectors from sensory source
     *
     * @constructor
     */
    var Flange = function(config)
    {
        Sense.call(this, config);

        this.flange_count = config['flange_count'] != null ? config['flange_count'] : 6;
        this.flanges = [];

        this.init()
    };

    $.extend(Flange.prototype, Sense.prototype);

    Flange.prototype.init = function()
    {
        this._initFlanges();
    };

    Flange.prototype._initFlanges = function()
    {
        this.flanges = [];
        var arc_section = this.arc / this.flange_count;
        var start_radian = -this.arc/2;

        for(var r = start_radian; r <= this.arc/2; r += arc_section) {
            var s = this.direction.getVectorAtAngle(r);
            s.normalize(this.radius);
            this.flanges.push(new Segment({x:this.source.getX(), y:this.source.getY()},{x:s.getX(), y:s.getY()}));
        }
    };

    Flange.prototype.resetFlanges = function(c,d)
    {
        this.center = c;
        this.sensation.setVector({x:0,y:0});
        this.setDirection(d);
        this._initFlanges();
    };

    /**
     *
     * @param vehicle
     * @param type  //  0: detect segment, 1: detect circle
     */
    Flange.prototype.sense = function(vehicle, type)
    {
        type = type || 0;

        switch(type){
            case 0:
                var v = this.negative ? this._checkFlangesSegments(vehicle).scalarMultiply(-1) : this._checkFlangesSegments(vehicle);
                this.sensation.addVector(v);
                return;
            case 1:
                var v = this.negative ? this._checkFlangesCircle(vehicle).scalarMultiply(-1) : this._checkFlangesCircle(vehicle);
                this.sensation.addVector(v);
                return;
            default:
                return
        }
    };

    Flange.prototype._checkFlangesSegments = function(vehicle)
    {
        for(var i = this.flange_count; i--;) {
            var segments = vehicle.body_segments;
            for(var x in segments) {
                if(this.flanges[i].checkSegmentIntersect(segments[x])){
                    return new Vector(this.flanges[i].u.getX(), this.flanges[i].u.getY());
                }
            }
        }
        return new Vector(0,0);
    };

    Flange.prototype._checkFlangesCircle = function(circle)
    {
        for (var i = this.flange_count; i--;) {
            if (this.flanges[i].checkCircleIntersect(circle.center, circle.bodySize)) {
                return new Vector(this.flanges[i].u.getX(), this.flanges[i].u.getY());
            }
        }
        return new Vector(0, 0);
    };

    return Flange;

});
