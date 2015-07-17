/**
 * Created by ndario on 6/9/15.
 */

define(
['etc/VectorND', 'c8/vehicles3/Genome', 'c8/vehicles3/Sense'],
function(Vector, Genome, Sense)
{
    var Vehicle3 = function(config)
    {
        if(config.genome == null){
            this._initBaseGenome()
        } else {
            Genome.call(this, config.genome.genes);
        }

        this.uuid = 0;
        this.center = config['center'] != null ? config['center'] : new Vector(0,0);

        this.config = config;

        //  Physical Attributes
        this.tailSize  = 10;
        this.radius  = 5;

        //  Senses
        this.senses = config['senses'] != null ? config['senses'] : null;

        //  Meta-attributes
        this.direction  = config['direction'] != null ? config['direction'] : new Vector(0,0);
        this.radialSize = 0;    //  computed based on the largest sensory radius
        //this.genome = config['genome'] != null ? config['genome'] : null;
        this.ttd = 5000;
        this.adl  = 4500; // adolescence
        this.life = 5000;
        this.full = 2000;
        this.energy = 2000;
        this.cost = null;


        this.health = null; // energy/ttd
        this.repr = null; // reproduction rate

        this.ghost = 120;
        this.init();
    };

    Vehicle3.constructor = Vehicle3;
    $.extend(Vehicle3.prototype, Genome.prototype);
    Vehicle3.prototype.drawInContext = function(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.center.getX(), this.center.getY());

        ctx.strokeStyle  = this.getTailColor();
        ctx.fillStyle    = this.getBodyColor();

        ctx.moveTo(this.center.getX(), this.center.getY());
        ctx.lineTo(
            this.center.getX() - this.direction.getNormalized(this.tailSize).getX(),
            this.center.getY() - this.direction.getNormalized(this.tailSize).getY()
        );

        ctx.moveTo(this.center.getX(), this.center.getY());
        ctx.arc(this.center.getX(), this.center.getY(), 3, 0, 2*Math.PI);

        ctx.fill();
        ctx.stroke();
    };

    Vehicle3.prototype.drawSensesInContext = function(ctx)
    {
        for(var l = 0; l < this.senses.length; l++){
            for(var m = 0; m < this.senses[l].inputs.length; m++) {
                ctx.strokeStyle = 'rgba(250,200,100, 0.2)';
                this.senses[l].inputs[m].drawInContext(ctx);
            }
        }
    };


    Vehicle3.prototype.init = function()
    {
        this._initIdentity();
        this._initSenses();
        this._initCost();
        return this;
    };


    Vehicle3.prototype._initIdentity = function()
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
        this.type = 'vehicle';
    };



    Vehicle3.prototype._initBaseGenome =function(){
        Genome.call(this, {
            tSpeed : 3,
            rSpeed : 1,
            endurance : 30,
            acceleration : 1,
            metabolism : {
                name: 'metabolism',
                val : 1,
                ms  : 0.1
            },
            spawn : 100,
            sensesCount: {
                name:'sensesCount',
                val: 1,
                minv:1
            },
            rColor : {
                name: 'rColor',
                val : 20,
                ms : 10
            },
            gColor : {
                name: 'gColor',
                val : 125,
                ms : 10
            },
            bColor : {
                name: 'bColor',
                val : 155,
                ms : 10
            }
        });
    };

    Vehicle3.prototype._initSenses = function()
    {
        this.senses = [];
        for(var i = 0; i < this.getGene('sensesCount'); i ++){
            this.senses[i] = new Sense({
                number : i,
                genome : this.genes['senses_' + i] == null ? null : this.genes['senses_' + i].replicateGenome(),
                direction : this.direction,
                center : this.center
            });
            this.genes['senses_' + i] = new Genome(this.senses[i].genes);
            this.radialSize = this.senses[i].getGene('radius') > this.radialSize
                ? this.senses[i].getGene('radius')
                : this.radialSize;
        }
    };

    Vehicle3.prototype._initCost = function()
    {
        for(var i =0; i<this.senses.length; i++){
            this.cost += this.senses[i].cost;
        }
        this.cost *= this.getGene('tSpeed');
    };

    Vehicle3.prototype.getTailColor = function()
    {
        var r = this.getGene('rColor') % 255;
        var g = this.getGene('gColor') % 255;
        var b = this.getGene('bColor') % 255;
        var a = 0.2 + this.energy/this.full;


        return 'rgba('+ r +','+ g +','+ b +','+ a +')';
    };

    Vehicle3.prototype.getBodyColor = function()
    {
        var a = 0.2 + this.energy/this.full;
        return 'rgba(255,255,255,'+ a +')';
    };

    Vehicle3.prototype.getCX = function()
    {
        return this.center.getX();
    };

    Vehicle3.prototype.getCY = function()
    {
        return this.center.getY();
    };

    Vehicle3.prototype.moveToPoint = function(v)
    {
        this.center.setVector(v);
    };

    Vehicle3.prototype.move = function()
    {
        this.center.addVector(this.direction);
        for(var i = 0; i < this.getGene('sensesCount'); i++){
            this.senses[i].resetSenses(this.center, this.direction);
        }
    };

    Vehicle3.prototype.behavior = function()
    {
        var m = this.direction.getMagnitude();

        if(m > (this.getGene('tSpeed') * this.getGene('metabolism'))) {
            this.direction.setMagnitude(this.getGene('tSpeed') * this.getGene('metabolism'));
        } else if(m > this.getGene('rSpeed') * this.getGene('metabolism')) {
            this.direction.setMagnitude(m - m/this.getGene('endurance'));
        }

        for(var i = 0; i < this.getGene('sensesCount'); i ++) {
            this.direction.addVector(this.senses[i].sensation);
        }
        this.live();
        this.move();
    };

    Vehicle3.prototype.reproduce = function()
    {
        return new Vehicle3({
            genome : this.replicateGenome(),
            center : new Vector(this.center.getX() + 50, this.center.getY() + 50),
            direction : this.direction.getVectorAtAngle(Math.PI)
        });
    };

    Vehicle3.prototype.eat = function(object)
    {
        this.energy += object.getGene('nutrition');
        if(this.energy > this.full) {
            this.energy = this.full;
        }
    };

    Vehicle3.prototype.live = function()
    {
        this.energy -=  this.direction.getMagnitude() + (this.cost * 0.01 * this.getGene('metabolism'));
        this.health = this.ttd*this.energy*this.getGene('metabolism');
        this.repr   = Math.floor(this.health/this.getGene('spawn'));
        this.ttd --;
    };

    Vehicle3.prototype.sense = function(object)
    {
        for(var i = 0; i < this.getGene('sensesCount'); i ++) {
            var type = object.type;
            this.senses[i].sense(object);
            this.senses[i].sensation.normalize(this.senses[i].getGene(type));
        }
    };

    return Vehicle3

});