define(['etc/Canvas', 'chess/Board', 'chess/Piece'], function(Canvas, Board, Piece){


    function Chess(config) {
        Canvas.call(this, config);

        this.board = null;
        this.turn = 'bot';
        this.selected = null;

        this.toppit = document.getElementById('top-pit');
        this.top_context = this.toppit.getContext('2d');
        this.topcolor = '#000';
        this.toppieces = {
            'pawns' : [],
            'rooks' : [],
            'knights' : [],
            'bishops' : [],
            'queen' : [],
            'king' : [],
        };

        this.botpit = document.getElementById('bot-pit');
        this.bot_context = this.botpit.getContext('2d');
        this.botcolor = '#fff';
        this.botpieces = {
            'pawns' : [],
            'rooks' : [],
            'knights' : [],
            'bishops' : [],
            'queen' : [],
            'king' : [],
        };

        this.coloraid = false;

        this.history = [];
        this.movecount = 0;

        this.onendturn = null;
    }

    Chess.constructor = Chess;
    $.extend(Chess.prototype, Canvas.prototype);

    Chess.prototype.init = function() {
        this.initCanvas();
        this.initMouse();
        this.initBoard();
        this.initControls();
        this.initPieces();

        this.render();
    };

    Chess.prototype.initPieces = function() {
        //  top team
        //  pawns
        for(var i=0; i < 8; i ++){
            this.toppieces['pawns'].push(new Piece('pawn', 'top', this.topcolor, 1, i));
        }
        //  rooks
        this.toppieces['rooks'].push(new Piece('rook', 'top', this.topcolor, 0, 0));
        this.toppieces['rooks'].push(new Piece('rook', 'top', this.topcolor, 0, 7));
        //  knights
        this.toppieces['knights'].push(new Piece('knight', 'top', this.topcolor, 0, 1));
        this.toppieces['knights'].push(new Piece('knight', 'top', this.topcolor, 0, 6));
        //  bishops
        this.toppieces['bishops'].push(new Piece('bishop', 'top', this.topcolor, 0, 2));
        this.toppieces['bishops'].push(new Piece('bishop', 'top', this.topcolor, 0, 5));
        //  queen
        this.toppieces['queen'].push(new Piece('queen', 'top', this.topcolor, 0, 4));
        //  king
        this.toppieces['king'].push(new Piece('king', 'top', this.topcolor, 0, 3));

        //  bot team
        //  pawns
        for(var i=0; i < 8; i ++){
            this.botpieces['pawns'].push(new Piece('pawn', 'bot', this.botcolor, 6, i));
        }
        //  rooks
        this.botpieces['rooks'].push(new Piece('rook', 'bot', this.botcolor, 7, 0));
        this.botpieces['rooks'].push(new Piece('rook', 'bot', this.botcolor, 7, 7));
        //  knights
        this.botpieces['knights'].push(new Piece('knight', 'bot', this.botcolor, 7, 1));
        this.botpieces['knights'].push(new Piece('knight', 'bot', this.botcolor, 7, 6));
        //  bishops
        this.botpieces['bishops'].push(new Piece('bishop', 'bot', this.botcolor, 7, 2));
        this.botpieces['bishops'].push(new Piece('bishop', 'bot', this.botcolor, 7, 5));
        //  queen
        this.botpieces['queen'].push(new Piece('queen', 'bot', this.botcolor, 7, 4));
        //  king
        this.botpieces['king'].push(new Piece('king', 'bot', this.botcolor, 7, 3));

    };

    Chess.prototype.clearPieces = function() {
        this.botpieces = {
            'pawns' : [],
            'rooks' : [],
            'knights' : [],
            'bishops' : [],
            'queen' : [],
            'king' : [],
        };
        this.toppieces = {
            'pawns' : [],
            'rooks' : [],
            'knights' : [],
            'bishops' : [],
            'queen' : [],
            'king' : [],
        };
    }


    Chess.prototype.initBoard = function() {
        this.board = new Board({
            'ranks' : 8,
            'files' : 8,
            'canvas' : this.canvas,
            'ctx' : this.ctx,
        });
    };

    Chess.prototype.initControls = function() {
        this.canvas.onmousedown = this.mousedown.bind(this);
    };

    Chess.prototype.reset = function() {
        this.toppieces = [];
        this.botpieces = [];
        this.turn = 'bot';
        this.selected = null;
        this.history = [];
        this.movecount = 0;
        this.clearPieces();
        this.initPieces();
        this.render();
    };

    Chess.prototype.mousedown = function(e) {

        var position = this.board.pointToBoard({
            x : e.offsetX,
            y : e.offsetY
        });

        //  select piece if none selected
        if(this.selected == null) {
            this.selected = this.atSquare(position, this.turn);
            if(this.selected) {
                this.selected.selected = true;
            }
            this.render();
            return true;
        }

        //  select different piece if on the same team
        var piece = this.atSquare(position, this.selected.team);
        if(piece && piece.rank != this.selected.rank && piece.file != this.selected.file){
            this.selected.selected = false;
            this.selected = piece;
            this.selected.selected = true;
            this.render();
            return true;
        }

        //  capture square if possible and end turn
        if(this.selected && this.selected.checkMove(position.rank, position.file, this.allPieces())){ //  make a' +
            //var valid = false;
            var piece = this.atSquare(position, this.selected.enemy());
            var move = {'then':{rank:this.selected.rank, file:this.selected.file}, 'now':position};

            if(piece != null) {
                piece.taken();
                move['killed'] = piece.id;
            }

            if (this.history.length == this.movecount) {
                this.history.push(move);
            } else {
                this.history[this.movecount] = move;
            }
            this.movecount ++ ;
            this.history = this.history.slice(0,this.movecount);
            this.selected.moveTo(position);
            this.endTurn();
            this.render();
            return true;
        }

         //  click away - deselect piece
        this.selected.selected = false;
        this.selected = null;
        this.render();
    };

    Chess.prototype.render = function() {
        this.markSquares();
        this.board.showCoverage = this.coloraid;
        this.board.draw();
        this._placePieces();
    };

    Chess.prototype._placePieces =  function() {
        for (var i in this.toppieces) {
            for (var j = 0; j < this.toppieces[i].length; j++) {
                this.board.place(this.toppieces[i][j]);
            }
        }
        for (var i in this.botpieces) {
            for (var j = 0; j < this.botpieces[i].length; j++) {
                this.board.place(this.botpieces[i][j]);
            }
        }
    };

    Chess.prototype.atSquare = function(position, team) {
        var pieces = team == 'top' ? this.toppieces : this.botpieces;
        for(var i in pieces) {
            for(var j in pieces[i]){
                if(pieces[i][j].alive && pieces[i][j].rank == position.rank && pieces[i][j].file == position.file ){
                    return pieces[i][j];
                }
            }
        }
        return null;
    };

    Chess.prototype.undo = function() {
        if(this.movecount <= 0 || this.history.length <= 0){
            return false;
        }
        if(this.selected != null) {
            this.selected.selected = false;
        }
        this.selected = null;
        this.turn = this.turn == 'bot' ? 'top' : 'bot';
        var prev = this.history[--this.movecount];
        var piece = this.atSquare(prev.now,this.turn);
        piece.moveTo(prev.then);
        if (prev.killed != null) {
            var pieces = this.allPieces();
            for (var i in pieces){
                if(pieces[i].id == prev.killed) {
                    pieces[i].alive = true;
                }
            }
        }
        this.render();
    };

    Chess.prototype.redo = function() {
        if(this.movecount >= this.history.length){
            return false;
        }
        if(this.selected != null) {
            this.selected.selected = false;
        }
        this.selected = null;
        var next = this.history[this.movecount++];
        var piece = this.atSquare(next.then,this.turn);
        piece.moveTo(next.now);
        if (next.killed != null) {
            var pieces = this.allPieces();
            for (var i in pieces){
                if(pieces[i].id == next.killed) {
                    pieces[i].alive = false;
                }
            }
        }
        this.turn = this.turn == 'bot' ? 'top' : 'bot';
        this.render();
    };

    Chess.prototype.eachPiece = function (fn, team) {
        var pieces = team == 'top' ? this.toppieces : this.botpieces;
        for(var i in pieces) {
            for(var j in pieces[i]){
                var result = fn(pieces[i][j]);
                if(result == false) {
                    return false;
                }
            }
        }
    };

    Chess.prototype.allAlive = function() {
        var all_pieces = [];
        for (var type in this.toppieces){
            for (var i in this.toppieces[type]) {
                if (this.toppieces[type][i].alive) {
                    all_pieces.push(this.toppieces[type][i]);
                }
            }
        }
        for (var type in this.botpieces) {
            for (var i in this.botpieces[type]) {
                if (this.botpieces[type][i].alive) {
                    all_pieces.push(this.botpieces[type][i]);
                }
            }
        }
        return all_pieces;
    }

    Chess.prototype.allPieces = function(team){
        var all_pieces = [];
        if(team == undefined) {
            for (var type in this.toppieces){
                for (var i in this.toppieces[type]) {
                    all_pieces.push(this.toppieces[type][i]);
                }
            }
            for (var type in this.botpieces) {
                for (var i in this.botpieces[type]) {
                    all_pieces.push(this.botpieces[type][i]);
                }
            }
        } else if (team == 'top') {
            for (var type in this.toppieces){
                for (var i in this.toppieces[type]) {
                    all_pieces.push(this.toppieces[type][i]);
                }
            }
        } else if (team == 'bot') {
            for (var type in this.botpieces) {
                for (var i in this.botpieces[type]) {
                    all_pieces.push(this.botpieces[type][i]);
                }
            }
        }

        return all_pieces;
    };

    Chess.prototype.endTurn = function(){
        this.selected.selected = false;
        this.selected = null;
        this.turn = this.turn == 'bot' ? 'top' : 'bot';
        this.onEndTurn();
    };

    Chess.prototype.onEndTurn = function(){
        if(this.onendturn == null) {
            return true;
        } else {
            this.onendturn();
        }
    };

    Chess.prototype.addToPit = function(piece) {
        var pit_ctx = piece.team == 'top' ? this.top_context : this.bot_context;
    };

    Chess.prototype.getPieceById = function(id) {
        var pieces = this.allPieces();
        for (var i in pieces){
            if(pieces[i].id = id) {

            }
        }
    };

    Chess.prototype.markSquares = function() {
        var pieces = this.allPieces();

        this.board.attacked = [];
        this.board.covered = [];
        for (var m=0;m<this.board.ranks; m++) {
            this.board.attacked.push([]);
            this.board.covered.push([]);
            for (var n=0;n < this.board.files; n++) {
                this.board.attacked[m].push(0);
                this.board.covered[m].push(0);
            }
        }

        var r_count = this.board.ranks;
        while (r_count --) {
            var f_count = this.board.files;
            while(f_count --) {
                for(var i in pieces){
                    if(pieces[i].alive == false){
                        continue
                    }
                    if(pieces[i].checkAttack(r_count,f_count, pieces)){
                        if (pieces[i].team != this.turn) {
                            //console.log(pieces[i].type, ' at ' , pieces[i].rank , ',' , pieces[i].file ,  ' covering' + ' ', r_count, ',' ,f_count);
                            this.board.attacked[r_count][f_count] += 1;
                        } else {
                            //console.log(pieces[i].type, ' at ' , pieces[i].rank , ',' , pieces[i].file ,  ' attacking' + ' ', r_count, ',' ,f_count);
                            this.board.covered[r_count][f_count] += 1;
                        }
                    }
                }
            }
        }
    };

    return Chess;
});