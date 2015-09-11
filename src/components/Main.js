var Header = require("./Header.js");
var PlayerSelector = require("./PlayerSelector.js");
var Dartboard = require("./Dartboard.js");
var Actions = require("../actions/Actions.js");
var GameStore = require("../stores/GameStore.js");

var Main = React.createClass({
    getInitialState: function() {
        return {
            players: GameStore.state.players()
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
        var players = [];
        this.state.players.forEach(function(player, i) {
            players.push(<PlayerSelector key={i} player={player} />);
        });
        return (
            <div className="main">
                <Header />
                {players}
                <div className="clear"></div>
                <Dartboard />
            </div>
        );
    }
});

module.exports = Main;
