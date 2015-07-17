/**
 * Created by ndario on 5/24/15.
 */

define(['etc/Canvas', 'etc/VectorND', 'c8/vehicles2/Vehicle2'], function(Canvas, VectorND, Vehicle){

    var Vehicles2 = function(config){
        Canvas.call(this, config);
        this.vehicle_count = config['vehicle_count'] != null ? config['vehicle_count'] : 100;
        this.vehicles = [];

        this.showGrid = false;
        this.showSenses = false;

        this.uv = null;

        this.op_bodies = config['op_bodies'] != null ? config['op_bodies'] : true;
        this.op_regions = config['op_regions'] != null ? config['op_regions'] : true;
        this.op_prox = config['op_prox'] != null ? config['op_prox'] : true;
    };

    Vehicles2.constructor = Vehicles2;
    $.extend(Vehicles2.prototype, Canvas.prototype);

    Vehicles2.prototype.init = function()
    {
        this.initCanvas();
        this.initMouse();
        if(this.op_regions){
            this.initRegions(200);
        }

        this.initVehicles();
        this.initUserVehicle();

        this.start();

        return this;
    };



    Vehicles2.prototype.initUserVehicle = function()
    {
        this.uv = this._createVehicle();
        this.uv.senses_count = 0;
    };

    Vehicles2.prototype.initVehicles = function()
    {
        for(var i = this.vehicle_count; i--;){
            this.vehicles.push(this._createVehicle());
        }
    };

    Vehicles2.prototype._createVehicle = function()
    {
        return new Vehicle({
            form : this.op_bodies ? Vehicle.FORMS['circle'] : Vehicle.FORMS['diamond'],
            enthusiasm : Math.floor(1 + Math.random() * 2),
            momentum   : Math.floor(5 + Math.random() * 20),
            center:{
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height
            },
            direction : new VectorND((Math.random() * 5) - 2.5, (Math.random() * 5) - 2.5)
        });
    };


    Vehicles2.prototype._updateVehicles = function(region, neighbors)
    {
        var type = this.op_bodies ? Vehicle.FORMS['circle'] : Vehicle.FORMS['diamond'];

        for(var v = 0; v < region.length; v++){
            if(region[v].uuid == this.uv.uuid) continue;
            this._bounceEdge(region[v]);
            for(var rv = 0; rv < neighbors.length; rv ++){
                if(region[v].center.vectorSubtract(neighbors[rv].center).getMagnitude() > region[v].radialSize) continue;
                if(region[v].uuid == neighbors[rv].uuid) continue;
                region[v].sense(neighbors[rv], type);
            }
            region[v].behavior();
            region[v].drawInContext(this.ctx);
        }
    };

    Vehicles2.prototype._updateVehiclesRegions = function(region, neighbors)
    {
        var type = this.op_bodies ? Vehicle.FORMS['circle'] : Vehicle.FORMS['diamond'];

        for(var v = 0; v < region.length; v++){
            if(region[v].uuid == this.uv.uuid) continue;
            this._bounceEdge(region[v]);
            for(var rv = 0; rv < neighbors.length; rv ++){
                if(region[v].uuid == neighbors[rv].uuid) continue;
                region[v].sense(neighbors[rv], type);
            }
            region[v].behavior();
            region[v].drawInContext(this.ctx);
        }
    };

    Vehicles2.prototype._updateVehiclesProx = function(vehicle)
    {
        var type = this.op_bodies ? Vehicle.FORMS['circle'] : Vehicle.FORMS['diamond'];

        this._bounceEdge(vehicle);
        for(var v = 0; v < this.vehicle_count; v ++){
            if(vehicle.uuid == this.vehicles[v].uuid) continue;
            if(vehicle.center.vectorSubtract(this.vehicles[v].center).getMagnitude() > vehicle.radialSize) continue;
            vehicle.sense(this.vehicles[v], type);
        }
        vehicle.sense(this.uv, type);
        vehicle.behavior();
        vehicle.drawInContext(this.ctx);
    };

    Vehicles2.prototype._updateVehiclesBasic = function(vehicle)
    {
        var type = this.op_bodies ? Vehicle.FORMS['circle'] : Vehicle.FORMS['diamond'];

        this._bounceEdge(vehicle);
        for(var v = 0; v < this.vehicle_count; v ++){
            if(vehicle.uuid == this.vehicles[v].uuid) continue;
            vehicle.sense(this.vehicles[v], type);
        }
        vehicle.sense(this.uv, type);
        vehicle.behavior();
        vehicle.drawInContext(this.ctx);
    };

    Vehicles2.prototype._bounceEdge = function(vehicle)
    {
        if(vehicle.getCX() < 0 || this.canvas.width < vehicle.getCX()){
            vehicle.direction.reflect(new VectorND(1,0));
        }
        if(vehicle.getCY() < 0 || this.canvas.height < vehicle.getCY()){
            vehicle.direction.reflect(new VectorND(0,1));
        }
    };

    Vehicles2.prototype.start = function()
    {
        this.beginRender(this.draw);
    };

    Vehicles2.prototype.stop = function()
    {
        this.stopRender();
    };

    Vehicles2.prototype.draw = function()
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clearRegions();
        if(this.showGrid){
            this.drawRegions();
        }

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
        if(this.op_regions) {
            this.addToRegion(this.uv, this.uv.center.getX(), this.uv.center.getY());
        }
        this.uv.drawInContext(this.ctx);

        for(var i = this.vehicle_count; i--;)
        {
            if(this.vehicles[i].alive == false){
                this.vehicles[i].moveToPoint({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height
                });
                this.vehicles[i].alive = true;
            }

            if(this.op_regions && this.op_prox){
                this.addToRegion(this.vehicles[i], this.vehicles[i].center.getX(), this.vehicles[i].center.getY());
            } else if (this.op_regions){
                this.addToRegion(this.vehicles[i], this.vehicles[i].center.getX(), this.vehicles[i].center.getY());
            } else if (this.op_prox){
                this._updateVehiclesProx(this.vehicles[i]);
            } else{
                this._updateVehiclesBasic(this.vehicles[i]);
            }

            if(this.showSenses){
                this.vehicles[i].drawSensesInContext(this.ctx);
            }
        }

        if(this.op_regions && this.op_prox){
            this.processRegions(this._updateVehicles);
        } else if(this.op_regions && !this.op_prox){
            this.processRegions(this._updateVehiclesRegions);
        }
    };

    return Vehicles2
});
