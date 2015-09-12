var PlayerNumberScore = require("./PlayerNumberScore.js");

var PlayerGameScore = React.createClass({
    render: function() {
        var style = {
            background: this.props.player.color(0.6)
        };
        return(
            <div className="row center-xs playerGameScore" style={style}>
                <div className="scores">
                    {[20, 19, 18, 17, 16, 15, 25].map(function(number) {
                        return (
                            <PlayerNumberScore key={number} number={number} player={this.props.player} />
                        );
                    }.bind(this))}
                </div>
            </div>
        );
    }
});

module.exports = PlayerGameScore;
