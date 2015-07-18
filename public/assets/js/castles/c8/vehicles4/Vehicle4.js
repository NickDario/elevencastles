/**
 * Created by ndario on 6/28/15.
 */

define(
['etc/VectorND', 'c8/vehicles4/Genome', 'c8/vehicles4/Sense'],
function(Vector, Genome, Sense)
{
    var Vehicle4 = function(config)
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
      this.radius  = null;
      this.area = null;

      //  Senses
      this.senses = config['senses'] != null ? config['senses'] : null;
      this.focus = 0;
      this.focusing = false;
      this.focused = false;
      this.target = 0;

      //  Meta-attributes
      this.cm = null;

      this.direction  = config['direction'] != null ? config['direction'] : new Vector(0,0);
      this.pdirection = this.direction;
      this.radialSize = 0;    //  computed based on the largest sensory radius
      this.ttd  = null;
      this.adl  = null; // adolescence
      this.life = null;
      this.full = null;
      this.energy = null;
      this.cost = null;
      this.nutrition = null;
      this.tSpeed = null;
      this.rSpeed = null;


      this.health = null; // energy/ttd
      this.repr = null; // reproduction rate

      this.ghost = config['ghost'] != null ? config['ghost'] : 0;
      this.init();
    };

    Vehicle4.constructor = Vehicle4;
    $.extend(Vehicle4.prototype, Genome.prototype);
    Vehicle4.prototype.drawInContext = function(ctx)
    {
      ctx.beginPath();
      ctx.moveTo(this.center.getX(), this.center.getY());

      ctx.strokeStyle  = this.getTailColor();
      ctx.fillStyle    = this.getBodyColor();

      ctx.moveTo(this.center.getX(), this.center.getY());
      ctx.lineTo(
        this.center.getX() - this.direction.getNormalized(this.tailSize1).getX(),
        this.center.getY() - this.direction.getNormalized(this.tailSize1).getY()
      );
      ctx.lineTo(
        this.center.getX() - this.direction.getNormalized(this.tailSize1).getX() - this.pdirection.getNormalized(this.tailSize2).getX(),
        this.center.getY() - this.direction.getNormalized(this.tailSize1).getY() - this.pdirection.getNormalized(this.tailSize2).getY()
      );

      ctx.moveTo(this.center.getX(), this.center.getY());
      ctx.arc(this.center.getX(), this.center.getY(), this.radius, 0, 2*Math.PI);

      ctx.fill();
      ctx.stroke();
    };

    Vehicle4.prototype.drawSensesInContext = function(ctx)
    {
      for(var l = 0; l < this.senses.length; l++){
        for(var m = 0; m < this.senses[l].inputs.length; m++) {
          ctx.strokeStyle = 'rgba(250,200,100, 0.2)';
          this.senses[l].inputs[m].drawInContext(ctx);
        }
      }
    };


    Vehicle4.prototype.init = function()
    {
      this._initIdentity();
      this._initSenses();
      this._initAttr();
      this._initCost();
      return this;
    };


    Vehicle4.prototype._initIdentity = function()
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



    Vehicle4.prototype._initBaseGenome =function(){
        Genome.call(this, {
          endurance : 30,
          acceleration : 1,
          lvehicle : {
            name: 'lvehicle',
            val : 1,
            ms  : 0.5,
            mr  : 50,
            minv: null
          },
          svehicle : {
            name: 'svehicle',
            val : -1,
            ms  : 0.5,
            mr  : 50,
            minv: null
          },
          vehicle : {
            name: 'vehicle',
            val : 0,
            ms  : 0.5,
            mr  : 50,
            minv: null
          },
          fuel : {
            name: 'fuel',
            val : 2,
            ms  : 0.5,
            mr  : 50,
            minv: null
          },
          radius : {
              name:'radius',
              val : Math.floor(2 + Math.random() * 2),
              ms  : 0.5,
              minv: 2
          },
          metabolism : {
            name: 'metabolism',
            val : 1.5
          },
          spawn : {
              name: 'spawn',
              val : 1,
              ms  :.5,
              minv: 1,
              maxv: 10
          },
          sensesCount: {
            name:'sensesCount',
          val: 2,
            mr  : 50,
            minv:1
          },
          rColor : {
            name: 'rColor',
            val : 20,
            ms : 10,
            mr  : 50,
          },
          gColor : {
            name: 'gColor',
            val : 125,
            mr  : 50,
            ms : 10
          },
          bColor : {
            name: 'bColor',
            val : 155,
            mr  : 50,
            ms : 10
          }
        });
    };

    Vehicle4.prototype._initSenses = function()
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
            this.senseWeight += this.senses[i].getGene('importance');
        }
    };

    Vehicle4.prototype._initCost = function()
    {
        for(var i =0; i<this.senses.length; i++){
            this.cost += this.senses[i].cost;
        }
        this.cost = this.cost * this.cm;
        this.cost *= this.getGene('metabolism');
    };

    Vehicle4.prototype._initAttr = function()
    {
        this.radius = this.getGene('radius');
        this.area = this.radius * 2 * Math.PI;
        this.full = this.radius * 400;
        this.energy = this.full * 0.5;
        this.life = this.radius * 4000;
        this.ttd  = this.radius * 4000;
        this.adl  = this.life - (this.energy * 2);
        this.cm = Math.pow(this.area, 5) * 0.0001;

        this.tSpeed = this.getGene('metabolism') * 3;
        this.rSpeed = this.getGene('metabolism');
    };

    Vehicle4.prototype.getTailColor = function()
    {
        var r = this.getGene('rColor') % 255;
        var g = this.getGene('gColor') % 255;
        var b = this.getGene('bColor') % 255;
        var a = 0.2 + this.energy/this.full;

        return 'rgba('+ r +','+ g +','+ b +','+ a +')';
    };

    Vehicle4.prototype.getBodyColor = function()
    {
        var a = 0.2 + this.energy/this.full;
        return 'rgba(255,255,255,'+ a +')';
    };

    Vehicle4.prototype.getCX = function()
    {
        return this.center.getX();
    };

    Vehicle4.prototype.getCY = function()
    {
        return this.center.getY();
    };

    Vehicle4.prototype.moveToPoint = function(v)
    {
        this.center.setVector(v);
    };

    Vehicle4.prototype.scan = function()
    {
      return this.direction;
    };

    Vehicle4.prototype.move = function()
    {
        this.center.addVector(this.direction);
        for(var i = 0; i < this.getGene('sensesCount'); i++){
            this.senses[i].resetSenses(this.center, this.direction);
        }
    };

    Vehicle4.prototype.behavior = function()
    {
      this.pdirection = this.direction;

      if(this.target == null) {
        this.direction = this.scan();
      }else if(this.focusing && this.focus){
        this.direction.addVector(this.target);
        this.focus--;
      }

      var m = this.direction.getMagnitude();
      if(m > this.tSpeed) {
        this.direction.setMagnitude(this.tSpeed);
      } else if(m > this.rSpeed) {
        this.direction.setMagnitude(m - m/this.getGene('endurance'));
      } else if(m < this.rSpeed) {
        this.direction.setMagnitude(this.rSpeed);
      }

      this.move();
      this.live();
    };

    Vehicle4.prototype.reproduce = function()
    {
        return new Vehicle4({
            genome : this.replicateGenome(),
            center : new Vector(this.center.getX() + 50, this.center.getY() + 50),
            direction : this.direction.getVectorAtAngle(Math.random() * 2 * Math.PI)
        });
    };

    Vehicle4.prototype.eat = function(object)
    {
      this.focusing = false;
      if(object.type == 'vehicle'){
          this.energy += this.life * (object.area / this.area);
      } else if (object.type == 'fuel') {
          this.energy += object.nutrition;
      }

      if(this.energy > this.full) {
          this.energy = this.full;
      }
    };

    Vehicle4.prototype.live = function()
    {
        if(this.ghost > 0) return;
        this._calcEnergy();
        this._calcHealth();
        this._calcRepr();
        this._calcNutrition();
        this.tailSize1 = this.radius + 10*this.health * 0.5;
        this.tailSize2 = 10 *  this.health * 0.5;
        this.ttd --;
    };

    Vehicle4.prototype._calcEnergy = function()
    {
        this.energy -=  1 + this.getGene('metabolism') * this.cost * 0.00001;
    };

    Vehicle4.prototype._calcHealth = function()
    {
        this.health = (this.ttd*this.energy) / (this.life*this.full);
    };

    Vehicle4.prototype._calcRepr = function()
    {
        this.repr = this.life - this.adl + (this.cost * 0.01)/this.health;
    };

    Vehicle4.prototype._calcNutrition = function()
    {
        this.nutrition = 10000;
    };

    Vehicle4.prototype.canEat = function(object){
        return object.type == 'fuel' || object.radius + 1 <= this.radius;
    };

    Vehicle4.prototype.sense = function(object)
    {
      if(this.focusing && this.focus > 0) return;
      var value = null;
      var t = null;
      this.focus = 0;
      for(var i = 0; i < this.getGene('sensesCount'); i ++) {
        var type = object.type;
        this.senses[i].sense(object);
        if(type == 'vehicle'){
          if(object.radius + 1> this.radius) {
            type = 'lvehicle';
          } else if(object.radius < this.radius) {
            type = 'svehicle';
          }
        }

        if(this.senses[i].sensation.getMagnitude() > 0) {
          var importance = this.senses[i].getGene('importance') * this.getGene(type);
          if (value == null || importance > value) {
            value = importance;
            t = i;
            this.focusing = true;
            this.focus = 10;
          }
        }
      }

      this.target = t == null ? null : this.senses[t].sensation.getNormalized(value);
    };

    return Vehicle4

});