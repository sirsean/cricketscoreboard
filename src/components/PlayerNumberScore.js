var GameStore = require("../stores/GameStore.js");
var Actions = require("../actions/Actions.js");

var _bull = {
  left: 140,
  top: 280
};
var _locations = {
  20: { left: _bull.left, top: _bull.top-100 },
  19: { left: _bull.left-40, top: _bull.top+100 },
  18: { left: _bull.left+100, top: _bull.top-50 },
  17: { left: _bull.left+40, top: _bull.top+100 },
  16: { left: _bull.left-100, top: _bull.top+40 },
  15: { left: _bull.left+100, top: _bull.top+40 },
  25: _bull
};

var PlayerNumberScore = React.createClass({
    getInitialState: function() {
        return {
            players: GameStore.state.players(),
            closedStatus: GameStore.state.closedStatus()
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
    _hit: function() {
        Actions.addScore(this.props.number);
    },
    render: function() {
        var number = this.props.number;
        var style = {
            //left: _locations[number].left + "px",
            //top: _locations[number].top + "px"
        };
        var p0 = this.state.players[0];
        var p1 = this.state.players[1];
        var empty = "rgb(217, 212, 181)";
        var both = "rgb(230, 230, 102)";
        var style3 = {
            background: empty
        };
        if ((p0.scores[number] >= 3) && (p1.scores[number] >= 3)) {
            style3.background = both;
        } else if (p0.scores[number] >= 3) {
            style3.background = p0.color();
        } else if (p1.scores[number] >= 3) {
            style3.background = p1.color();
        }
        var style2 = {
            background: empty
        };
        if ((p0.scores[number] >= 2) && (p1.scores[number] >= 2)) {
            style2.background = both;
        } else if (p0.scores[number] >= 2) {
            style2.background = p0.color();
        } else if (p1.scores[number] >= 2) {
            style2.background = p1.color();
        }
        var style1 = {
            background: empty
        };
        if ((p0.scores[number] >= 1) && (p1.scores[number] >= 1)) {
            style1.background = both;
        } else if (p0.scores[number] >= 1) {
            style1.background = p0.color();
        } else if (p1.scores[number] >= 1) {
            style1.background = p1.color();
        }
        return (
            <div className="col-xs-8 playerNumberScore" style={style} onClick={this._hit}>
                <div className="three" style={style3}></div>
                <div className="two" style={style2}></div>
                <div className="one" style={style1}></div>
                <div className="number">{number}</div>
            </div>
        );
    }
});

module.exports = PlayerNumberScore;
