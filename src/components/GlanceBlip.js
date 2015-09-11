var GlanceBlip = React.createClass({
    render: function() {
        var className = (this.props.on) ? "glanceBlip on" : "glanceBlip off";
        return (
            <div className={className}></div>
        );
    }
});

module.exports = GlanceBlip;
