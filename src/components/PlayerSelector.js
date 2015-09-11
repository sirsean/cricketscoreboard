var Actions = require("../actions/Actions.js");
var GameStore = require("../stores/GameStore.js");
var PlayerGlance = require("./PlayerGlance.js");

var PlayerSelector = React.createClass({
    getInitialState: function() {
        return {
            winner: GameStore.state.winner()
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
    _select: function() {
        Actions.selectPlayer(this.props.player);
    },
    render: function() {
        var style = {
            background: this.props.player.color()
        };
        var scoreStyle = {};
        if (this.state.winner == this.props.player) {
            scoreStyle.color = "rgb(255, 255, 102)";
        } else {
            scoreStyle.color = "black";
        }
        return(
            <div className="playerSelector" onClick={this._select} style={style}>
                <div className="left currentScore" style={scoreStyle}>
                    {this.props.player.currentScore}
                </div>
                <div className="right">
                    <PlayerGlance player={this.props.player} />
                </div>
                <div className="clear"></div>
            </div>
        );
    }
});

module.exports = PlayerSelector;