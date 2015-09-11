var GlanceBlip = require("./GlanceBlip.js");

var GlanceNumber = React.createClass({
    render: function() {
        return (
            <div className="glanceNumber">
                <strong>{this.props.number}</strong>
                <GlanceBlip on={this.props.hits >= 3} />
                <GlanceBlip on={this.props.hits >= 2} />
                <GlanceBlip on={this.props.hits >= 1} />
                <div className="clear"></div>
            </div>
        );
    }
});

module.exports = GlanceNumber;
