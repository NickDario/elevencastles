/**
 * Created by ndario on 5/17/15.
 */

define(['etc/Canvas', 'etc/VectorND', 'c8/vehicles1/Vehicle'], function(Canvas, VectorND, Vehicle){

    var Vehicles = function(config){
        Canvas.call(this, config);
        this.vehicle_count = config['vehicle_count'] != null ? config['vehicle_count'] : 60;
        this.vehicles = [];

        this.uv = null;
    };

    Vehicles.constructor = Vehicles;
    $.extend(Vehicles.prototype, Canvas.prototype);

    Vehicles.prototype.init = function()
    {
        this.initCanvas();
        this.initMouse();
        this.initVehicles();

        this.initUserVehicle();

        this.start();

        return this;
    };



    Vehicles.prototype.initUserVehicle = function()
    {
        this.uv = this._createVehicle();
    };

    Vehicles.prototype.initVehicles = function()
    {
        for(var i = this.vehicle_count; i--;){
            this.vehicles.push(this._createVehicle());
        }
    };

    Vehicles.prototype._createVehicle = function()
    {
        return new Vehicle({
            center:{
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height
            }
        });
    };

    Vehicles.prototype._vehicleMove = function(vehicle)
    {
        if(vehicle.getCX() < 0 || this.canvas.width < vehicle.getCX()){
            vehicle.direction.reflect(new VectorND(1,0));
        }
        if(vehicle.getCY() < 0 || this.canvas.height < vehicle.getCY()){
            vehicle.direction.reflect(new VectorND(0,1));
        }
        vehicle.move();
        for(var v = 0; v < this.vehicle_count; v ++){
            if(vehicle.uuid == this.vehicles[v].uuid) continue;
            vehicle.sense(this.vehicles[v]);
        }
        vehicle.sense(this.uv);
        vehicle.behavior();
    };

    Vehicles.prototype.start = function()
    {
        this.beginRender(this.draw);
    };

    Vehicles.prototype.stop = function()
    {
        this.stopRender();
    };

    Vehicles.prototype.draw = function()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.mpX - this.uv.center.getX() || this.mpY - this.uv.center.getY()){
            this.uv.direction.setVector({
                x: (this.mpX - this.uv.center.getX()),
                y: (this.mpY - this.uv.center.getY())
            });
        }
        this.uv.moveToPoint({
            x: this.mpX,
            y: this.mpY
        });
        this.uv.drawInContext(this.ctx);

        var sum = 0;
        var min = 100;
        var max = 0;
        var speeds = [];
        for(var i = this.vehicle_count; i--;)
        {
            if(this.vehicles[i].alive == false){
                this.vehicles[i].moveToPoint({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height
                });
                this.vehicles[i].direction.setVector({x:(Math.random() * 5) - 2.5, y:(Math.random() * 5) - 2.5});
                this.vehicles[i].alive = true;
            }
            this._vehicleMove(this.vehicles[i]);
            this.vehicles[i].drawInContext(this.ctx);
            for(var l = 0; l < this.vehicles[i].senses_count; l++){
                for(var m = 0; m < this.vehicles[i].senses[l].flange_count; m++) {
                    //this.vehicles[i].senses[l].flanges[m].drawInContext(this.ctx);
                }
            }
            //  Stats
            var speed = this.vehicles[i].direction.getMagnitude();
            sum += speed;
            if(speed > max){
                max = speed;
            } else if(speed < min){
                min = speed;
            }
            speeds.push(speed);
        }
        speeds.sort();
        var mode = speeds[speeds.length/2];
        var avg = sum/100;

        $('#v1-avg-speed').empty().text(avg);
        $('#v1-mode-speed').empty().text(mode);
        $('#v1-min-speed').empty().text(min);
        $('#v1-max-speed').empty().text(max);
    };


    return Vehicles

});
