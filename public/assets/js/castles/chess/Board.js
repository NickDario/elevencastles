define(['chess/Piece'], function(Piece){

    function Board(config) {
        this.ranks = config.ranks;
        this.files = config.files;
        this.ctx   = config.ctx;
        this.canvas = config.canvas;
        //this.selected = false;

        //  use smaller square size.
        this.squaresize = (this.canvas.width/this.files) > (this.canvas.height/this.ranks)
            ?   (this.canvas.height/this.ranks) :   (this.canvas.width/this.files);

        this.x_offset = (this.canvas.width/this.files) > (this.canvas.height/this.ranks)
            ?   (this.canvas.width - (this.files * this.squaresize)) / 2 : 0;
        this.y_offset = (this.canvas.width/this.files) > (this.canvas.height/this.ranks)
            ?   0 : (this.canvas.height - (this.ranks * this.squaresize)) / 2;
        this.width = this.squaresize * this.files;
        this.height = this.squaresize * this.ranks;

        //this.dark = '#4a2500';
        this.dark = '#ddd';
        //this.light = 'beige';
        this.light = '#333';

        this.showCoverage = false;
        this.attacked = [];
        this.covered = [];

    }

    Board.prototype.drawSquare = function(rank, file, color) {

        this.ctx.fillStyle = color;
        var x = this.x_offset + (file * this.squaresize);
        var y = this.y_offset + (rank * this.squaresize);
        this.ctx.fillRect(x,y, this.squaresize, this.squaresize);


        var covered = 0;
        var attacked = 0;

        if(this.attacked[rank][file] > 0 ){
            attacked = this.attacked[rank][file];
        }
        if(this.covered[rank][file] > 0){
            covered = this.covered[rank][file];
        }

        if((covered || attacked) && this.showCoverage) {
            if (covered && attacked && this.showCoverage) {
                this.ctx.fillStyle = 'gold';
            } else if (attacked && this.showCoverage) {
                this.ctx.fillStyle = 'lightcoral';
            } else if (covered && this.showCoverage) {
                this.ctx.fillStyle = 'lightblue';
            }
            var countText = (covered - attacked).toString();
            this.ctx.beginPath();
            this.ctx.moveTo(x+this.squaresize/2, y);
            this.ctx.lineTo(x+this.squaresize,y+this.squaresize/2);
            this.ctx.lineTo(x+this.squaresize/2,y+this.squaresize);
            this.ctx.lineTo(x,y+this.squaresize/2);
            this.ctx.fill();

            this.ctx.fillStyle = 'black';
            this.ctx.font = '14px Arial';
            this.ctx.fillText(countText,x,y+10);
        }
    };

    Board.prototype.draw = function() {
        var light = false;
        for (var r = 0; r < this.ranks; r ++) {
            light = !light;
            for (var f = 0; f < this.files; f ++) {
                if(light) {
                    this.drawSquare(r,f,this.light);
                } else {
                    this.drawSquare(r,f,this.dark);
                }
                light = !light;
            }
        }
    };

    Board.prototype.place = function(piece) {
        if(!piece.alive){
            return false;
        }
        var x = this.x_offset + (piece.file * this.squaresize);
        var y = this.y_offset + (piece.rank * this.squaresize);
        piece.draw(this.ctx, x, y, this.squaresize);
    };

    Board.prototype.pointToBoard = function(point) {
        if(this.x_offset > point.x || this.x_offset + this.width < point.x
        || this.y_offset > point.y || this.y_offset + this.height < point.y) {
            return false;
        }

        return {
            file: Math.floor((point.x - this.x_offset) / this.squaresize),
            rank: Math.floor((point.y - this.y_offset) / this.squaresize)
        }
    };

    return Board;

});