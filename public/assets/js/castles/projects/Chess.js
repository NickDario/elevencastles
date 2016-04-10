define(['etc/Canvas', 'chess/Board', 'chess/Piece'], function(Canvas, Board, Piece){


    function Chess(config) {
        Canvas.call(this, config);

        this.board = null;
        this.turn = 'bot';
        this.selected = null;

        this.coloraid = false;
        this.history = [];
        this.movecount = 0;

        this.teams = {
            'top' : {
                startrank : 0,
                forward : 1,
                color: '#000',
                pieces : {
                    'pawns' : [],
                    'rooks' : [],
                    'knights' : [],
                    'bishops' : [],
                    'queen' : [],
                    'king' : [],
                }
            },
            'bot' : {
                startrank : 7,
                forward : -1,
                color: '#fff',
                pieces : {
                    'pawns' : [],
                    'rooks' : [],
                    'knights' : [],
                    'bishops' : [],
                    'queen' : [],
                    'king' : [],
                }
            }
        }

        this.onendturn = null;
    }

    Chess.constructor = Chess;
    $.extend(Chess.prototype, Canvas.prototype);

    Chess.prototype.init = function() {
        this.initCanvas();
        this.initDynamicCanvas(this.resize);
        this.initMouse();
        this.initBoard();
        this.initControls();
        this.initPieces();

        this.render();
    };

    Chess.prototype.resize = function() {
        this.canvas.height= this.container.clientHeight - 20;
        this.canvas.width = this.container.clientWidth - 20;
        this.canvas_rect = this.canvas.getBoundingClientRect();
        this.initBoard();
        this.render();
    };

    Chess.prototype.initPieces = function() {
        for(var t in this.teams) {
            //  pawns
            for(var i=0; i < 8; i ++){
                this.teams[t].pieces['pawns'].push(new Piece('pawn', t, this.teams[t].color, this.teams[t].startrank + this.teams[t].forward, i));
            }
            //  rooks
            this.teams[t].pieces['rooks'].push(new Piece('rook', t, this.teams[t].color, this.teams[t].startrank, 0));
            this.teams[t].pieces['rooks'].push(new Piece('rook', t, this.teams[t].color, this.teams[t].startrank, 7));
            //  knights
            this.teams[t].pieces['knights'].push(new Piece('knight', t, this.teams[t].color, this.teams[t].startrank, 1));
            this.teams[t].pieces['knights'].push(new Piece('knight', t, this.teams[t].color, this.teams[t].startrank, 6));
            //  bishops
            this.teams[t].pieces['bishops'].push(new Piece('bishop', t, this.teams[t].color, this.teams[t].startrank, 2));
            this.teams[t].pieces['bishops'].push(new Piece('bishop', t, this.teams[t].color, this.teams[t].startrank, 5));
            //  queen
            this.teams[t].pieces['queen'].push(new Piece('queen', t, this.teams[t].color, this.teams[t].startrank, 4));
            //  king
            this.teams[t].pieces['king'].push(new Piece('king', t, this.teams[t].color, this.teams[t].startrank, 3));
        }
    };

    Chess.prototype.clearPieces = function() {
        for( var i in this.teams) {
            this.teams[i].pieces = {
                'pawns' : [],
                'rooks' : [],
                'knights' : [],
                'bishops' : [],
                'queen' : [],
                'king' : [],
            }
        }
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
        if(this.selected && this.selected.checkMove(position.rank, position.file, this.allAlive())){ //  make a' +
            //var valid = false;
            var piece = this.atSquare(position, this.selected.enemy());
            var move = {'then':{rank:this.selected.rank, file:this.selected.file}, 'now':position};

            if(piece != null) {
                piece.taken();
                move['killed'] = piece.id;
            }

            //if (this.selected.type == 'king' && this.selected.hasMoved == false && Math.abs(position.file - this.selected.file) == 2) {    //  castling
            //    for(var i in this.teams[this.selected.team].pieces['rooks']){
            //        var rook = this.teams[this.selected.team].pieces['rooks'];
            //        if(rook.file > this.selected.file && rook.hasMoved == false) {
            //
            //        } else if(rook.file < this.selected.file && rook.hasMoved == false) {
            //
            //        }
            //    }
            //}

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
        this.drawPit();
        this._placePieces();
    };

    Chess.prototype._placePieces =  function() {
        var pieces = this.allAlive();
        for (var i=0; i < pieces.length; i ++) {
            this.board.place(pieces[i]);
        }
    };

    Chess.prototype.atSquare = function(position, team) {
        var pieces = this.teams[team].pieces;
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
        var pieces = this.teams[team].pieces;
        for(var i in pieces) {
            for(var j in pieces[i]){
                var result = fn(pieces[i][j]);
                if(result == false) {
                    return false;
                }
            }
        }
    };

    Chess.prototype.allAlive = function(team) {
        if (team == undefined) {
            team = ['bot', 'top'];
        } else if(typeof team == 'string') {
            team = [team];
        }

        var all_pieces = [];
        for (var i in this.teams) {
            if(team.indexOf(i) >= 0) {
                for (var type in this.teams[i].pieces){
                    for (var j in this.teams[i].pieces[type]) {
                        if(this.teams[i].pieces[type][j].alive) {
                            all_pieces.push(this.teams[i].pieces[type][j]);
                        }
                    }
                }
            }
        }
        return all_pieces;
    }

    Chess.prototype.allPieces = function(team){
        if (team == undefined) {
            team = ['bot', 'top'];
        } else if(typeof team == 'string') {
            team = [team];
        }

        var all_pieces = [];
        for (var i in this.teams) {
            if(team.indexOf(i) >= 0) {
                for (var type in this.teams[i].pieces){
                    for (var j in this.teams[i].pieces[type]) {
                        all_pieces.push(this.teams[i].pieces[type][j]);
                    }
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

    Chess.prototype.drawPit = function() {
        var x = 0;
        var y = this.board.y_offset;
        var w = this.board.x_offset;
        var h = (this.board.squaresize) * 2;
        var bgColor = 'grey';

        this.board.ctx.fillStyle = bgColor;
        this.board.ctx.fillRect(x,y,w,h);

        var teamOffset = {
            'top': y + (h * 0.25),
            'bot': y + (h * 0.75)
        };

        var pieceOffset = {
            'pawn' : w * (5/6),
            'bishop' : w * (4/6),
            'knight' : w * (3/6),
            'rook' : w * (2/6),
            'queen' : w * (1/6),
        };

        var pieceCounts = {
            'top' : {
                'pawn' : 1,
                'bishop' : 1,
                'knight' : 1,
                'rook' : 1,
                'queen' : 1,
            },
            'bot' : {
                'pawn' : 1,
                'bishop' : 1,
                'knight' : 1,
                'rook' : 1,
                'queen' : 1,
            }
        };

        var miniSize = h / 4;
        var piece = null;
        for (var i in this.teams) {
            for (var j in this.teams[i].pieces) {
                for (var k in this.teams[i].pieces[j]) {

                    piece = this.teams[i].pieces[j][k];
                    if (!piece.alive) {
                        if (pieceCounts[piece.team][piece.type] > 1) {
                            this.board.ctx.fillStyle = bgColor;
                            this.board.ctx.fillRect(pieceOffset[piece.type] + miniSize, teamOffset[piece.team], miniSize, miniSize);
                            this.board.ctx.fillStyle = 'black';
                            this.board.ctx.fillText('x' + pieceCounts[piece.team][piece.type].toString(), pieceOffset[piece.type] + miniSize, teamOffset[piece.team] + miniSize/2, miniSize);
                        } else {
                            piece.draw(this.board.ctx, pieceOffset[piece.type], teamOffset[piece.team], miniSize);
                        }
                        pieceCounts[piece.team][piece.type] ++;
                    }

                }
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