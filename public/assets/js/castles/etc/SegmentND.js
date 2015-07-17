/**
 * Created by ndario on 5/18/15.
 */

define(['etc/VectorND'], function(Vector){

    var SegmentND = function(o, u)
    {
        this.o  = new Vector(o.x, o.y);
        this.u  = new Vector(u.x, u.y);
    };

    SegmentND.prototype.getOrigin = function()
    {
        return this.o;
    };

    SegmentND.prototype.getDirection = function()
    {
        return this.u;
    };

    SegmentND.prototype.getLength = function()
    {
        return this.u.getMagnitude();
    };

    SegmentND.prototype.drawInContext = function(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.o.getX(), this.o.getY());
        ctx.lineTo(this.o.getX() + this.u.getX(), this.o.getY() + this.u.getY());
        ctx.stroke();
    };

    SegmentND.prototype.checkSegmentIntersect = function(s)
    {
        if((this.u.getX() == 0 && this.u.getY() == 0 ) || (s.u.getX() == 0 && s.u.getY() == 0 )) return false;

        var d  = this.u.cross2D(s.u);
        var n1 = s.o.vectorSubtract(this.o).cross2D(s.u);
        var n2 = s.o.vectorSubtract(this.o).cross2D(this.u);


        var c2 = n1 / d;
        var c1 = n2 / d;

        if(d == 0){
            console.log('colinear');
        }

        if(d != 0) {
            return (c1 >= 0 && c1 <= 1) && (c2 >= 0 && c2 <= 1);
        }else if(d == 0 && n2 == 0){
            //  collinear
            return false;
            var a1 = this.o.vectorAdd(this.u);
            var a2 = this.o;

            var b1 = s.vectorAdd(s.u);
            var b2 = s.o;

            return ((a1.x - b1.x < 0) != (a1.x - b2.x < 0) != (a2.x - b1.x < 0) != (a2.x - b2.x < 0))
            || ((a1.y - b1.y < 0) != (a1.y - b2.y < 0) != (a2.y - b1.y < 0) != (a2.y - b2.y < 0));

        }

        return false;
    };

    SegmentND.prototype.checkCircleIntersect = function(center, radius)
    {
        var d = this.u;
        var f = this.o.vectorSubtract(center);

        var a = d.dot(d) ;
        var b = 2*f.dot(d) ;
        var c = f.dot(f) - radius*radius ;

        var discriminant = b*b-4*a*c;
        if( discriminant >= 0 ) {
            // ray didn't totally miss sphere,
            // so there is a solution to
            // the equation.
            discriminant = Math.sqrt( discriminant );

            // either solution may be on or off the ray so need to test both
            // t1 is always the smaller value, because BOTH discriminant and
            // a are nonnegative.
            var t1 = (-b - discriminant)/(2*a);
            var t2 = (-b + discriminant)/(2*a);

            // 3x HIT cases:
            //          -o->             --|-->  |            |  --|->
            // Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit),

            // 3x MISS cases:
            //       ->  o                     o ->              | -> |
            // FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)

            if( t1 >= 0 && t1 <= 1 )
            {
                // t1 is the intersection, and it's closer than t2
                // (since t1 uses -b - discriminant)
                // Impale, Poke
                return true ;
            }

            // here t1 didn't intersect so we are either started
            // inside the sphere or completely past it
            if( t2 >= 0 && t2 <= 1 )
            {
                // ExitWound
                return true ;
            }

            // no intn: FallShort, Past, CompletelyInside
            return false ;
        }
        return false;
    };

    return SegmentND;

});