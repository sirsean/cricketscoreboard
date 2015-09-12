var GameStore = require("../stores/GameStore.js");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            isOver: GameStore.state.isOver(),
            winner: GameStore.state.winner()
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
        if (this.state.isOver) {
            return (
                <div className="over">{this.state.winner.name} wins!</div>
            );
        } else {
            return null;
        }
    }
});
