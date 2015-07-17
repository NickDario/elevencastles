/**
 * Created by ndario on 5/22/15.
 *
 * Standard SegmentN2D form:
 * {
 *  o: {x:number, y:number} // origin vector
 *  u: {x:number, y:number} // direction vector
 * }
 *
 */

define(
['etc/VectorN2D'],
function(Vector2D)
{

    var SegmentN2D = { REVISION: '70' };

    // browserify support

    if ( typeof module === 'object' ) {

        //module.exports = SegmentN2D;

    }
    //var SegmentN2D = function(o, u){};

    SegmentN2D.create = function(o, u)
    {
        return {
            o: {x: o.x, y: o.y},
            u: {x: u.x, y: u.y}
        }
    };

    SegmentN2D.drawInContext = function(s, ctx)
    {
        ctx.beginPath();
        ctx.moveTo(s.o.x, s.o.y);
        ctx.lineTo(s.o.x + s.u.x, s.o.y + s.u.y);
        ctx.stroke();
    };

    SegmentN2D.checkIntersect = function(s1, s2)
    {
        if((s1.u.x == 0 && s1.u.y == 0 ) || (s2.u.x == 0 && s2.u.y == 0 )) return false;

        var d = Vector2D.cross2D(s1.u, s2.u);
        var n1 = Vector2D.cross2D(Vector2D.subtract(s2.o, s1.o), s2.u);
        var n2 = Vector2D.cross2D(Vector2D.subtract(s2.o, s1.o), s1.u);

        var c2 = n1 / d;
        var c1 = n2 / d;

        if(d != 0) {
            return (c1 >= 0 && c1 <= 1) && (c2 >= 0 && c2 <= 1);
        }else if(d == 0 && n2 == 0){  //  collinear
            console.log('colinear');
            return false;
            var a1 = Vector2D.add(s1.o, s1.u);
            var a2 = s1.o;
            var b1 = Vector2D.add(s2.o, s2.u);
            var b2 = s.o;

            return ((a1.x - b1.x < 0) != (a1.x - b2.x < 0) != (a2.x - b1.x < 0) != (a2.x - b2.x < 0))
            || ((a1.y - b1.y < 0) != (a1.y - b2.y < 0) != (a2.y - b1.y < 0) != (a2.y - b2.y < 0));
        }

        return false;
    };

    return SegmentN2D;
});