/**
 * Created by ndario on 6/15/15.
 */

define(
['etc/Canvas', 'etc/VectorND', 'c8/vehicles3/Vehicle3', 'c8/vehicles3/Fuel'],
function(Canvas, VectorND, Vehicle, Plant){

    var Vehicles3 = function(config){
        Canvas.call(this, config);
        this.vehicle_count = config['vehicle_count'] != null ? config['vehicle_count'] : 40;
        this.vehicles = [];
        this.plants_count = config['plants_count'] != null ? config['plants_count'] : 40;
        this.plants = [];
        this.renderCount = 0;

        this.regionPlantCapacity = 200;

        this.showGrid = false;
        this.showSenses = false;
        this.showSpores = false;

        this.uv = null;
    };

    Vehicles3.constructor = Vehicles3;
    $.extend(Vehicles3.prototype, Canvas.prototype);

    Vehicles3.prototype.init = function()
    {
        this.initCanvas();
        this.initMouse();
        this.initRegions(140);

        this.initVehicles();
        this.initUserVehicle();

        this.initPlants();

        this.start();

        return this;
    };



    Vehicles3.prototype.initUserVehicle = function()
    {
        this.uv = this._createVehicle();
        this.uv.senses_count = 0;
    };

    Vehicles3.prototype.initVehicles = function()
    {
        for(var i = this.vehicle_count; i--;){
            this.vehicles.push(this._createVehicle());
        }
    };

    Vehicles3.prototype._createVehicle = function()
    {
        return new Vehicle({
            center:new VectorND(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ),
            direction : new VectorND((Math.random() * 5) - 2.5, (Math.random() * 5) - 2.5)
        });
    };

    Vehicles3.prototype._update = function(region, neighbors)
    {
        var rpc = 0;
        for(var v = 0; v < region.length; v++){
            if(region[v].type == 'fuel'){
                if(region[v].ttd < 0){
                    this._deletePlant(region[v].uuid);
                } else if(region[v].spore == 0){
                    rpc += region[v].cost;
                }
                continue;
            }
            if(region[v].uuid == this.uv.uuid) continue;
            if(region[v].ttd < 0 || region[v].energy < 0){
                this._deleteVehicle(region[v].uuid);
                region.splice(v,1);
                continue;
            }
            //this._bounceEdge(region[v]);
            for(var rv = 0; rv < neighbors.length; rv ++){
                if(region[v].uuid == neighbors[rv].uuid) continue;
                if(neighbors[rv].type == 'fuel' && neighbors[rv].spore == 0) rpc += neighbors[rv].cost;
                var d = region[v].center.vectorSubtract(neighbors[rv].center).getMagnitude();
                if( d > region[v].radialSize + neighbors[rv].radius) continue;
                if(neighbors[rv].ghost > 0 || neighbors[rv].spore > 0) continue;
                //if(neighbors[rv].spore > 0) continue;
                if(d <= (region[v].radius + neighbors[rv].radius) && neighbors[rv].type == 'fuel'){
                    region[v].eat(neighbors[rv]);
                    if(this._deletePlant(neighbors[rv].uuid) == false){
                        console.log('err');
                    }
                    neighbors.splice(rv,1);
                } else {
                    region[v].sense(neighbors[rv]);
                }
            }
            region[v].behavior();
            region[v].drawInContext(this.ctx);
            this._transEdge(region[v]);
        }

        if(rpc > this.regionPlantCapacity){
            for(var f = 0; f < region.length; f++) {
                if(region[f].type == 'fuel' && region[f].spore > 0){
                    region[f].ttd -= 100;
                }
            }
        }
    };

    Vehicles3.prototype._deleteVehicle = function(uuid)
    {
        for(var v in this.vehicles){
            if(this.vehicles[v].uuid == uuid){
                this.vehicles.splice(v,1);
                return true;
            }
        }
        return false;
    };

    Vehicles3.prototype._deletePlant = function(uuid)
    {
        for(var p in this.plants){
            if(this.plants[p].uuid == uuid){
                this.plants.splice(p,1);
                return true;
            }
        }
        return false;
    };

    Vehicles3.prototype._bounceEdge = function(vehicle)
    {
        if(vehicle.getCX() < 0 || this.canvas.width < vehicle.getCX()){
            vehicle.direction.reflect(new VectorND(1,0));
        }
        if(vehicle.getCY() < 0 || this.canvas.height < vehicle.getCY()){
            vehicle.direction.reflect(new VectorND(0,1));
        }
    };

    Vehicles3.prototype._transEdge = function(vehicle)
    {
        if(vehicle.getCX() < 0){
            vehicle.center = new VectorND(this.canvas.width, vehicle.getCY());
        }
        if(this.canvas.width < vehicle.getCX()){
            vehicle.center = new VectorND(0, vehicle.getCY());
        }
        if(vehicle.getCY() < 0){
            vehicle.center = new VectorND(vehicle.getCX(), this.canvas.height);
        }
        if(this.canvas.height < vehicle.getCY()){
            vehicle.center = new VectorND(vehicle.getCX(), 0);
        }
    };

    Vehicles3.prototype.initPlants = function()
    {
        for(var p = this.plants_count; p--;){
            this._createPlant();
        }
    };

    Vehicles3.prototype._createPlant = function()
    {
        this.plants.push(new Plant({
            center: new VectorND(Math.random() * this.canvas.width, Math.random() * this.canvas.height)
        }));
    };

    Vehicles3.prototype.start = function()
    {
        this.beginRender(this.draw);
    };

    Vehicles3.prototype.stop = function()
    {
        this.stopRender();
    };

    Vehicles3.prototype.draw = function()
    {
        var w = this.canvas.width;
        var h = this.canvas.height;
        this.renderCount ++;
        this.ctx.clearRect(0, 0, w, h);
        this.clearRegions();
        if(this.showGrid){
            this.ctx.strokeStyle = 'rgba(0, 140, 200, 0.3)';
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
        this.uv.energy = 1000;
        this.uv.ghost = 0;
        this.addToRegion(this.uv, this.uv.center.getX(), this.uv.center.getY());
        this.uv.drawInContext(this.ctx);

        var pl = this.plants.length;
        for(var j = 0; j < pl; j++){
            this.plants[j].showSpore = this.showSpores;
            this.addToRegion(this.plants[j], this.plants[j].center.getX(), this.plants[j].center.getY());
            this.plants[j].drawInContext(this.ctx);
            if(this.plants[j].spore > 0){
                this.plants[j].spore --;
                continue;
            }
            var grow = this.plants[j].getGene('growthRate');
            this.plants[j].grow();
            if(Math.random() * grow > grow-1){
                this.plants.push(this.plants[j].reproduce(w, h));
                pl ++;
            }
        }

        var vl = this.vehicles.length;
        for(var i = 0; i < vl; i++)
        {
            if(this.vehicles[i].ghost > 0){
                this.vehicles[i].ghost --;
            } else if(this.vehicles[i].ttd < this.vehicles[i].adl){
                if(Math.random() * this.vehicles[i].repr > this.vehicles[i].repr - 1){
                    this.vehicles.push(this.vehicles[i].reproduce());
                    vl ++;
                }
            }

            this.addToRegion(this.vehicles[i], this.vehicles[i].center.getX(), this.vehicles[i].center.getY());

            if(this.showSenses){
                this.vehicles[i].drawSensesInContext(this.ctx);
            }
        }

        this.processRegions(this._update);

    };

    return Vehicles3
});

