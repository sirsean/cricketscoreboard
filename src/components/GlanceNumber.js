var GlanceBlip = require("./GlanceBlip.js");

var GlanceNumber = React.createClass({
    render: function() {
        return (
            <div className="row glanceNumber">
                <div className="col-xs-3">
                    <strong>{this.props.number}</strong>
                </div>
                <GlanceBlip on={this.props.hits >= 3} />
                <GlanceBlip on={this.props.hits >= 2} />
                <GlanceBlip on={this.props.hits >= 1} />
            </div>
        );
    }
});

module.exports = GlanceNumber;
