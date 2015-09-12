var Actions = require("../actions/Actions.js");
var GameStore = require("../stores/GameStore.js");
var PlayerGameScore = require("./PlayerGameScore.js");

var Dartboard = React.createClass({
    getInitialState: function() {
        return {
            isOver: GameStore.state.isOver(),
            winner: GameStore.state.winner(),
            currentPlayer: GameStore.state.currentPlayer()
        };
    },
    componentDidMount: function() {
        GameStore.addChangeListener(this._onChange);
    },
    componentDidUnmount: function() {
        GameStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        if (this.isMounted()) {
            this.setState(this.getInitialState());
        }
    },
    render: function() {
        if (this.state.currentPlayer == null) {
            return(
                <div className="dartboard">
                    <p>empty dartboard</p>
                </div>
            );
        } else {
            return(
                <div className="dartboard">
                    <PlayerGameScore player={this.state.currentPlayer} />
                </div>
            );
        }
    }
});

module.exports = Dartboard;
