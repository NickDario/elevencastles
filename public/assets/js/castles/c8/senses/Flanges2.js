/**
 * Created by ndario on 5/24/15.
 */

define(
['c8/senses/Sensesii', 'etc/SegmentN2D', 'etc/VectorN2D'],
function(Sense, Segment2D, Vector2D)
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
            var x = Vector2D.atAngle(this.direction, r);
            var s = Vector2D.normalize(x);
            this.flanges.push({o:this.source,u:s});
        }
    };

    Flange.prototype.resetFlanges = function(c,d)
    {
        this.center = c;
        this.sensation = {x:0, y:0};
        this.direction = d;
        this._initFlanges();
    };

    /**
     * @param input // standard segment form
     */
    Flange.prototype.sense = function(input)
    {
        this.sensation = Vector2D.add(this.sensation, this._checkFlanges(input));
    };

    /**
     * @param input // standard segment form
     */
    Flange.prototype._checkFlanges = function(input)
    {
        for(var i = this.flange_count; i--;) {
            if(Segment2D.checkIntersect(this.flanges[i], input)){
                return this.flanges[i].u;
            }
        }
        return {x:0, y:0};
    };

    return Flange;

});

