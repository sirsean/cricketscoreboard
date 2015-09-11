var Actions = require("../actions/Actions.js");

var Header = React.createClass({
    _newGame: function() {
        Actions.newGame();
    },
    _undo: function() {
        Actions.undo();
    },
    render: function() {
        return(
            <div className="header">
                <button onClick={this._newGame}>New Game</button>
                <button onClick={this._undo}>Undo</button>
            </div>
        );
    }
});

module.exports = Header;
