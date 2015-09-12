(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Dispatcher = require("../dispatcher/Dispatcher.js");

module.exports = {
    newGame: function() {
        Dispatcher.dispatch({
            type: "NEW_GAME"
        });
    },
    undo: function() {
        Dispatcher.dispatch({
            type: "UNDO"
        });
    },
    selectPlayer: function(player) {
        Dispatcher.dispatch({
            type: "SELECT_PLAYER",
            player: player
        });
    },
    addScore: function(number) {
        Dispatcher.dispatch({
            type: "ADD_SCORE",
            number: number
        });
    }
};

},{"../dispatcher/Dispatcher.js":13}],2:[function(require,module,exports){
var Main = require("./components/Main.js");

React.render(
    React.createElement(Main, null),
    document.body
);

},{"./components/Main.js":7}],3:[function(require,module,exports){
var Actions = require("../actions/Actions.js");
var GameStore = require("../stores/GameStore.js");
var PlayerGameScore = require("./PlayerGameScore.js");

var Dartboard = React.createClass({displayName: "Dartboard",
    getInitialState: function() {
        return {
            isOver: GameStore.state.isOver(),
            winner: GameStore.state.winner(),
            currentPlayer: GameStore.state.currentPlayer()
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
        if (this.state.currentPlayer == null) {
            return(
                React.createElement("div", {className: "dartboard"}, 
                    React.createElement("p", null, "empty dartboard")
                )
            );
        } else {
            return(
                React.createElement("div", {className: "dartboard"}, 
                    React.createElement(PlayerGameScore, {player: this.state.currentPlayer})
                )
            );
        }
    }
});

module.exports = Dartboard;

},{"../actions/Actions.js":1,"../stores/GameStore.js":15,"./PlayerGameScore.js":9}],4:[function(require,module,exports){
var GlanceBlip = React.createClass({displayName: "GlanceBlip",
    render: function() {
        var className = "col-xs-2 glanceBlip " + ((this.props.on) ? "on" : "off");
        return (
            React.createElement("div", {className: className})
        );
    }
});

module.exports = GlanceBlip;

},{}],5:[function(require,module,exports){
var GlanceBlip = require("./GlanceBlip.js");

var GlanceNumber = React.createClass({displayName: "GlanceNumber",
    render: function() {
        return (
            React.createElement("div", {className: "row glanceNumber"}, 
                React.createElement("div", {className: "col-xs-3"}, 
                    React.createElement("strong", null, this.props.number)
                ), 
                React.createElement(GlanceBlip, {on: this.props.hits >= 3}), 
                React.createElement(GlanceBlip, {on: this.props.hits >= 2}), 
                React.createElement(GlanceBlip, {on: this.props.hits >= 1})
            )
        );
    }
});

module.exports = GlanceNumber;

},{"./GlanceBlip.js":4}],6:[function(require,module,exports){
var Actions = require("../actions/Actions.js");

var Header = React.createClass({displayName: "Header",
    _newGame: function() {
        Actions.newGame();
    },
    _undo: function() {
        Actions.undo();
    },
    render: function() {
        return(
            React.createElement("div", {className: "header"}, 
                React.createElement("button", {onClick: this._newGame}, "New Game"), 
                React.createElement("button", {onClick: this._undo}, "Undo")
            )
        );
    }
});

module.exports = Header;

},{"../actions/Actions.js":1}],7:[function(require,module,exports){
var Header = require("./Header.js");
var PlayerSelector = require("./PlayerSelector.js");
var Dartboard = require("./Dartboard.js");
var Actions = require("../actions/Actions.js");
var GameStore = require("../stores/GameStore.js");
var Over = require("./Over.js");

var Main = React.createClass({displayName: "Main",
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
                React.createElement("div", {key: i, className: "row"}, 
                    React.createElement("div", {className: "col-xs-12"}, 
                        React.createElement(PlayerSelector, {player: player})
                    )
                )
            );
        });
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-xs-8"}, 
                    React.createElement("div", {className: "row center-xs"}, 
                        React.createElement(Header, null)
                    ), 
                    players, 
                    React.createElement(Over, null)
                ), 
                React.createElement("div", {className: "col-xs-4"}, 
                    React.createElement(Dartboard, null)
                )
            )
        );
    }
});

