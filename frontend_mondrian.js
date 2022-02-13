function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height, mondrianColor, ctx) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.isPressed = false;
        this.mondrianColor = mondrianColor;
        this.ctx = ctx;
    }
    Rectangle.prototype.draw = function () {
        this.ctx.fillStyle = this.isPressed ? this.mondrianColor : 'green';
        this.ctx.lineWidth = this.isPressed ? 10 : 1;
        this.ctx.strokeStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.ifInside = function (pos) {
        return pos.x > this.x && pos.x < this.x + this.width && pos.y < this.y + this.height && pos.y > this.y;
    };
    Rectangle.prototype.processClick = function (mousePos, timeout) {
        var _this = this;
        if (this.ifInside(mousePos)) {
            this.isPressed = true;
            this.draw();
            this.timeout = setTimeout(function () {
                _this.isPressed = false;
                _this.draw();
            }, timeout);
        }
    };
    Rectangle.prototype.cancelTimeout = function () {
        clearTimeout(this.timeout);
    };
    return Rectangle;
}());
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rectangles = [
    new Rectangle(0, 0, 200, 300, 'yellow', ctx),
    new Rectangle(0, 300, 200, 200, 'white', ctx),
    new Rectangle(0, 500, 200, 100, 'blue', ctx),
    new Rectangle(200, 0, 400, 500, 'red', ctx),
    new Rectangle(200, 500, 300, 100, 'white', ctx),
    new Rectangle(500, 500, 100, 100, 'white', ctx),
];
var websocket = new WebSocket("ws://localhost:8001/");
// TODO make into a function handle reading from server
var challengeLevel = parseInt(prompt('Set your timeout in ms', '3000'));
websocket.send(JSON.stringify({ name: 'timeout', value: challengeLevel }));
document.getElementById('title').innerHTML = "Your challenge level is ".concat(challengeLevel, " milliseconds");
var timeout = challengeLevel;
for (var i = 0; i < rectangles.length; i++) {
    rectangles[i].draw();
}
canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    for (var i = 0; i < rectangles.length; i++) {
        var rect = rectangles[i];
        rect.processClick(mousePos, timeout);
    }
    if (rectangles.reduce(function (pv, cv) { return pv && cv.isPressed; }, true)) {
        for (var i = 0; i < rectangles.length; i++) {
            rectangles[i].cancelTimeout();
        }
        document.getElementById('title').innerHTML = "Ty krasavcheg!!";
        setTimeout(function () {
            for (var i = 0; i < rectangles.length; i++) {
                rectangles[i].isPressed = false;
                rectangles[i].draw();
                document.getElementById('title').innerHTML = "Your challenge level is ".concat(challengeLevel, " milliseconds");
            }
        }, 5000);
    }
});
