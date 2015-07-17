/**
 * Created by ndario on 5/22/15.
 *
 * Handles 2D vector functions
 *
 * Standard VectorN2D Format:
 * {
 *  x: number
 *  y: number
 * }
 *
 */

define(function()
{

    var VectorN2D = { REVISION: '70' };

    // browserify support

    if ( typeof module === 'object' ) {

        //module.exports = VectorN2D;

    }
    //var VectorN2D = function(){};
    //var VectorN2D = function(){};

    VectorN2D.create = function(x,y)
    {
        return {x:x, y:y};
    };

    /**
     * Returns the magnitude of this vector
     *
     * @returns number
     */
    VectorN2D.magnitude = function(v)
    {
        return Math.sqrt((v.x * v.x) + (v.y * v.y));
    };

    VectorN2D.reverse = function(v)
    {
        return {x : -x, y : -y}
    };

    VectorN2D.normalize = function(v, expand)
    {
        expand = expand || 1;
        var m = this.magnitude(v);
        return m == 0 ? {x:0,y:0} : {x: (v.x/m) * expand, y :(v.y/m) * expand};
    };

    /**
     * Returns the normal(perpendicular) vector of this vector
     */
    VectorN2D.normal = function(v)
    {
        return {x: v.y, y:-v.x};
    };

    /**
     * Takes the reflection of this vector with respect to a surface vector s
     * @param v
     * @param s
     */
    VectorN2D.reflect = function(v, s)
    {
        var n = VectorN2D.normalize(s);
        var d   = VectorN2D.dot(v, n);
        return {
            x: v.x - (2 * d) * n.x,
            y: v.y - (2 * d) * n.y
        }
    };

    VectorN2D.atAngle = function(v, radians)
    {
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        return {
            x: v.x * cos + v.y * sin,
            y: -v.x * sin + v.y * cos
        }
    };

    VectorN2D.add = function(v1, v2)
    {
        return {
            x : v1.x + v2.x,
            y : v1.y + v2.y
        }
    };

    VectorN2D.subtract = function(v1, v2)
    {
        return {
            x : v1.x - v2.x,
            y : v1.y - v2.y
        }
    };


    VectorN2D.dot = function(v1, v2)
    {
        return (v1.x * v2.x) + (v1.y * v2.y);
    };

    VectorN2D.cross2D = function(v1, v2)
    {
        return (v1.x * v2.y) - (v1.y * v2.x);
    };

    VectorN2D.checkIntersection = function(v1, v2)
    {
        if((v1.u.x == 0 && v1.u.y == 0 ) || (v2.u.x == 0 && v2.u.y == 0 )) return false;
        var d  = this._get2DCrossProduct(v1.u,v2.u);
        var n1 = this._get2DCrossProduct(this._vectorSubtract(v2.o,v1.o), v2.u);
        var n2 = this._get2DCrossProduct(this._vectorSubtract(v2.o,v1.o), v1.u);

        var c2 = n1 / d;
        var c1 = n2 / d;

        if(d == 0){
            console.log('colinear');
        }

        if(d != 0) {
            //return (c1 >= 0 && c1 <= 1) && (c2 >= 0 && c2 <= 1)
            if((c1 >= 0 && c1 <= 1) && (c2 >= 0 && c2 <= 1)){
                return true;
            } else {
                return false;
            }
        }else if(d == 0 && n2 == 0){
            //  collinear
            return false;
            var a1 = this._vectorAdd(v1.o, v1.u);
            var a2 = v1.o;

            var b1 = this._vectorAdd(v2.o, v2.u);
            var b2 = v2.o;

            return ((a1.x - b1.x < 0) != (a1.x - b2.x < 0) != (a2.x - b1.x < 0) != (a2.x - b2.x < 0))
            || ((a1.y - b1.y < 0) != (a1.y - b2.y < 0) != (a2.y - b1.y < 0) != (a2.y - b2.y < 0));
        }

        return false;
    };

    return VectorN2D;

});