module.exports = Main;

},{"../actions/Actions.js":1,"../stores/GameStore.js":15,"./Dartboard.js":3,"./Header.js":6,"./Over.js":8,"./PlayerSelector.js":12}],8:[function(require,module,exports){
var GameStore = require("../stores/GameStore.js");

module.exports = React.createClass({displayName: "exports",
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
                React.createElement("div", {className: "over"}, this.state.winner.name, " wins!")
            );
        } else {
            return null;
        }
    }
});

},{"../stores/GameStore.js":15}],9:[function(require,module,exports){
var PlayerNumberScore = require("./PlayerNumberScore.js");

var PlayerGameScore = React.createClass({displayName: "PlayerGameScore",
    render: function() {
        var style = {
            background: this.props.player.color(0.6)
        };
        return(
            React.createElement("div", {className: "row center-xs playerGameScore", style: style}, 
                React.createElement("div", {className: "scores"}, 
                    [20, 19, 18, 17, 16, 15, 25].map(function(number) {
                        return (
                            React.createElement(PlayerNumberScore, {key: number, number: number, player: this.props.player})
                        );
                    }.bind(this))
                )
            )
        );
    }
});

module.exports = PlayerGameScore;

},{"./PlayerNumberScore.js":11}],10:[function(require,module,exports){
var GlanceNumber = require("./GlanceNumber.js");

var PlayerGlance = React.createClass({displayName: "PlayerGlance",
    render: function() {
        var glances = [];
        [20, 19, 18, 17, 16, 15, 25].forEach(function(n) {
            glances.push(
                React.createElement(GlanceNumber, {key: n, number: n, hits: this.props.player.scores[n]})
            );
        }.bind(this));
        return (
            React.createElement("div", {className: "playerGlance"}, 
                glances
            )
        );
    }
});

module.exports = PlayerGlance;

},{"./GlanceNumber.js":5}],11:[function(require,module,exports){
var GameStore = require("../stores/GameStore.js");
var Actions = require("../actions/Actions.js");

var _bull = {
  left: 140,
  top: 280
};
var _locations = {
  20: { left: _bull.left, top: _bull.top-100 },
  19: { left: _bull.left-40, top: _bull.top+100 },
  18: { left: _bull.left+100, top: _bull.top-50 },
  17: { left: _bull.left+40, top: _bull.top+100 },
  16: { left: _bull.left-100, top: _bull.top+40 },
  15: { left: _bull.left+100, top: _bull.top+40 },
  25: _bull
};

var PlayerNumberScore = React.createClass({displayName: "PlayerNumberScore",
    getInitialState: function() {
        return {
            players: GameStore.state.players(),
            closedStatus: GameStore.state.closedStatus()
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
    _hit: function() {
        Actions.addScore(this.props.number);
    },
    render: function() {
        var number = this.props.number;
        var style = {
            //left: _locations[number].left + "px",
            //top: _locations[number].top + "px"
        };
        var p0 = this.state.players[0];
        var p1 = this.state.players[1];
        var empty = "rgb(217, 212, 181)";
        var both = "rgb(230, 230, 102)";
        var style3 = {
            background: empty
        };
        if ((p0.scores[number] >= 3) && (p1.scores[number] >= 3)) {
            style3.background = both;
        } else if (p0.scores[number] >= 3) {
            style3.background = p0.color();
        } else if (p1.scores[number] >= 3) {
            style3.background = p1.color();
        }
        var style2 = {
            background: empty
        };
        if ((p0.scores[number] >= 2) && (p1.scores[number] >= 2)) {
            style2.background = both;
        } else if (p0.scores[number] >= 2) {
            style2.background = p0.color();
        } else if (p1.scores[number] >= 2) {
            style2.background = p1.color();
        }
        var style1 = {
            background: empty
        };
        if ((p0.scores[number] >= 1) && (p1.scores[number] >= 1)) {
            style1.background = both;
        } else if (p0.scores[number] >= 1) {
            style1.background = p0.color();
        } else if (p1.scores[number] >= 1) {
            style1.background = p1.color();
        }
        return (
            React.createElement("div", {className: "col-xs-8 playerNumberScore", style: style, onClick: this._hit}, 
                React.createElement("div", {className: "three", style: style3}), 
                React.createElement("div", {className: "two", style: style2}), 
                React.createElement("div", {className: "one", style: style1}), 
                React.createElement("div", {className: "number"}, number)
            )
        );
    }
});

module.exports = PlayerNumberScore;

},{"../actions/Actions.js":1,"../stores/GameStore.js":15}],12:[function(require,module,exports){
var Actions = require("../actions/Actions.js");
var GameStore = require("../stores/GameStore.js");
var PlayerGlance = require("./PlayerGlance.js");

var PlayerSelector = React.createClass({displayName: "PlayerSelector",
    getInitialState: function() {
        return {
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
    _select: function() {
        Actions.selectPlayer(this.props.player);
    },
    render: function() {
        var style = {
            background: this.props.player.color()
        };
        var scoreStyle = {};
        if (this.state.winner == this.props.player) {
            scoreStyle.color = "rgb(255, 255, 102)";
        } else {
            scoreStyle.color = "black";
        }
        return(
            React.createElement("div", {className: "playerSelector row", onClick: this._select, style: style}, 
                React.createElement("div", {className: "col-xs-6 center-xs currentScore", style: scoreStyle}, 
                    this.props.player.currentScore
                ), 
                React.createElement("div", {className: "col-xs-6"}, 
                    React.createElement(PlayerGlance, {player: this.props.player})
                )
            )
        );
    }
});

module.exports = PlayerSelector;

},{"../actions/Actions.js":1,"../stores/GameStore.js":15,"./PlayerGlance.js":10}],13:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */
function Dispatcher() {
  this._callbacks = {};
  this._isPending = {};
  this._isHandled = {};
  this._isDispatching = false;
  this._pendingPayload = null;
}

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
Dispatcher.prototype.register = function(callback) {
  var id = _prefix + _lastID++;
  this._callbacks[id] = callback;
  return id;
}

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
Dispatcher.prototype.unregister = function(id) {
  delete this._callbacks[id];
}

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
Dispatcher.prototype.waitFor = function(ids) {
  for (var ii = 0; ii < ids.length; ii++) {
    var id = ids[ii];
    if (this._isPending[id]) {
      continue;
    }
    this._invokeCallback(id);
  }
}

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
Dispatcher.prototype.dispatch = function(payload) {
  console.log(payload);
  this._startDispatching(payload);
  try {
    for (var id in this._callbacks) {
      if (this._isPending[id]) {
        continue;
      }
      this._invokeCallback(id);
    }
  } finally {
    this._stopDispatching();
  }
}

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
Dispatcher.prototype.isDispatching = function() {
  return this._isDispatching;
}

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
Dispatcher.prototype._invokeCallback = function(id) {
  this._isPending[id] = true;
  this._callbacks[id](this._pendingPayload);
  this._isHandled[id] = true;
}

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
Dispatcher.prototype._startDispatching = function(payload) {
  for (var id in this._callbacks) {
    this._isPending[id] = false;
    this._isHandled[id] = false;
  }
  this._pendingPayload = payload;
  this._isDispatching = true;
}

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
Dispatcher.prototype._stopDispatching = function() {
  this._pendingPayload = null;
  this._isDispatching = false;
}

var singleDispatcher = new Dispatcher();

module.exports = singleDispatcher;

},{}],14:[function(require,module,exports){
function Player(name, color) {
    this.name = name;
    this._color = Player.colors[color];
    this.reset();
}

Player.colors = {
    "RED": [200, 47, 38],
    "GREEN": [72, 126, 63]
};

Player.prototype.color = function(opacity) {
    if (opacity === undefined) {
        opacity = 1.0;
    }
    return "rgba(" + this._color.concat(opacity).join(",") + ")";
}

Player.prototype.reset = function() {
    this.scores = {
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        25: 0
    };
    this.currentScore = 0;
}

Player.prototype.hit = function(number) {
    this.scores[number]++;
}

Player.prototype.unhit = function(number) {
    this.scores[number]--;
    if (this.scores[number] < 0) {
        this.scores[number] = 0;
    }
}

Player.prototype.score = function(number) {
    this.currentScore += number;
}

Player.prototype.unscore = function(number) {
    this.currentScore -= number;
    if (this.currentScore <= 0) {
        this.currentScore = 0;
    }
}

Player.prototype.isClosed = function(number) {
    return this.scores[number] >= 3;
}

Player.prototype.allClosed = function() {
    for (number in this.scores) {
        if (!this.isClosed(number)) {
            return false;
        }
    };
    return true;
}

module.exports = Player;


},{}],15:[function(require,module,exports){
var Store = require("./Store.js");
var Player = require("../models/Player.js");

var _over = false;
var _players = [
    new Player("Red", "RED"),
    new Player("Green", "GREEN")
];
var _currentPlayer = _players[0];
var _hits = [];

function newGame() {
    _over = false;
    _hits = [];
    _players.forEach(function(player) {
        player.reset();
    });
    _currentPlayer = _players[0];
}

function recordHit(player, number) {
    if (!_over) {
        _hits.push({
            player: player,
            number: number
        });
        if (player.isClosed(number)) {
            _players.forEach(function(p) {
                if (p != player) {
                    if (!p.isClosed(number)) {
                        player.score(number);
                    }
                }
            });
        }
        player.hit(number);
    }
}

function undoHit() {
    var hit = _hits.pop();
    if (hit) {
        if (_over) {
            if (hit.player.scores[hit.number] > 3) {
                if (hit.player.isClosed(hit.number)) {
                    hit.player.unscore(hit.number);
                }
            }
        } else {
            if (hit.player.isClosed(hit.number)) {
                hit.player.unscore(hit.number);
            }
        }
        hit.player.unhit(hit.number);
    }
}

function checkIfOver() {
    _over = (winner() != null);
}

function winner() {
    var p0 = _players[0];
    var p1 = _players[1];

    if (p0.allClosed() && (p0.currentScore >= p1.currentScore)) {
        return p0;
    } else if (p1.allClosed() && (p1.currentScore >= p0.currentScore)) {
        return p1;
    } else {
        return null;
    }
}

module.exports = new Store({
    state: {
        isOver: function() {
            checkIfOver();
            return _over;
        },
        winner: function() {
            return winner();
        },
        players: function() {
            return _players;
        },
        currentPlayer: function() {
            return _currentPlayer;
        },
        closedStatus: function() {
            var closed = {};
            [15, 16, 17, 18, 19, 20, 25].forEach(function(n) {
                closed[n] = true;
                _players.forEach(function(p) {
                    closed[n] = closed[n] && p.isClosed(n);
                });
            });
            return closed;
        }
    },
    handlers: {
        "NEW_GAME": function() {
            newGame();
        },
        "UNDO": function() {
            undoHit();
            checkIfOver();
        },
        "SELECT_PLAYER": function(action) {
            _currentPlayer = action.player;
        },
        "ADD_SCORE": function(action) {
            recordHit(_currentPlayer, action.number);
            checkIfOver();
        }
    }
});

},{"../models/Player.js":14,"./Store.js":16}],16:[function(require,module,exports){
var Dispatcher = require("../dispatcher/Dispatcher.js");

/*
 * Use like this:
 *
 *   var value = 1;
 *   var SomeStore = new Store({
 *     state: {
 *       stuff: function() {
 *         return value;
 *       }
 *     },
 *     handlers: {
 *       DO_STUFF: function(action) {
 *         value += action.amount;
 *       }
 *     }
 *   });
 */
function Store(options) {
  this._adding = false;
  this._removing = false;
  this._emitting = false;
  this._listeners = [];
  this._names = [];

  if (options.handlers) {
    for (var key in options.handlers) {
      (function(type, handler) {
        var id = Dispatcher.register(function(action) {
          if (action.type == type) {
            handler.call(null, action);
            this.emitChange();
          }
        }.bind(this));
      }.bind(this))(key, options.handlers[key]);
    }
  }

  this.state = options.state;
}

Store.prototype.isBusy = function() {
  return this._emitting || this._adding || this._removing;
}

Store.prototype.emitChange = function() {
  if (this.isBusy()) {
    setTimeout(function() {
      this.emitChange();
    }.bind(this), 50);
    return;
  }
  this._emitting = true;
  this._listeners.forEach(function(listener, index) {
    listener.call(null);
  }.bind(this));
  this._emitting = false;
}

Store.prototype.addChangeListener = function(listener, name) {
  if (this.isBusy()) {
    setTimeout(function() {
      this.addChangeListener(listener, name);
    }.bind(this), 50);
    return;
  }
  this._adding = true;
  this._listeners.push(listener);
  this._names.push(name);
  this._adding = false;
}

Store.prototype.removeChangeListener = function(listener) {
  if (this.isBusy()) {
    setTimeout(function() {
      this.removeChangeListener(listener);
    }.bind(this), 50);
    return;
  }
  this._removing = true;
  var index = this._listeners.indexOf(listener);
  if (index != -1) {
    this._listeners.splice(index, 1);
    this._names.splice(index, 1);
  }
  this._removing = false;
}

module.exports = Store;

},{"../dispatcher/Dispatcher.js":13}]},{},[2]);
