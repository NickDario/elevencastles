$(function(){


    function CanvasOne (config) {

        //  source configurations
        this.canvas_id = config['canvas'] != null ? config['canvas'] : 'canvas';

        //  initial computations
        this.canvas    = null;
        this.container = null;
        this.ctx       = null;

        //  external attributes
        this.canvas_rect = null;

        //  input/outputs
        this.mpX = null;
        this.mpY = null;
    }

    CanvasOne.prototype = {

        init : function()
        {
            this._initCanvas();
            this.beginRendering();
        },

        _initCanvas : function()
        {
            var that = this;    //  event handler reference

            this.canvas    = document.getElementById(this.canvas_id);
            this.container = this.canvas.parentNode;
            this.canvas_rect = this.canvas.getBoundingClientRect();
            this.ctx       = this.canvas.getContext("2d");

            this.canvas.height= this.container.clientHeight;
            this.canvas.width = this.container.clientWidth;

            window.onresize = function(){
                that.canvas.height= that.container.clientHeight;
                that.canvas.width = that.container.clientWidth;
                that.canvas_rect = that.canvas.getBoundingClientRect();
            };

            document.addEventListener('mousemove', function(e){
                that.mpX = e.pageX - that.canvas_rect.left;
                that.mpY = e.pageY - that.canvas_rect.top;
                //that.render();
            });

        },

        beginRendering : function(){
            this.render();
        },

        render : function(){
            window.requestAnimationFrame(this.render.bind(this));

            console.log('X', this.mpX);
            console.log('Y', this.mpY);

            this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'white';
            this.ctx.arc(this.mpX, this.mpY, 26, 0, 2*Math.PI);
            this.ctx.stroke();

        }

    };


    var canvas = new CanvasOne({
        canvas : 'studio-canvas'
    });

    canvas.init();

});


