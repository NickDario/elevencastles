define(function(){

  /**
   *  Class:       CanvasGL
   *  Description: A prototype class for 2D animation using the html5 canvas.
   *  Author:      Nicholas Dario
   *
   *  Features:
   *    Region element processing.
   *    Pause and Play functionality.
   *    Mouse coordinates.
   *    Simple draw profiling.
   *
   *  @todo: optimize javascript.
   *
   */

    function Canvas(config)
    {
        this.canvas_id = config['canvas_id'] != null ? config['canvas_id'] : 'canvas';

        //  initial computations
        this.canvas    = null;
        this.container = null;
        this.ctx       = null;

        //  external attributes
        this.canvas_rect = null; // for mouse tracking

        //  input/outputs
        this.mpX = null;
        this.mpY = null;

        //  canvas control
        this.request_id = 0;
        this.rendering = false;

        //  region handling
        this.regions =  [];
        this.split   = 100;
        this.x_region_count = 0;
        this.y_region_count = 0;

        //  profiling
        this.profiling = config['profiling'] != null ? config['profiling'] : false;
        this.profiling_window = config['profiling_window'] != null ? config['profiling_window'] : 100;
        this.profiling_step = 0;
        this.start_render = 0;
        this.end_render   = 0;
        this.avg_render   = [0];
        this.profiling_frame = 0;


        return this;
    }

    /**
     * Initializes variables for handling html canvas with javascript.
     */
    Canvas.prototype.initCanvas = function()
    {
        this.canvas    = document.getElementById(this.canvas_id);
        this.ctx       = this.canvas.getContext("2d");
        this.container = this.canvas.parentNode;
        this.canvas_rect = this.canvas.getBoundingClientRect();

        this.canvas.height= this.container.clientHeight - 20;
        this.canvas.width = this.container.clientWidth - 20;
    };

    /**
     * Initializes event listeners that update mouse position (mpX & mpY)
     * when it moves on the canvas.
     */
    Canvas.prototype.initMouse = function()
    {
        var that = this;
        document.addEventListener('mousemove', function(e){
            that.mpX = e.pageX - that.canvas_rect.left;
            that.mpY = e.pageY - that.canvas_rect.top;
        });
    };

    Canvas.prototype.initDynamicCanvas = function()
    {
        var that = this;    //  event handler reference
        window.onresize = function(){
            //$(that.container).height(window.innerHeight);
            that.canvas.height= that.container.clientHeight - 20;
            that.canvas.width = that.container.clientWidth - 20;
            that.canvas_rect = that.canvas.getBoundingClientRect();
        };
    };

    Canvas.prototype.cancelDynamicCanvas = function()
    {
        window.onresize = null;
    };

    Canvas.prototype.initRegions = function(split)
    {
        this.split = split || this.split;
        this.x_region_count = Math.ceil(this.canvas.width/this.split);
        this.y_region_count = Math.ceil(this.canvas.height/this.split);
        this.clearRegions();
    };

    Canvas.prototype.clearRegions = function()
    {
        for(var x = 0; x < this.x_region_count; x++) {
            this.regions[x] = [];
            for(var y = 0; y < this.y_region_count; y++){
                this.regions[x][y] = [];
            }
        }
    };

    Canvas.prototype.getRegionCoordElems = function(x,y)
    {
        var xr = Math.floor(x/this.split);
        var yr = Math.floor(y/this.split);

        xr = xr < 0 ? 0 : xr;
        yr = yr < 0 ? 0 : yr;

        return this.regions[xr][yr];
    };

    Canvas.prototype.getRegionElems = function(rx, ry)
    {
        return this.regions[rx][ry];
    };

    Canvas.prototype.getRegionNeighborElems = function(rx, ry)
    {
        var elems = this.regions[rx][ry];
        if(ry < this.y_region_count - 1){
            elems = elems.concat(this.regions[rx][ry+1])
        }
        if(ry > 0){
            elems = elems.concat(this.regions[rx][ry-1])
        }
        if(rx < this.x_region_count - 1){
            elems = elems.concat(this.regions[rx+1][ry]);
            if(ry > 0){
                elems = elems.concat(this.regions[rx+1][ry-1])
            }
            if(ry < this.y_region_count - 1){
                elems = elems.concat(this.regions[rx+1][ry+1])
            }
        }
        if(rx > 0){
            elems = elems.concat(this.regions[rx-1][ry]);
            if(ry > 0){
                elems = elems.concat(this.regions[rx-1][ry-1])
            }
            if(ry < this.y_region_count - 1){
                elems = elems.concat(this.regions[rx-1][ry+1])
            }
        }

        return elems;
    };

    Canvas.prototype.addToRegion = function(elem, x, y)
    {
        var xr = Math.floor(x/this.split);
        var yr = Math.floor(y/this.split);

        xr = xr < 0 ? 0 : xr;
        xr = xr >= Math.ceil(this.canvas.width/this.split) ? Math.ceil(this.canvas.width/this.split) - 1 : xr;
        yr = yr < 0 ? 0 : yr;
        yr = yr >= Math.ceil(this.canvas.height/this.split) ? Math.ceil(this.canvas.height/this.split) - 1 : yr;

        this.regions[xr][yr].push(elem);
    };

    Canvas.prototype.removeFromRegions = function(uuid)
    {
        for(var x = 0; x < this.x_region_count; x++) {
            for(var y = 0; y < this.y_region_count; y++){
                for(var e in this.regions[x][y]){
                    if(this.regions[x][y][e].uuid = uuid){
                        this.regions[x][y].splice(e, 1);
                    }
                }
            }
        }
    };

    Canvas.prototype.drawRegions = function()
    {
        this.ctx.beginPath();
        var xs = this.split;//this.canvas.width / this.x_region_count;
        var ys = this.split;//this.canvas.height / this.y_region_count;
        for(var i = 0; i < this.x_region_count; i ++){
            this.ctx.moveTo(i * xs, 0);
            this.ctx.lineTo(i * xs, this.canvas.height);
        }
        for(var j = 0; j < this.y_region_count; j ++){
            this.ctx.moveTo(0, j * ys);
            this.ctx.lineTo(this.canvas.width, j*ys);
        }
        this.ctx.stroke();
    };

    Canvas.prototype.processRegions = function(funct)
    {
        var ret = [];
        for(var xr = 0; xr < this.x_region_count; xr++){
            for(var yr = 0; yr < this.y_region_count; yr++) {
                ret.push(funct.call(this, this.getRegionElems(xr,yr), this.getRegionNeighborElems(xr, yr)));
            }
        }
        return ret;
    };


    /**
     * Begin periodic execution of a function
     *
     * @param funct
     */
    Canvas.prototype.beginRender = function(funct)
    {
        this.rendering = true;
        if(this.profiling){
            this._renderWithProfiling(funct)
        } else{
            this._render(funct);
        }
    };

    /**
     * Perform a function upon retrieval of animation frame.
     *
     * @param funct
     * @private
     */
    Canvas.prototype._render = function(funct)
    {
        if(this.rendering){
            this.request_id = window.requestAnimationFrame(this._render.bind(this, funct));
            funct.call(this);
        }
    };
    /**
     * Perform a function upon retrieval of animation frame.
     *
     * @param funct
     * @private
     */
    Canvas.prototype._renderWithProfiling = function(funct)
    {
        if(this.rendering){
            this.start_render = window.performance.now();
            this.request_id = window.requestAnimationFrame(this._renderWithProfiling.bind(this, funct));
            funct.call(this);
            this.end_render = window.performance.now();
            this.avg_render[this.profiling_frame] = (this.avg_render[this.profiling_frame] + (this.end_render - this.start_render)) / 2;
            if(this.profiling_step == this.profiling_window - 1) {
                this.profiling_frame ++;
                this.avg_render[this.profiling_frame] = 0;
            }
            this.profiling_step = (this.profiling_step + 1) % 100;
        }

        if(this.profiling_frame == 100){
            console.log(this.avg_render.join(','));
            this.stopRender();
        }

    };

    /**
     * End rendering
     */
    Canvas.prototype.stopRender = function()
    {
        this.rendering = false;
        window.cancelAnimationFrame(this.request_id);
    };


    return Canvas;
});

