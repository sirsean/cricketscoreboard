var Dispatcher = require("../dispatcher/Dispatcher.js");

module.exports = {
    newGame: function() {
        Dispatcher.dispatch({
            type: "NEW_GAME"
        });
    },
    undo: function() {
        Dispatcher.dispatch({
            type: "UNDO"
        });
    },
    selectPlayer: function(player) {
        Dispatcher.dispatch({
            type: "SELECT_PLAYER",
            player: player
        });
    },
    addScore: function(number) {
        Dispatcher.dispatch({
            type: "ADD_SCORE",
            number: number
        });
    }
};
