/**
 * Created by ndario on 6/28/15.
 */
define(
['etc/SegmentND', 'etc/VectorND', 'c8/vehicles4/Genome'],
function(Segment, Vector, Genome)
{
    var Sense = function(config)
    {
        config = config || {};
        if(config.genome == null){
            this._initBaseGenome();
        } else {
            Genome.call(this, config.genome.genes);
        }

        this.source = config['source'] != null ? config['source'] : new Vector();
        this.direction = config['direction'] != null ? config['direction'] : new Vector();
        this.inputs = [];
        this.sensation  = new Vector(0,0);
        this.cost = null;
        this.vital = false;

        this.traits = config['traits'] != null ? config['traits'] : {};
        //this.genome = config['genome'] != null ? config['genome'] : null;
        this.init();
    };

    Sense.constructor = Sense;
    $.extend(Sense.prototype, Genome.prototype);
    Sense.prototype.setDirection = function(v)
    {
        this.direction = v.getVectorAtAngle(this.getGene('offset'));
    };

    Sense.prototype.init = function()
    {
        this._createInputs();
        this.cost = this.getGene('radius')+this.getGene('count')*this.getGene('intensity')*this.getGene('arc')
    };

    Sense.prototype._initBaseGenome = function()
    {
        Genome.call(this, {
            importance: {
              name : 'importance',
              val  : 1,
              ms   : 0,
              minv : 0.5,
            },
            svehicle:{
                name:'svehicle',
                val:1
            },
            lvehicle:{
                name:'lvehicle',
                val:-1
            },
            vehicle:{
                name:'vehicle',
                val:0
            },
            fuel:{
                name:'fuel',
                val:1,
                ms: 0.4
            },
            arc : {
                name: 'arc',
                val : Math.PI * 0.5,
                ms  : Math.PI * 0.1
            },
            radius : {
                name: 'radius',
                val : 50,
                ms  : 10
            },
            offset : {
                name:'offset',
                val: Math.floor(Math.random() * 2) * Math.PI,
                ms : Math.PI * 0.1
            },
            count : {
                name:'count',
                val:7,
                minv: 1
            },
            intensity : 1
        });
    };


    Sense.prototype._createInputs = function()
    {
        var arc_section = this.getGene('arc')/this.getGene('count');
        var start_radian = -this.getGene('arc')/2;
        //var angle = -this.genome.getGene('arc')/2;


        for(var r = start_radian; r <= (this.getGene('arc')/2); r += arc_section) {
        //for(var r = 0; r <= this.genome.getGene('count'); r ++) {
        //    var s = this.direction.getVectorAtAngle(angle);
            var s = this.direction.getVectorAtAngle(r);
            s.normalize(this.getGene('radius'));
            this.inputs.push(new Segment({x:this.source.getX(), y:this.source.getY()},{x:s.getX(), y:s.getY()}));
            //angle += arc_section;
        }
    };

    Sense.prototype.resetSenses = function(c,d)
    {
        this.source = c;
        this.sensation.setVector({x:0,y:0});
        this.setDirection(d);
        this.inputs = [];
        this._createInputs();
    };

    Sense.prototype.copy = function()
    {
        return new Sense({
            source: this.source,
            direction: this.direction,
            genome: this.replicateGenome()
        });
    };

    Sense.prototype.sense = function(object)
    {
        var v = this._checkSense(object);
        this.sensation.addVector(v);
    };

    Sense.prototype._checkSense = function(object)
    {
        for (var i = 0; i < this.inputs.length;  i++) {
            if (this.inputs[i].checkCircleIntersect(object.center, object.radius)) {
                return new Vector(this.inputs[i].u.getX(), this.inputs[i].u.getY());
            }
        }
        return new Vector(0, 0);
    };

    return Sense;
});