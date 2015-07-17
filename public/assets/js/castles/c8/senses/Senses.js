

define(['etc/VectorND', 'etc/SegmentND'], function(Vector, Segment){
    /**
     * More specific sense extend Sense and must define the 'sense' function
     *
     * @param type
     * @param config
     * @constructor
     */
    var Sense = function(config)
    {
        this.type = config['type'] != null ? config['type'] : 'flange';

        this.source = config['center'] != null ? config['center'] : new Vector;
        this.arc    = config['arc'] != null ? config['arc'] : Math.PI;
        this.radius = config['radius'] != null ? config['radius'] : 100;
        this.offset = config['offset'] != null ? config['offset'] : 0;
        this.direction = config['direction'] != null ? config['direction'] : new Vector();

        this.negative = config['negative'] != null ? config['negative'] : false;
        this.sensation  = new Vector(0,0);
    };

    Sense.constructor = Sense;
    Sense.prototype.init = function(){};    //  abstract function for initializing child classes
    Sense.prototype.sense = function(){return 0};  //  'abstract' function returns 0 to 10 intensity exponential

    Sense.prototype.setDirection = function(v)
    {
        this.direction = v.getVectorAtAngle(this.offset);
    };

    return Sense;

});
