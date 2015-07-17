define(function(){

    var Geomorph = function(config){

        this.fillcolor = config['fillcolor'] != null ? config['fillcolor'] : 'blue';
        this.strokecolor = config['strokecolor'] != null ? config['strokecolor'] : 'blue';


        this.edges = config['edges'] != null ? config['edges'] : 2;
        this.radialSize = config['radius'] != null ? config['radius'] : 50;
        this.angleRadians = 2 * Math.PI / this.edges;


        this.cx = config['cx'] != null ? config['cx'] : 0;
        this.cy = config['cy'] != null ? config['cy'] : 0;

        this.direction = {
            x: 0,
            y: 0
        };

        this.target = {
            x: config['tx'] != null ? config['tx'] : 0,
            y: config['ty'] != null ? config['ty'] : 0
        };

        this.dampen = config['dampen'] != null ? config['dampen'] : 0.03;

        this.spin = 0;
        this.spinRate = config['spinrate'] != null ? config['spinrate'] : 0.00;

        this._points = [];
        this._segments = [];
        this._ghost  = false;

        this.alive = false;
    };

    Geomorph.prototype.drawInContext = function(context)
    {
        if(this.edges == 0){
            this.drawCircleInContext(context);
            return;
        }
        this._clearPoints();
        this._clearVectors();
        this.calculatePointsWithSpin();
        context.moveTo(this._points[0].x, this._points[0].y);
        context.beginPath();
        for(var i = 0; i < this._points.length; i++){
            context.lineTo(this._points[i].x, this._points[i].y);
        }
        context.strokeStyle = this.fillcolor;
        context.strokeWeight = 10;
        context.stroke();

        context.fillStyle = this.fillcolor;
        context.fill();
    };

    Geomorph.prototype.drawCircleInContext = function(context)
    {
        context.moveTo(this.cx, this.cy);
        context.beginPath();

        context.arc(this.cx, this.cy, this.radialSize, 0, 2 * Math.PI);

        context.strokeStyle = this.fillcolor;
        context.fillStyle = this.fillcolor;
        context.strokeWeight = 10;
        context.stroke();
        context.fill();
    };

    Geomorph.prototype.moveToCoordinates = function(x, y)
    {
        this.cx = x;
        this.cy = y;
    };

    Geomorph.prototype.move = function()
    {
        this.cx += this.direction.x;
        this.cy += this.direction.y;
    };


    Geomorph.prototype.setDirection = function(direction)
    {
        this.direction.x = direction.x;
        this.direction.y = direction.y;
    };

    Geomorph.prototype.setTarget = function(point)
    {
        this.target.x = point.x;
        this.target.y = point.y;
    };

    Geomorph.prototype.getTargetVector = function()
    {
        return this._normalize(this._vectorSubtract(this.target, this.getCenter()));
    };

    Geomorph.prototype.getDampeningVector = function()
    {
        return this._scalarMultiply(this._normalize(this.direction), -this.getMagnitude(this.direction) * this.dampen);
    };

    Geomorph.prototype.drawVectors = function(ctx)
    {
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.beginPath();

        //  target - center
        if(this.target.x != 0 && this.target.y != 0){
            ctx.moveTo(this.cx, this.cy);
            ctx.lineTo(this.target.x, this.target.y);
        }

        //  target ->
        if(this.target.x != 0 && this.target.y != 0) {
            ctx.moveTo(this.cx, this.cy);
            var targetDir = this._scalarMultiply(this.getTargetVector(), 50);
            ctx.lineTo(targetDir.x + this.cx, targetDir.y + this.cy);
            ctx.arc(targetDir.x + this.cx, targetDir.y + this.cy, 20, 0, Math.PI * 2);
        }

        //  direction ->
        ctx.moveTo(this.cx, this.cy);
        ctx.lineTo(this.direction.x * 10 + this.cx, this.direction.y * 10+ this.cy);

        //  dampening ->
        ctx.moveTo(this.cx, this.cy);
        var v_dampen = this.getDampeningVector();
        ctx.lineTo(v_dampen.x * 50 + this.cx, v_dampen.y * 50 + this.cy);

        ctx.stroke();
    };

    /**
     * Parametric Form:
     *  v1 = {x:this.cx, y:this.cy}
     *  v2 = point
     *  t  = speed
     *
     *  vector = v1 + v2*t
     *
     * @param point
     * @param speed
     */
    Geomorph.prototype.setDirectionToPoint = function(point, speed)
    {
        if(speed == 'undefined'){
            speed = 1;
        }

        this.direction = this._normalize({
            x: point.x - this.cx,
            y: point.y - this.cy
        });

        this.direction.x *= speed;
        this.direction.y *= speed;
    };

    Geomorph.prototype.setDirectionToTarget = function()
    {
        //this.direction =
    };

    Geomorph.prototype.easeDirectionToPoint = function(point, ease)
    {
        if(ease == 'undefined'){
            ease = 1;
        }

        var target = this._vectorSubtract(point, this.getCenter());
        target = this._normalize(target);
        this.direction = this._vectorAdd(this._scalarMultiply(target, ease), this.direction);
    };

    Geomorph.prototype.easeDirectionToTarget = function(ease)
    {
        if(ease == 'undefined'){
            ease = 1;
        }

        var v = this._scalarMultiply(this.getTargetVector(), ease);
        this.direction = this._vectorAdd(v, this.direction);
        this.direction = this._vectorAdd(this.getDampeningVector(), this.direction);
    };

    Geomorph.prototype.setReflection = function(surface)
    {
        surface = surface || {x:-this.direction.x, y:-this.direction.y};
        var normal = this._getNormal(surface);
        this.direction = this._getReflection(this.direction, normal);
    };

    Geomorph.prototype.addEdge = function()
    {
        this.edges++;
        this.angleRadians = 2 * Math.PI / this.edges;
    };

    Geomorph.prototype.removeEdge = function()
    {
        this.edges--;
        this.angleRadians = 2 * Math.PI / this.edges;
    };

    Geomorph.prototype.checkIntersect = function(geo)
    {
        if(this.edges == 0){
            var points = geo.getPoints();
            for(var a = 0; a < points.length; a++){
                if(this._checkCircleIntersect(points[a])){
                   return true;
                }
            }
            return;
        }
        var o_segments = geo.getSegments();
        for(var i = this._segments.length; i --;){
            for(var j = 0; j < o_segments.length; j++){
                if(this._checkSegmentIntersect(this._segments[i], o_segments[j])){
                    return true;
                }
            }
        }
    };

    Geomorph.prototype.getSegments = function()
    {
        return this._segments;
    };

    Geomorph.prototype.getPoints = function()
    {
        return this._points;
    };

    Geomorph.prototype.getCenter = function()
    {
        return {
            x: this.cx,
            y: this.cy
        }
    };

    Geomorph.prototype.setCenter = function(point)
    {
        this.cx = point.x;
        this.cy = point.y;
    };

    Geomorph.prototype._getNormal = function(v1)
    {
        return {x:v1.y, y:-v1.x};
    };

    Geomorph.prototype._getDotProduct = function(v1,v2)
    {
        return (v1.x*v2.x) + (v1.y*v2.y);
    };

    Geomorph.prototype._getCrossProduct = function(v1, v2)
    {
        return {
            x: (v1.y * v2.z) - (v1.z * v2.y),
            y: (v1.x * v2.z) - (v1.z * v2.x),
            z: (v1.x * v2.y) - (v1.y * v2.x)
        };
    };

    // Using the fact that in 2D the cross product vector is equal to the
    // magnitude of the 3D cross product, which has a quick calculation.
    Geomorph.prototype._get2DCrossProduct = function(v1, v2)
    {
        return (v1.x * v2.y) - (v1.y * v2.x);
    };

    //  v1 + v2
    Geomorph.prototype._vectorAdd = function(v1, v2)
    {
        return {
            x : v1.x + v2.x,
            y : v1.y + v2.y
        }
    };

    //  v1 - v2
    Geomorph.prototype._vectorSubtract = function(v1, v2)
    {
        return {
            x : v1.x - v2.x,
            y : v1.y - v2.y
        }
    };

    Geomorph.prototype._scalarMultiply = function(v1, s)
    {
        return {
            x: v1.x * s,
            y: v1.y * s
        }
    };

    Geomorph.prototype._normalize = function(v1)
    {
        var m = this.getMagnitude(v1);
        return m == 0 ? {x:0,y:0} : {x: v1.x/m, y: v1.y/m};
    };

    Geomorph.prototype.getMagnitude = function(v1)
    {
        return Math.sqrt((v1.x * v1.x) + (v1.y * v1.y));
    };

    Geomorph.prototype._getReflection = function(v1, v2)
    {
        var n2  = this._getNormal(v2);
        var nn2 = this._normalize(n2);
        var d   = this._getDotProduct(v1, nn2);
        return{
            x: v1.x - (2 * d) * nn2.x,
            y: v1.y - (2 * d) * nn2.y
        }
    };

    Geomorph.prototype._checkSegmentIntersect = function(v1, v2)
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

    Geomorph.prototype._checkCircleIntersect = function(v2)
    {
        return Math.abs(v2.x - this.cx) < this.radialSize && Math.abs(v2.y - this.cy) < this.radialSize;
    };

    Geomorph.prototype.calculatePoints = function()
    {
        for(var curr_angle = 2 * Math.PI ; curr_angle >= 0; curr_angle -= this.angleRadians) {
            this._points.push({
                x : this.cx + this.radialSize * Math.cos(curr_angle),
                y : this.cx + this.radialSize * Math.sin(curr_angle)
            });
        }
        this._calculateSegmentsFromPoints(this._points);
    };

    Geomorph.prototype.calculatePointsWithSpin = function()
    {
        this.spin += (2*Math.PI) * this.spinRate;
        for(var curr_angle = 2 * Math.PI ; curr_angle > 0; curr_angle -= this.angleRadians) {
            this._points.push({
                x : this.cx + this.radialSize * Math.cos(curr_angle + this.spin),
                y : this.cy + this.radialSize * Math.sin(curr_angle + this.spin)
            });
        }
        this._calculateSegmentsFromPoints(this._points);
    };

    Geomorph.prototype._calculateSegmentsFromPoints = function(points)
    {
        for(var i = points.length; i > 0; i--){
            var op = points[i] || points[0];
            this._segments.push({
                o : op,     // aka vector from origin to start
                u : {       // aka line as a unit vector
                    x: points[i - 1].x - op.x,
                    y: points[i - 1].y - op.y
                }
            });
        }
    };

    Geomorph.prototype._clearPoints = function()
    {
        this._points = [];
    };

    Geomorph.prototype._clearVectors = function()
    {
        this._segments = [];
    };

    Geomorph.prototype.setGhost = function(isGhost)
    {
        this._ghost = isGhost;
    };


    return Geomorph;
});