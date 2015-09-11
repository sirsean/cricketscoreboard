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

