var Store = require("./Store.js");
var Player = require("../models/Player.js");

var _over = false;
var _players = [
    new Player("Red", "RED"),
    new Player("Green", "GREEN")
];
var _currentPlayer = _players[0];
var _hits = [];

function newGame() {
    _over = false;
    _hits = [];
    _players.forEach(function(player) {
        player.reset();
    });
    _currentPlayer = _players[0];
}

function recordHit(player, number) {
    if (!_over) {
        _hits.push({
            player: player,
            number: number
        });
        if (player.isClosed(number)) {
            _players.forEach(function(p) {
                if (p != player) {
                    if (!p.isClosed(number)) {
                        player.score(number);
                    }
                }
            });
        }
        player.hit(number);
    }
}

function undoHit() {
    var hit = _hits.pop();
    if (hit) {
        if (_over) {
            if (hit.player.scores[hit.number] > 3) {
                hit.player.unscore(hit.number);
            }
        } else {
            if (hit.player.scores[hit.number] > 3) {
                hit.player.unscore(hit.number);
            }
        }
        hit.player.unhit(hit.number);
    }
}

function checkIfOver() {
    _over = (winner() != null);
}

function winner() {
    var p0 = _players[0];
    var p1 = _players[1];

    if (p0.allClosed() && (p0.currentScore >= p1.currentScore)) {
        return p0;
    } else if (p1.allClosed() && (p1.currentScore >= p0.currentScore)) {
        return p1;
    } else {
        return null;
    }
}

module.exports = new Store({
    state: {
        isOver: function() {
            checkIfOver();
            return _over;
        },
        winner: function() {
            return winner();
        },
        players: function() {
            return _players;
        },
        currentPlayer: function() {
            return _currentPlayer;
        },
        closedStatus: function() {
            var closed = {};
            [15, 16, 17, 18, 19, 20, 25].forEach(function(n) {
                closed[n] = true;
                _players.forEach(function(p) {
                    closed[n] = closed[n] && p.isClosed(n);
                });
            });
            return closed;
        }
    },
    handlers: {
        "NEW_GAME": function() {
            newGame();
        },
        "UNDO": function() {
            undoHit();
            checkIfOver();
        },
        "SELECT_PLAYER": function(action) {
            _currentPlayer = action.player;
        },
        "ADD_SCORE": function(action) {
            recordHit(_currentPlayer, action.number);
            checkIfOver();
        }
    }
});
