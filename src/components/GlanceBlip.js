var GlanceBlip = React.createClass({
    render: function() {
        var className = "col-xs-2 glanceBlip " + ((this.props.on) ? "on" : "off");
        return (
            <div className={className}></div>
        );
    }
});

module.exports = GlanceBlip;
