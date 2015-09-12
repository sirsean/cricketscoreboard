var Header = require("./Header.js");
var PlayerSelector = require("./PlayerSelector.js");
var Dartboard = require("./Dartboard.js");
var Actions = require("../actions/Actions.js");
var GameStore = require("../stores/GameStore.js");
var Over = require("./Over.js");

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
            players.push(
                <div key={i} className="row">
                    <div className="col-xs-12">
                        <PlayerSelector player={player} />
                    </div>
                </div>
            );
        });
        return (
            <div className="row">
                <div className="col-xs-8">
                    <div className="row center-xs">
                        <Header />
                    </div>
                    {players}
                    <Over />
                </div>
                <div className="col-xs-4">
                    <Dartboard />
                </div>
            </div>
        );
    }
});

module.exports = Main;
