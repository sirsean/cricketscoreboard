var GlanceNumber = require("./GlanceNumber.js");

var PlayerGlance = React.createClass({
    render: function() {
        var glances = [];
        [20, 19, 18, 17, 16, 15, 25].forEach(function(n) {
            glances.push(
                <GlanceNumber key={n} number={n} hits={this.props.player.scores[n]} />
            );
        }.bind(this));
        return (
            <div className="playerGlance">
                {glances}
            </div>
        );
    }
});

module.exports = PlayerGlance;
