/**
 * Created by ndario on 6/15/15.
 */

define(['etc/VectorND', 'c8/vehicles3/Genome'], function(Vector, Genome){

    var Fuel = function(config)
    {
        this.center = config['center'] != null ? config['center'] : new Vector;
        this.radius = null;
        if(config.genome == null){
            this._initBaseGenome();
        } else {
            Genome.call(this, config.genome.genes);
        }

        this.spore = 250;
        this.cost = null;
        this.ttd = 5000;
        this.life = 5000;

        this.showSpore = false;

        this.init();
    };

    Fuel.constructor = Fuel;
    $.extend(Fuel.prototype, Genome.prototype);
    Fuel.prototype.init = function()
    {
        this.radius = this.getGene('radius');
        this._initIdentity();
        this.cost = this.getGene('nutrition')/this.getGene('growthRate');
    };

    Fuel.prototype._initIdentity = function()
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
        this.type = 'fuel';
    };

    Fuel.prototype._initBaseGenome = function()
    {
        Genome.call(this, {
            radius     : {
                name: 'radius',
                val : 6,
                ms  : 2,
                minv: 2
            },
            nutrition  : {
                name: 'nutrition',
                val : 500,
                ms  : 25
            },
            spread     : {
                name:'spread',
                val: 50,
                ms: 25,
                minv : 25
            },
            growthRate : {
                name:'growthRate',
                val : 300,
                ms: 25,
                minv : 50
            },
            red        : 30,
            green      : 140,
            blue       : 75
        });
    };

    Fuel.prototype.getColor = function()
    {
        var r = this.getGene('red');
        var g = this.getGene('green');
        var b = this.getGene('blue');
        if(this.ttd < 1000){
            r = 81;
            g = 89;
            b = 42;
        }else if(this.ttd < 2000){
            r = 80;
            g = 107;
            b = 46;
        }

        return this.spore > 0 ? 'rgb(255,217,122)' : 'rgb('+r+','+g+','+b+')';
    };

    Fuel.prototype.reproduce = function(w, h)
    {
        var s = this.getGene('spread');
        var x = this.center.getX() + 2 * s * Math.random() - s;
        var y = this.center.getY() + 2 * s * Math.random() - s;
        if(x > w) {
            x = x - w;
        } else if(x < 0) {
            x = x + w;
        } else if(y > h) {
            y = y - h;
        } else if(y < 0) {
            y = y + h;
        }
        return new Fuel({
            genome: this.replicateGenome(),
            center: new Vector(
                (x % w),
                (y % h)
            )
        });
    };

    Fuel.prototype.grow = function()
    {
        this.ttd --;
    };

    Fuel.prototype.drawInContext = function(ctx)
    {
        if(this.showSpore == false && this.spore > 0) return;
        ctx.beginPath();
        ctx.fillStyle = this.getColor();
        if(this.spore > 0){
            ctx.arc(this.center.getX(), this.center.getY(), 3, 0, 2*Math.PI);
        } else {
            ctx.arc(this.center.getX(), this.center.getY(), this.getGene('radius'), 0, 2*Math.PI);
        }
        ctx.fill();
    };

    return Fuel;
});

