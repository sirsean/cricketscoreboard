var PlayerNumberScore = require("./PlayerNumberScore.js");

var PlayerGameScore = React.createClass({
    render: function() {
        var scores = [];
        [15, 16, 17, 18, 19, 20, 25].forEach(function(number) {
            scores.push(
                <PlayerNumberScore key={number} player={this.props.player} number={number} />
            );
        }.bind(this));
        var style = {
            background: this.props.player.color(0.6)
        };
        return(
            <div className="playerGameScore" style={style}>
                <div className="scores">
                    {scores}
                </div>
            </div>
        );
    }
});

module.exports = PlayerGameScore;
