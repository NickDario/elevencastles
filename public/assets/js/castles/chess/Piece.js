define(function(){

    function Piece(type, team, color, rank, file) {
        this.type = type;
        this.color = color;
        this.team = team;
        this.rank = rank;
        this.file = file;
        this.alive = true;

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        this.id = guid();
    }

    Piece.prototype.enemy = function() {
        return this.team == 'bot' ? 'top' : 'bot';
    };

    Piece.prototype.checkMove = function(rank, file, pieces) {
        if(this.rank == rank && this.file == file) {
            return false;   //  check for self
        }

        switch(this.type){
            case 'pawn':
                return this.pawnMove(rank, file, pieces);
            case 'king':
                return this.kingMove(rank, file);
            case 'queen':
                return this.queenMove(rank, file, pieces);
            case 'bishop':
                return this.bishopMove(rank, file, pieces);
            case 'knight':
                return this.knightMove(rank, file);
            case 'rook':
                return this.rookMove(rank, file, pieces);
            default :
                return this.kingMove(rank, file);
        }
    };

    Piece.prototype.checkAttack = function(rank, file, pieces) {
        if(this.rank == rank && this.file == file) {
            return false;
        }

        switch (this.type) {
            case 'pawn':
                return this.pawnAttack(rank, file, pieces);
            case 'king':
                return this.kingMove(rank, file);
            case 'queen':
                return this.queenMove(rank, file, pieces);
            case 'bishop':
                return this.bishopMove(rank, file, pieces);
            case 'knight':
                return this.knightMove(rank, file);
            case 'rook':
                return this.rookMove(rank, file, pieces);
            default :
                return this.kingMove(rank, file);
        }

    };


    Piece.prototype.moveTo = function(position) {
        this.rank = position.rank;
        this.file = position.file;
    };

    Piece.prototype.taken = function() {
        this.alive = false;
    };

    Piece.prototype.pawnMove = function(rank, file, pieces) {
        if(this.team == 'top'){
            if(rank - this.rank == 1 && Math.abs(this.file - file) == 1){
                for (var i in pieces) {  //  check if any piece is there
                    if(pieces[i].rank == rank && pieces[i].file == file){
                        return true;
                    }
                }
                return false;
            } else {
                if(((this.rank == 1 && rank - this.rank == 2 ) || rank - this.rank == 1) && (this.file == file)){
                    var minrank = this.rank;
                    var maxrank = rank;
                    for(var i in pieces) {
                        if(pieces[i].file == file && pieces[i].rank <= maxrank && pieces[i].rank > minrank){
                            return false;   //  a piece is in the way
                        }
                    }
                    return true;
                }
            }
        } else {
            if( this.rank - rank == 1 && Math.abs(this.file - file) == 1) {
                for (var i in pieces) {  //  check if any piece is there
                    if(pieces[i].rank == rank && pieces[i].file == file){
                        return true;
                    }
                }
                return false;
            } else {
                if(((this.rank == 6 && this.rank - rank == 2) || this.rank - rank == 1) && this.file == file){
                    var minrank = rank;
                    var maxrank = this.rank;
                    for(var i in pieces) {
                        if(pieces[i].file == file && pieces[i].rank < maxrank && pieces[i].rank >= minrank){
                            return false;   //  a piece is in the way
                        }
                    }
                    return true;
                }
            }
        }
    };

    Piece.prototype.pawnAttack = function(rank, file) {
        if(this.team == 'top') {
            return (rank - this.rank == 1 && Math.abs(this.file - file) == 1);
        } else {
            return (this.rank - rank == 1 && Math.abs(this.file - file) == 1);
        }
    };

    Piece.prototype.kingMove = function(rank, file) {
        if(Math.abs(rank - this.rank) <= 1 && Math.abs(file - this.file) <= 1){
            return true;
        }
    };

    Piece.prototype.queenMove = function(rank, file, pieces) {
        return this.bishopMove(rank, file, pieces) || this.rookMove(rank, file, pieces);
    };

    Piece.prototype.bishopMove = function(rank, file, pieces) {
        var offset = {
            r: this.rank - rank,
            f: this.file - file
        };
        if((Math.abs(offset.r) - Math.abs(offset.f)) == 0) {    //  check diagonal
            for (var i in pieces) {
                var piece_offset = {
                    r: this.rank - pieces[i].rank,
                    f: this.file - pieces[i].file
                }
                if((Math.abs(piece_offset.r) - Math.abs(piece_offset.f)) == 0){ //  piece is on diagonal
                    if(Math.abs(piece_offset.r) < Math.abs(offset.r)) {   //  closer along *some diagonal
                        if(offset.r < 0 && offset.f < 0){   //  -r, -f
                            if(piece_offset.r > offset.r && piece_offset.r < 0 && piece_offset.f > offset.f && piece_offset.f < 0) {
                               return false;    //  move is blocked
                            }
                        } else if(offset.r < 0 && offset.f > 0) {   //  -r, f
                            if(piece_offset.r > offset.r && piece_offset.r < 0 && piece_offset.f < offset.f && piece_offset.f > 0) {
                                return false;
                            }
                        } else if(offset.r > 0 && offset.f < 0) {   //  r, -f
                            if(piece_offset.r < offset.r && piece_offset.r > 0 && piece_offset.f > offset.f && piece_offset.f < 0) {
                                return false;
                            }
                        } else if(offset.r > 0 && offset.f > 0) {   //  r,f
                            if(piece_offset.r < offset.r && piece_offset.r > 0 && piece_offset.f < offset.f && piece_offset.f > 0) {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        }
    };

    Piece.prototype.knightMove = function(rank, file) {
        return (Math.abs(this.rank - rank) == 1 && Math.abs(this.file - file) == 2)
        || (Math.abs(this.file - file) == 1 && Math.abs(this.rank - rank) == 2);

        //return Math.abs(Math.abs(this.rank - rank) - Math.abs(this.file - file)) == 1;
    };

    Piece.prototype.rookMove = function(rank, file, pieces) {
        if (this.file == file || this.rank == rank) {
            var offset = {
                r: this.rank - rank,
                f: this.file - file,
            };

            if(this.file == file){
                var maxrank = offset.r < 0 ? rank : this.rank;
                var minrank = offset.r < 0 ? this.rank : rank;
                for (var i in pieces) {
                    if(pieces[i].file == file && pieces[i].rank > minrank && pieces[i].rank < maxrank){
                        return false
                    }
                }
            }
            if(this.rank == rank){
                var maxfile = offset.f < 0 ? file : this.file;
                var minfile = offset.f < 0 ? this.file : file;
                for (var i in pieces) {
                    if(pieces[i].rank == rank && pieces[i].file > minfile && pieces[i].file < maxfile){
                        return false;
                    }
                }
            }
            return true;
        }
    };

    Piece.prototype.draw = function(context, x, y, h) {
        context.textBaseline = 'middle';
        context.fillStyle = this.color;
        context.font = Math.floor(h * 0.8).toString() + 'px Arial';
        if(this.selected) {
            context.font = Math.floor(h * 0.9).toString() + 'px Arial';
        }

        switch(this.type) {
            case 'pawn':
                context.fillText('\u265F', x, y);
                break;
            case 'rook':
                context.fillText('\u265C', x, y);
                break;
            case 'knight':
                context.fillText('\u265E', x, y);
                break;
            case 'bishop':
                context.fillText('\u265D', x, y);
                break;
            case 'queen':
                context.fillText('\u265B', x, y);
                break;
            case 'king':
                context.fillText('\u265A', x, y);
                break;
            default:
                context.fillText('\u265F', x, y);
                break;
        }
    };

    return Piece;
});
