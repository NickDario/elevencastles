/**
 * Created by ndario on 5/17/15.
 */

define(function(){

    var VectorND = function(x, y)
    {
        this._x = x != null ? x : 0;
        this._y = y != null ? y : 0;
        this._z = 0;
    };

    VectorND.prototype.setVector = function(v)
    {
        this._x = v.x;
        this._y = v.y;
    };

    /**
     * Gets this vector
     *
     * @returns {{x: *, y: *}}
     */
    VectorND.prototype.getVector = function(){
        return {
            x:this._x,
            y:this._y
        }
    };

    /**
     *
     */
    VectorND.prototype.getX = function()
    {
        return this._x;
    };

    /**
     *
     */
    VectorND.prototype.getY = function()
    {
        return this._y;
    };

    /**
     * Returns the magnitude of this vector
     *
     * @returns number
     */
    VectorND.prototype.getMagnitude = function()
    {
        return Math.sqrt((this._x * this._x) + (this._y * this._y));
    };

    VectorND.prototype.setMagnitude = function(m)
    {
        return this.normalize(m);
    };

    VectorND.prototype.reverse = function()
    {
        this._x = -this._x;
        this._y = -this._y;
    };

    VectorND.prototype.getReverse = function()
    {
        return new VectorND(-this._x, -this._y);
    };

    /**
     * Normalizes this vector
     */
    VectorND.prototype.normalize = function(expand)
    {
        if(expand == 'undefined'){
            expand = 1;
        }
        var m  = this.getMagnitude();
        if(m > 0){
            this._x = (this._x/m) * expand;
            this._y = (this._y/m) * expand;
        }
    };

    /**
     * Returns a normalized version of this vector without normalizing this vector
     */
    VectorND.prototype.getNormalized = function(expand)
    {
        expand = expand || 1;
        var m = this.getMagnitude();
        return m == 0 ? new VectorND() : new VectorND((this._x/m) * expand, (this._y/m) * expand);
    };

    /**
     * Returns the normal vector of this vector
     */
    VectorND.prototype.getNormalVector = function()
    {
        return new VectorND(this._y, -this._x);
    };

    /**
     * Takes the reflection of this vector with respect to a surface vector s
     *  @param s VectorND
     */
    VectorND.prototype.getReflection = function(s)
    {
        var n = s.normalize();
        var d   = this._getDotProduct(this.getVector(), n);
        return{
            x: this._x - (2 * d) * n.x,
            y: this._y - (2 * d) * n.y
        }
    };

    VectorND.prototype.reflect = function(s)
    {
        //s = s.getNormalVector();
        var n = s.getNormalized();
        var d = this.dot(n);
        this.setVector({
            x: this._x - (2 * d) * n.getX(),
            y: this._y - (2 * d) * n.getY()
        });
    };

    VectorND.prototype.getVectorAtAngle = function(radians)
    {
        return new VectorND(
            (this._x * Math.cos(radians) + this._y * Math.sin(radians)),
            (-this._x * Math.sin(radians) + this._y * Math.cos(radians))
        )
    };

    VectorND.prototype.scalarMultiply = function(m)
    {
        return new VectorND(
            this._x * m,
            this._y * m
        )
    };

    VectorND.prototype.multiplyScalar = function(m)
    {
        this.setVector({
            x: this._x * m,
            y: this._y * m
        })
    };

    /**
     * Add a vector to this vector
     */
    VectorND.prototype.vectorAdd = function(v)
    {
        return {
            x : this._x + v.getX(),
            y : this._y + v.getY()
        }
    };


    /**
     * modify this vector by adding a vector v
     *
     * @param v
     */
    VectorND.prototype.addVector = function(v)
    {
        this.setVector({
            x : this._x + v.getX(),
            y : this._y + v.getY()
        });
    };

    /**
     * Subtract a vector from this vector
     */
    VectorND.prototype.vectorSubtract = function(v)
    {
        return new VectorND(this._x - v.getX(), this._y - v.getY());
    };

    /**
     * modify this vector by subtracting a vector v
     *
     * @param v
     */
    VectorND.prototype.subtractVector = function(v)
    {
        this.setVector({
            x : this._x - v.getX(),
            y : this._y - v.getY()
        });
    };

    /**
     * Takes the dot product of this vector and a vector v
     *
     * @param v
     * @returns number
     */
    VectorND.prototype.dot = function(v)
    {
        return (this._x * v.getX()) + (this._y * v.getY());
    };


    /**
     *
     * @param v
     * @returns {{x: number, y: number, z: number}}
     */
    VectorND.prototype.cross = function(v)
    {
        return {
            x: (this._y * v.z) - (this._z * v.y),
            y: (this._x * v.z) - (this._z * v.x),
            z: (this._x * v.y) - (this._y * v.x)
        };
    };

    /**
     * Ignores z vector
     *
     * @param v
     * @returns {number}
     */
    VectorND.prototype.cross2D = function(v)
    {
        return (this._x * v.getY()) - (this._y * v.getX());
    };

    VectorND.prototype.checkIntersection = function(v1, v2)
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

    return VectorND;

});
