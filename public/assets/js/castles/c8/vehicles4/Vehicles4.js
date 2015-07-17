/**
 * Created by ndario on 6/28/15.
 */

define(
['etc/Canvas', 'etc/VectorND', 'c8/vehicles4/Vehicle4', 'c8/vehicles4/Fuel'],
function(Canvas, VectorND, Vehicle, Plant){

    var Vehicles4 = function(config){
        Canvas.call(this, config);
        this.vehicle_count = config['vehicle_count'] != null ? config['vehicle_count'] : 20;
        this.vehicles = [];
        this.plants_count = config['plants_count'] != null ? config['plants_count'] : 500;
        this.plants = [];
        this.renderCount = 0;

        this.water = 1000;
        this.lakes = [];

        this.regionPlantCapacity = 100;

        this.showGrid = false;
        this.showSenses = false;
        this.showSpores = false;

        this.uv = null;
    };

    Vehicles4.constructor = Vehicles4;
    $.extend(Vehicles4.prototype, Canvas.prototype);

    Vehicles4.prototype.init = function()
    {
        this.initCanvas();
        this.initMouse();
        this.initRegions(140);

        this.initVehicles();
        this.initUserVehicle();

        this.initPlants();

        this.initLakes();

        this.start();

        return this;
    };



    Vehicles4.prototype.initUserVehicle = function()
    {
      this.uv = this._createVehicle();
      this.uv.senses_count = 0;
      var world = this;
      document.addEventListener('mousedown', function(e){
        world.addVehicle(e.pageX - world.canvas_rect.left, e.pageY - world.canvas_rect.top)
      });
    };

    Vehicles4.prototype.addVehicle = function(x, y)
    {
      this.vehicles.push(new Vehicle({
        center: new VectorND(x, y),
        direction : this.uv.direction
      }));
    };

    Vehicles4.prototype.initVehicles = function()
    {
        for(var i = this.vehicle_count; i--;){
            this.vehicles.push(this._createVehicle());
        }
    };

    Vehicles4.prototype._createVehicle = function()
    {
        return new Vehicle({
            center:new VectorND(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ),
            direction : new VectorND((Math.random() * 5) - 2.5, (Math.random() * 5) - 2.5),
            ghost : 500
        });
    };

    Vehicles4.prototype._update = function(region, neighbors)
    {
        var rpc = 0;
        for(var v = 0; v < region.length; v++){
            if(region[v].type == 'lake'){
              this.ctx.beginPath();
              this.ctx.fillStyle = 'rgba(40, 80, 180, 0.7)';
              this.ctx.arc(region[v].v.getX(), region[v].v.getY(), region[v].r, 0, 2*Math.PI);
              this.ctx.fill();
              continue;
            }else if(region[v].type == 'fuel'){
              if(region.length > this.regionPlantCapacity && region[v].spore > 0){
                region[v].ttd = 0;
              }

              var c = this.canvas.width;
              var dk = 0;
              for(var l = 0; l < this.lakes.length; l ++){
                  var lk = 0;
                  if(this.lakes[l].a > 0){
                    var dl = this.lakes[l].v.vectorSubtract(region[v].center).getMagnitude();
                    var dlr = dl - this.lakes[l].r;
                    if(dlr < c) {
                      dk = dl;
                      lk = l;
                      c = dlr;
                    }
                  }
                }
                if(c > 0){
                  region[v].ttd -= dk * 0.01;
                } else {
                  this.lakes[lk].c -= region[v].cost;
                  region[v].tdd -= 10;
                }

                continue;
            }
            if(region[v].uuid == this.uv.uuid) continue;

            //this._bounceEdge(region[v]);
            for(var rv = 0; rv < neighbors.length; rv ++){
                if(region[v].uuid == neighbors[rv].uuid || neighbors[rv].type == 'lake') continue;
                if(neighbors[rv].type == 'fuel' && neighbors[rv].spore == 0) rpc += neighbors[rv].cost;
                var d = region[v].center.vectorSubtract(neighbors[rv].center).getMagnitude();
                if( d > region[v].radialSize + neighbors[rv].radius) continue;
                if(neighbors[rv].ghost > 0 || neighbors[rv].spore > 0) continue;
                //if(neighbors[rv].spore > 0) continue;
                if(d <= (region[v].radius + neighbors[rv].radius)){
                    if(region[v].canEat(neighbors[rv])){
                        region[v].eat(neighbors[rv]);
                        if(neighbors[rv].type == 'fuel'){
                            this._deletePlant(neighbors[rv].uuid);
                        } else if(neighbors[rv].type == 'vehicle'){
                            this._deleteVehicle(neighbors[rv].uuid);
                        }
                    }
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
                    region[f].ttd -= 500;
                }
            }
        }
    };

    Vehicles4.prototype._deleteVehicle = function(uuid)
    {
        for(var v in this.vehicles){
            if(this.vehicles[v].uuid == uuid){
                this.vehicles.splice(v,1);
                return true;
            }
        }
        return false;
    };

    Vehicles4.prototype._deletePlant = function(uuid)
    {
        for(var p in this.plants){
            if(this.plants[p].uuid == uuid){
                this.plants.splice(p,1);
                return true;
            }
        }
        return false;
    };

    Vehicles4.prototype.initLakes = function()
    {
      var lakeWater = 0;
      while(this.water > lakeWater){
        var la = (Math.random() * this.water);
        lakeWater += la;
        var lr = la / (2 * Math.PI);
        this.lakes.push({
          type: 'lake',
          v: new VectorND(
              Math.random() * (this.canvas.width - lr * 2) + lr,
              Math.random() * (this.canvas.height - lr * 2) + lr),
          r: lr,
          a: la,
          c: la
        });
      }
    };

    Vehicles4.prototype._bounceEdge = function(vehicle)
    {
        if(vehicle.getCX() < 0 || this.canvas.width < vehicle.getCX()){
            vehicle.direction.reflect(new VectorND(1,0));
        }
        if(vehicle.getCY() < 0 || this.canvas.height < vehicle.getCY()){
            vehicle.direction.reflect(new VectorND(0,1));
        }
    };

    Vehicles4.prototype._transEdge = function(vehicle)
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

    Vehicles4.prototype.initPlants = function()
    {
        for(var p = this.plants_count; p--;){
            this._createPlant();
        }
    };

    Vehicles4.prototype._createPlant = function()
    {
        this.plants.push(new Plant({
            center: new VectorND(Math.random() * this.canvas.width, Math.random() * this.canvas.height)
        }));
    };

    Vehicles4.prototype.start = function()
    {
        this.beginRender(this.draw);
    };

    Vehicles4.prototype.stop = function()
    {
        this.stopRender();
    };

    Vehicles4.prototype.draw = function()
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

        for(var a=0; a<this.lakes.length; a ++) {
          this.lakes[a].c = this.lakes[a].a/9;
          this.addToRegion(this.lakes[a], this.lakes[a].v.getX(), this.lakes[a].v.getY());
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
        this.uv.radius = 2;
        this.addToRegion(this.uv, this.uv.center.getX(), this.uv.center.getY());
        this.uv.drawInContext(this.ctx);

        var pl = this.plants.length;
        for(var j = 0; j < pl; j++){
            this.plants[j].showSpore = this.showSpores;
            if(this.plants[j].ttd < 0){
                this._deletePlant(this.plants[j].uuid);
                pl --;
                continue;
            }
            this.addToRegion(this.plants[j], this.plants[j].center.getX(), this.plants[j].center.getY());
            this.plants[j].drawInContext(this.ctx);
            if(this.plants[j].spore > 0){
                this.plants[j].spore --;
                continue;
            }
            this.plants[j].grow();
            if(Math.random() * 5000 > 5000-1){
                for(var k = 0; k < 10; k ++){
                    this.plants.push(this.plants[j].reproduce(w, h));
                    pl ++;
                }
            }
        }

        var vl = this.vehicles.length;
        for(var i = 0; i < vl; i++)
        {
            if(this.vehicles[i].ttd < 0 || this.vehicles[i].energy < 0) {
                this._deleteVehicle(this.vehicles[i].uuid);
                vl --;
                continue;
            } else if(this.vehicles[i].ghost > 0){
                this.vehicles[i].ghost --;
                continue;
            } else if(this.vehicles[i].ttd < this.vehicles[i].adl){
                if(Math.random() * this.vehicles[i].repr > this.vehicles[i].repr - 1){
                    for(var k=0; k < this.vehicles[i].getGene('spawn'); k ++){
                        this.vehicles[i].energy *= 0.8;
                        this.vehicles.push(this.vehicles[i].reproduce());
                        vl ++;
                    }
                }
            }

            this.addToRegion(this.vehicles[i], this.vehicles[i].center.getX(), this.vehicles[i].center.getY());

            if(this.showSenses){
                this.vehicles[i].drawSensesInContext(this.ctx);
            }
        }

        this.processRegions(this._update);

    };

    return Vehicles4
});

